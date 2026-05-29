import { createClient } from "@supabase/supabase-js"
//Código de Conexão com Supabase, para ser utilizado em toda a aplicação, importando apenas o arquivo Supabase.ts
const SUPABASE_URL = "https://zakgnywyfjehmabxbvfl.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpha2dueXd5ZmplaG1hYnhidmZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODIwMTcsImV4cCI6MjA5NTY1ODAxN30.6Cxsfk6o3pCXr802wE5ZczfJFSNBSbY_VQCX89xv9DY"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
