import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

let SUPABASE_URL = "https://ingjdyteycutgcfwghxt.supabase.co";
let SUPABASE_ANON_KEY = "sb_publishable_tET2uORt-m94WhD8qnRlKA_DFyMF3LO";
var supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase