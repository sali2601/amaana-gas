import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kemrailxocsttvrinewm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbXJhaWx4b2NzdHR2cmluZXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMDU2MTgsImV4cCI6MjEwMjU4MTYxOH0.2HEft9N5Dxq1I21Kft2EcPhZJ-cA5qjrjG7S9XAF7Zc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);