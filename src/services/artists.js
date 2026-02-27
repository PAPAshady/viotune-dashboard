import supabase from './supabase';

import { getFileUrl, uploadFile, deleteFiles } from './storage';

export const getArtists = async () => {
  const { data, error } = await supabase
    .from('artists_extended')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getPaginatedArtists = async ({ pageIndex, pageSize, genreId, search }) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;
  const query = supabase
    .from('artists_extended')
    .select('*', { count: 'exact' })
    .or(`name.ilike.%${search}%,full_name.ilike.%${search}%`)
    .range(from, to)
    .order('created_at', { ascending: false });

  if (genreId) {
    query.eq('genre_id', genreId);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { data, total: count };
};

export const createArtist = async (data) => {
  const newArtist = { ...data };

  // upload album imagefile if it exists
  if (newArtist.imageFile && newArtist.imageFile.length > 0) {
    const imageFile = newArtist.imageFile[0];
    const uploadedAt = new Date().toISOString();

    const { data: imageFileData, error: imageFileError } = await uploadFile(
      'artist-covers',
      `${newArtist.name}-${newArtist.full_name}-${uploadedAt}`,
      imageFile
    );

    if (imageFileError) throw imageFileError;

    newArtist.avatar_path = imageFileData.path;
    newArtist.image = getFileUrl('artist-covers', imageFileData.path);
  }

  // delete imageFile property because we already exctracted it
  delete newArtist.imageFile;

  const { data: dbData, error: dbError } = await supabase
    .from('artists')
    .insert(newArtist)
    .select()
    .single();

  if (dbError) throw dbError;
  return dbData;
};

export const updateArtist = async (data) => data;

export const deleteArtist = async (artist) => {
  // delete avatar file from storage if exists
  if (artist.avatar_path) {
    const { error: avatarDeleteError } = await deleteFiles('artist-covers', [artist.avatar_path]);
    if (avatarDeleteError) throw avatarDeleteError;
  }

  // remove album metadata from database
  const { error, data } = await supabase
    .from('artists')
    .delete()
    .eq('id', artist.id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteArtists = async (artistRows) => {
  const avatarPaths = artistRows.map((row) => row.original.avatar_path);
  const artistIds = artistRows.map((row) => row.original.id);

  // delete avatar files
  const { error: avatarDeleteErrors } = await deleteFiles('artist-covers', avatarPaths);
  if (avatarDeleteErrors) throw avatarDeleteErrors;

  // remove artists metadata from database
  const { data, error } = await supabase.from('artists').delete().in('id', artistIds).select();

  if (error) throw error;

  return data;
};
