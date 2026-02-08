import supabase from './supabase';
import { uploadFile, getFileUrl, listFiles, deleteFiles } from './storage';

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
    .order('play_count', { ascending: false });
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
  cover,
  genre,
  artist,
  album,
  release_date,
  track_number,
  status,
}) => {
  // since we send artist and album data in a string format, we have to sperate them.
  const [artist_id, artistName] = artist ? artist.split('|') : [null, 'Unknown artist'];
  const [album_id, albumTitle] = album ? album.split('|') : [null, null];
  const coverExists = !!cover.length;
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
      cover[0]
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
      genre_id: genre,
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
