import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://odvdrtzecnmqbzyutvyg.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdmRydHplY25tcWJ6eXV0dnlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4OTI3OTUsImV4cCI6MjA0OTQ2ODc5NX0.x71_7V6mhtFLp1uedAwGNC7-wjc2gFy89bivlmXSdYQ';
const supabaseClient = createClient(supabaseUrl, supabaseKey);
export default supabaseClient;
