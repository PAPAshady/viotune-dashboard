import supabase from './supabase';

export const getCurrentStats = async () => {
  const { data, error } = await supabase.functions.invoke('get_stats');
  if (error) throw error;
  return data.counts;
};

export const getStatsByDaysAgo = async (daysAgo) => {
  const { data, error } = await supabase
    .from('stats_snapshots')
    .select('*')
    .lte('created_at', new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Fallback to oldest row if nothing found
      const { data: oldestData, error: oldestError } = await supabase
        .from('stats_snapshots')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(1)
        .single();
      if (oldestError) throw oldestError;
      return oldestData;
    } else throw error;
  }

  return data;
};

export const getStatsSince = async (daysAgo) => {
  const sinceDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from('stats_snapshots')
    .select('*')
    .gte('created_at', sinceDate)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const getPlaysStatsSince = async (daysAgo) => {
  const sinceDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from('stats_snapshots')
    .select('total_plays, created_at')
    .gte('created_at', sinceDate)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};
