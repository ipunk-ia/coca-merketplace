import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tvostmmzobaxgeichkhq.supabase.co';
const supabaseUrl = envUrl && envUrl.startsWith('http') ? envUrl : 'https://dummy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_7W9UraijEDb5lMAMp5biRw_4At1M3cK';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
