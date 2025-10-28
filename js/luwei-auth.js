(function(){
  'use strict';
  const cfg = () => (window.luweiSupabase && window.luweiSupabase.getConfig && window.luweiSupabase.getConfig()) || {};

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

  function signOut(){ localStorage.removeItem('luwei_auth'); }

  window.luweiAuth = { signUpEmail, signInEmail, getSession, signOut };
})();


