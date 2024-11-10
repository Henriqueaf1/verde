import { createClient } from '@supabase/supabase-js';

// Substitua pelos valores específicos do seu projeto:
const supabaseUrl = 'https://flyfrkixytcdijloenmb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZseWZya2l4eXRjZGlqbG9lbm1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTM2NTg0OSwiZXhwIjoyMDQ0OTQxODQ5fQ.a_0y2wBMZRZ4TKHCOPeTjTSZzPRUPhz1_RE4nQEbKU0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);