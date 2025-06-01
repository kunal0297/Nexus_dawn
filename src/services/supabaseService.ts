import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface OracleEvent {
  id: string;
  type: string;
  payload: any;
  created_at: string;
}

export const subscribeToOracleEvents = (onEvent: (event: OracleEvent) => void) => {
  return supabase
    .channel('oracle_events')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'oracle_events' }, (payload) => {
      onEvent(payload.new as OracleEvent);
    })
    .subscribe();
};

export const fetchRecentOracleEvents = async (): Promise<OracleEvent[]> => {
  const { data, error } = await supabase
    .from('oracle_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
  if (error) throw error;
  return data as OracleEvent[];
}; 