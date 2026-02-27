import supabase from './supabase';

import { getFileUrl, uploadFile } from './storage';

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
