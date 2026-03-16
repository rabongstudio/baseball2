window.APP_CONFIG = {
  SUPABASE_URL: 'https://eyunswxwvenhtxhkkntq.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5dW5zd3h3dmVuaHR4aGtrbnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzODg1MDgsImV4cCI6MjA4ODk2NDUwOH0.-xrnigivQgwkQJ-N0OhMhrgeGVlSRpPWXlQmhihRtaU'
};

window.sb = window.supabase.createClient(
  window.APP_CONFIG.SUPABASE_URL,
  window.APP_CONFIG.SUPABASE_ANON_KEY
);
