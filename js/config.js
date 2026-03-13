window.APP_CONFIG = {
  SUPABASE_URL: 'https://dmxkznmliiyffoltdcxd.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRteGt6bm1saWl5ZmZvbHRkY3hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNTc2NzksImV4cCI6MjA1ODYzMzY3OX0.NUQgOp8NGHEZ0RDQ4sbuH7YCJpfYqF3UyEK3sPtu5-o'
};

window.sb = window.supabase.createClient(
  window.APP_CONFIG.SUPABASE_URL,
  window.APP_CONFIG.SUPABASE_ANON_KEY
);
