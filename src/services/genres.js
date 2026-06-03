import supabase from './supabase';

import { getFileUrl, uploadFile, deleteFiles } from './storage';

export const getGenres = async ({ search = '' } = {}) => {
  let query = supabase.from('genres_extended').select('*');
  if (search) query = query.ilike('title', `%${search.trim()}%`);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getGenresStats = async () => {
  const { data, error } = await supabase.functions.invoke('get_genres_stats');
  if (error) throw error;
  return data;
};

export const createGenre = async (data) => {
  const uploadedAt = new Date().toISOString();
  const newGenre = { ...data };

  // upload genre coverfile if it exists
  if (newGenre.coverFile && newGenre.coverFile.length > 0) {
    const coverFile = newGenre.coverFile[0];

    const { data: coverFileData, error: coverFileError } = await uploadFile(
      'genres-cover',
      `${newGenre.title}-${uploadedAt}`,
      coverFile
    );

    if (coverFileError) throw coverFileError;

    newGenre.cover_path = coverFileData.path;
    newGenre.cover = getFileUrl('genres-cover', coverFileData.path);
  }

  // delete coverFile property because we already exctracted it
  delete newGenre.coverFile;

  const { data: dbData, error: dbError } = await supabase
    .from('genres')
    .insert(newGenre)
    .select()
    .single();

  if (dbError) throw dbError;

  return dbData;
};

export const updateGenre = async ({ modifiedFields, prevGenreData }) => {
  const updatedTitle = modifiedFields?.title;
  const uploadedAt = new Date().toISOString(); // we use this timestamp in the name of our files in storage to be unique

  const data = { ...modifiedFields }; // The data we want to send to db

  // update cover in case user changed it.
  if (data.coverFile || data.existingCoverUrl === null) {
    // delete previous cover file from storage
    const { error: prevCoverFileDeleteError } = await deleteFiles('genres-cover', [
      prevGenreData.cover_path,
    ]);

    if (prevCoverFileDeleteError) throw prevCoverFileDeleteError;
    data.cover = null;
    data.cover_path = null;

    // upload new cover if user selected a new cover
    if (data.coverFile) {
      const newCoverFile = data.coverFile[0];

      // include updated title in the new cover file name (if changed)
      const newCoverFileName = `${updatedTitle ? updatedTitle : prevGenreData.title}-${uploadedAt}`;

      // upload new cover file to storage
      const { data: newCoverFileData, error: newCoverFileError } = await uploadFile(
        'genres-cover',
        newCoverFileName,
        newCoverFile
      );
      if (newCoverFileError) throw newCoverFileError;
      data.cover_path = newCoverFileData.path;
      data.cover = getFileUrl('genres-cover', newCoverFileData.path);
    }
  }

  // remove unnecessary properties from data because we will send "data" to postgres database
  delete data.existingCoverUrl;
  delete data.coverFile;

  const { data: dbData, error: dbError } = await supabase
    .from('genres')
    .update(data)
    .eq('id', prevGenreData.id)
    .select()
    .single();

  if (dbError) throw dbError;

  return dbData;
};

export const deleteGenre = async (data) => {
  // delete cover file from storage if exists
  if (data.cover_path) {
    const { error: coverDeleteError } = await deleteFiles('genres-cover', [data.cover_path]);
    if (coverDeleteError) throw coverDeleteError;
  }

  // remove genre metadata from database
  const { error, data: dbData } = await supabase
    .from('genres')
    .delete()
    .eq('id', data.id)
    .select()
    .single();

  if (error) throw error;

  return dbData;
};
