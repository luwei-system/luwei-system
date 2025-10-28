(function(){
  'use strict';
  const cfg = () => (window.luweiSupabase && window.luweiSupabase.getConfig && window.luweiSupabase.getConfig()) || {};
  let sp = null;
  function ensureClient(){
    if (sp) return sp;
    if (!window.supabase){ console.warn('[luwei-auth] supabase-js UMD not loaded'); return null; }
    const { url, anonKey } = cfg();
    if(!url || !anonKey){ console.warn('[luwei-auth] missing config'); return null; }
    sp = window.supabase.createClient(url, anonKey);
    return sp;
  }

  async function signUpEmail(email, password){
    const { url, anonKey } = cfg();
    if(!url || !anonKey) throw new Error('supabase config missing');
    const res = await fetch(url.replace(/\/$/, '') + '/auth/v1/signup', {
      method:'POST',
      headers:{ 'content-type':'application/json', 'apikey': anonKey },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  }

  async function signInEmail(email, password){
    const { url, anonKey } = cfg();
    if(!url || !anonKey) throw new Error('supabase config missing');
    const res = await fetch(url.replace(/\/$/, '') + '/auth/v1/token?grant_type=password', {
      method:'POST',
      headers:{ 'content-type':'application/json', 'apikey': anonKey },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if(json && json.user && json.access_token){
      localStorage.setItem('luwei_auth', JSON.stringify(json));
    }
    return json;
  }

  function getSession(){
    try{ return JSON.parse(localStorage.getItem('luwei_auth')||'null'); }catch(_){ return null; }
  }

  function signOut(){ localStorage.removeItem('luwei_auth'); sp && sp.auth.signOut(); }

  async function oauthSignIn(provider){
    const client = ensureClient();
    if(!client) throw new Error('supabase client not ready');
    const redirectTo = location.origin + '/index.html';
    const { data, error } = await client.auth.signInWithOAuth({ provider, options:{ redirectTo } });
    if (error) throw error;
    return data;
  }

  async function refreshSession(){
    const client = ensureClient();
    if(!client) return null;
    const { data } = await client.auth.getSession();
    if (data && data.session){ localStorage.setItem('luwei_auth', JSON.stringify({ user:data.session.user, access_token:data.session.access_token })); }
    return data && data.session ? data.session : null;
  }

  window.luweiAuth = { signUpEmail, signInEmail, getSession, signOut, oauthSignIn, refreshSession };
  
  // Check for OAuth callback hash and auto-restore session
  (function handleCallback(){
    const h = location.hash.match(/[#&]access_token=([^&]+)/);
    if (h){
      location.hash = '';
      const client = ensureClient();
      if (client){ client.auth.getSession().then(()=>location.reload()).catch(()=>{}); }
    }
  })();
})();


