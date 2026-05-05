// config.js
// IMPORTANTE: Substitua pelas suas credenciais do Supabase
const SUPABASE_URL = 'SUA_URL_DO_SUPABASE_AQUI';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_ANON_DO_SUPABASE_AQUI';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
