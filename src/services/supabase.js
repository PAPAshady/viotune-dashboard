import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://okuypoeobjphvsgwjrce.supabase.co';

// this is supabase public key and is safe to use in the browser.
const publicKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rdXlwb2VvYmpwaHZzZ3dqcmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTM3MjIsImV4cCI6MjA1NzAyOTcyMn0.zqBBnRDaa6gIS6ovk6x2GUwFLITepC1RA6gU7r9boRg';

const supabase = createClient(supabaseUrl, publicKey);

export default supabase;
