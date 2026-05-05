// config.js

const SUPABASE_URL = 'https://irgebbwehnaapeveaygj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZ2ViYndlaG5hYXBldmVheWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MTQ1ODcsImV4cCI6MjA5MzQ5MDU4N30.0wwATTpo0s3JdqM-E1jE7hnYr54fktFP7x4oRGv2VMA';

// cria só uma vez
if (!window.supabaseClient) {
    window.supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
}
