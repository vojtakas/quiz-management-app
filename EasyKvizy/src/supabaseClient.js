import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofuuaxzozoiaxflssplf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdXVheHpvem9pYXhmbHNzcGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNzMxMzcsImV4cCI6MjA0Mzk0OTEzN30.U8hsG06X-UYq3QR1Uto29AW3hFjsnyupEC1QIElljSk';

export const supabase = createClient(supabaseUrl, supabaseKey);