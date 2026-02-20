import supabase from './supabase';
import { uploadFile, getFileUrl, deleteFiles } from './storage';

export const getSongs = async ({
  pageIndex,
  pageSize,
  search,
  artistId,
  albumId,
  genreId,
  status,
}) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;
  let query = supabase
    .from('songs_extended')
    .select('*', { count: 'exact' })
    .range(from, to)
    .or(`title.ilike.%${search}%,artist.ilike.%${search}%`)
    .order('created_at', { ascending: false });

  if (artistId) query.eq('artist_id', artistId);
  if (albumId) query.eq('album_id', albumId);
  if (genreId) query.eq('genre_id', genreId);
  if (status) query.eq('status', status);

  const { data, error, count } = await query;

  if (error) throw error;
  return { data, total: count };
};

export const getMostPlayedSongs = async ({ limit = 5 }) => {
  const { data, error } = await supabase
    .from('most_played_songs')
    .select('*')
    .limit(limit)
    .order('total_plays', { ascending: false });
  if (error) throw error;
  return data;
};

export const getZeroPlayedSongsCount = async () => {
  const { data, error } = await supabase.rpc('get_zero_play_songs');
  if (error) throw error;
  return data;
};

export const uploadSong = async ({
  title,
  audioFile,
  coverFile,
  genre_id,
  artist,
  album,
  release_date,
  track_number,
  status,
}) => {
  // since we send artist and album data in a string format, we have to sperate them.
  const [artist_id, artistName] = artist ? artist.split('|') : [null, 'Unknown artist'];
  const [album_id, albumTitle] = album ? album.split('|') : [null, null];
  const coverExists = !!coverFile.length;
  const uploadedAt = new Date().toISOString();

  // upload audio file to storage
  const { data: audioFileData, error: audioFileError } = await uploadFile(
    'songs',
    `${title}-${artistName}-${uploadedAt}`,
    audioFile[0]
  );

  if (audioFileError) throw audioFileError;

  let cover_path = null;

  // uploade song cover image if exists
  if (coverExists) {
    const { data: coverFileData, error: coverFileError } = await uploadFile(
      'song-covers',
      `${title}-${artistName}-${uploadedAt}`,
      coverFile[0]
    );

    if (coverFileError) throw coverFileError;
    cover_path = coverFileData.path;
  }

  const audio_path = audioFileData.path;

  // audio file is now accessible via song_url
  const song_url = getFileUrl('songs', audio_path);
  // cover image file is now accessible via cover_url
  const cover_url = coverExists ? getFileUrl('song-covers', cover_path) : null;

  // upload song data to database
  const { data: song, error: songMetaDataError } = await supabase
    .from('songs')
    .insert({
      title,
      album: albumTitle,
      album_id,
      track_number: +track_number || null,
      artist_id,
      release_date,
      artist: artistName,
      status,
      genre_id,
      song_url,
      cover: cover_url,
      audio_path,
      cover_path,
    })
    .select()
    .single();

  if (songMetaDataError) throw songMetaDataError;

  // calculate the song duration and insert it into database
  const { error: songDurationError } = await supabase.functions.invoke('get-song-duration', {
    method: 'POST',
    body: JSON.stringify({
      bucket: 'songs',
      path: audio_path,
      song_id: song.id,
    }),
  });

  if (songDurationError) throw songDurationError;
};

export const deleteSong = async (data) => {
  // delete audio file from storage
  const { error: audioDeleteError } = await deleteFiles('songs', [data.audio_path]);
  if (audioDeleteError) throw audioDeleteError;

  // delete cover file from storage if exists
  if (data.cover_path) {
    const { error: coverDeleteError } = await deleteFiles('song-covers', [data.cover_path]);
    if (coverDeleteError) throw coverDeleteError;
  }

  // remove song metadata from database
  const { error: songMetadataError } = await supabase.from('songs').delete().eq('id', data.id);

  if (songMetadataError) throw songMetadataError;
};

export const deleteSongs = async (songsRows) => {
  const audioPaths = songsRows.map((row) => row.original.audio_path);
  const coverPaths = songsRows.map((row) => row.original.cover_path);
  const songIds = songsRows.map((row) => row.original.id);

  // delete audio files
  const { error: audiosDeleteError } = await deleteFiles('songs', audioPaths);
  if (audiosDeleteError) throw audiosDeleteError;

  // delete cover files
  const { error: coversDeleteErrors } = await deleteFiles('song-covers', coverPaths);
  if (coversDeleteErrors) throw coversDeleteErrors;

  // remove songs metadata from database
  const { data, error } = await supabase.from('songs').delete().in('id', songIds).select();

  if (error) throw error;

  return data;
};

export const toggleSongStatus = async (song) => {
  const newStatus = song.status === 'published' ? 'draft' : 'published';
  const { data, error } = await supabase
    .from('songs')
    .update({ status: newStatus })
    .eq('id', song.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateSong = async ({ modifiedFields, prevSongData }) => {
  const updatedArtist = modifiedFields?.artist;
  const updatedAlbum = modifiedFields?.album;
  const updatedTitle = modifiedFields?.title;
  const uploadedAt = new Date().toISOString(); // we use this timestamp in the name of our files in storage to be unique

  // extract artist_id and artist_name from 'modifiedFields.artist'
  const [artist_id, artist_name] = updatedArtist
    ? updatedArtist.split('|')
    : [null, 'Unknown artist'];

  // extract album_id and album_title from 'modifiedFields.album'
  const [album_id, album_title] = updatedAlbum ? updatedAlbum.split('|') : [null, null];

  const data = { ...modifiedFields };

  // upload new audio file (if changed)
  if (data.audioFile) {
    const newAudioFile = data.audioFile[0];

    // remove unnecessary properties from data because we will send "data" to postgres database
    delete data.audioFile;
    delete data.existingAudioUrl;

    // delete previous audio file from storage
    const { error: prevAudioFileDeleteError } = await deleteFiles('songs', [
      prevSongData.audio_path,
    ]);
    if (prevAudioFileDeleteError) throw prevAudioFileDeleteError;

    // include updated title and artist name in the new audio file name (if changed)
    const newAudioFileName = `${updatedTitle ? updatedTitle : prevSongData.title}-${updatedArtist ? artist_name : prevSongData.artist}-${uploadedAt}`;

    // upload new audio file to storage
    const { data: newAudioFileData, error: newAudioFileError } = await uploadFile(
      'songs',
      newAudioFileName,
      newAudioFile
    );

    if (newAudioFileError) throw newAudioFileError;

    // calculate the new song duration and insert it into database
    const { error: songDurationError } = await supabase.functions.invoke('get-song-duration', {
      method: 'POST',
      body: JSON.stringify({
        bucket: 'songs',
        path: newAudioFileData.path,
        song_id: prevSongData.id,
      }),
    });

    if (songDurationError) throw songDurationError;

    data.audio_path = newAudioFileData.path;
    data.song_url = getFileUrl('songs', newAudioFileData.path);
  }

  // update cover in case user changed it.
  if (data.coverFile || data.existingCoverUrl === null) {
    // remove unnecessary properties from data because we will send "data" to postgres database
    delete data.existingCoverUrl;

    // delete previous cover file from storage
    const { error: prevCoverFileDeleteError } = await deleteFiles('song-covers', [
      prevSongData.cover_path,
    ]);
    if (prevCoverFileDeleteError) throw prevCoverFileDeleteError;
    data.cover = null;
    data.cover_path = null;

    // upload new cover if user selected a new cover
    if (data.coverFile) {
      const newCoverFile = data.coverFile[0];
      delete data.coverFile;

      // include updated title and artist name in the new cover file name (if changed)
      const newCoverFileName = `${updatedTitle ? updatedTitle : prevSongData.title}-${updatedArtist ? artist_name : prevSongData.artist}-${uploadedAt}`;

      // upload new cover file to storage
      const { data: newCoverFileData, error: newCoverFileError } = await uploadFile(
        'song-covers',
        newCoverFileName,
        newCoverFile
      );
      if (newCoverFileError) throw newCoverFileError;
      data.cover_path = newCoverFileData.path;
      data.cover = getFileUrl('song-covers', newCoverFileData.path);
    }
  }

  // normalize data structure because we want to send it to database
  if (typeof updatedArtist !== 'undefined') {
    data.artist = artist_name;
    data.artist_id = artist_id;
  }

  if (typeof updatedAlbum !== 'undefined') {
    data.album = album_title;
    data.album_id = album_id;
  }

  const { error: dbError, data: dbData } = await supabase
    .from('songs')
    .update(data)
    .eq('id', prevSongData.id)
    .select()
    .single();

  if (dbError) throw dbError;
  return dbData;
};

export const getSongsByAlbumId = async (albumId, keyword) => {
  const { data, error, count } = await supabase
    .from('album_songs')
    .select('songs(*)', { count: 'exact' })
    .eq(`album_id`, albumId)
    .order('track_number', { foreignTable: 'songs', ascending: true })
    .or(`title.ilike.%${keyword}%,artist.ilike.%${keyword}%`, { foreignTable: 'songs' });
  if (error) throw error;
  return { data: data.map((data) => data.songs), total: count };
};

export const getAlbumRecommendedSongs = async ({ pageParam, pageSize = 10, search, albumId }) => {
  const { data: albumSongs, error: albumSongsError } = await getSongsByAlbumId(albumId, '');
  if (albumSongsError) throw error;
  const excludedIds = albumSongs.map((song) => song.id);

  const { data, error } = await supabase
    .from('most_played_songs')
    .select('*')
    .notIn('id', excludedIds)
    .or(`title.ilike.%${search}%,artist.ilike.%${search}%`)
    .gt('position', pageParam)
    .lte('position', pageParam + pageSize);

  if (error) throw error;

  return data;
};
