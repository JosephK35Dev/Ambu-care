console.log("✅ supabaseClient.js cargado");
// Importa Supabase desde su CDN (ya que tu proyecto es HTML puro)
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Conecta tu proyecto con tu base de datos Supabase
const supabaseUrl = "https://afmeydlefyoenpgdoahm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmbWV5ZGxlZnlvZW5wZ2RvYWhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NDI0MTQsImV4cCI6MjA3NjIxODQxNH0.tmHIbdWFZnYbUOIUvkvOcNKedgNBOmtxbL8c2ptnHAU";
export const supabaseClient = createClient(supabaseUrl, supabaseKey);
