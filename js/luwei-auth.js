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

  function getSession(){
    try{ return JSON.parse(localStorage.getItem('luwei_auth')||'null'); }catch(_){ return null; }
  }

  function signOut(){ localStorage.removeItem('luwei_auth'); sp && sp.auth.signOut(); }

  async function oauthSignIn(provider){
    const client = ensureClient();
    if(!client) throw new Error('supabase client not ready');
    const redirectTo = 'https://luweisystem.com/index.html';
    console.log('[luwei-auth] OAuth sign in', { provider, redirectTo });
    try {
      const { data, error } = await client.auth.signInWithOAuth({ 
        provider, 
        options:{ redirectTo, skipBrowserRedirect: false } 
      });
      console.log('[luwei-auth] OAuth response', { data, error });
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('[luwei-auth] OAuth failed', err);
      throw err;
    }
  }

  async function refreshSession(){
    const client = ensureClient();
    if(!client) return null;
    const { data, error } = await client.auth.getSession();
    if (error) { console.warn('[luwei-auth] refresh error', error); return null; }
    if (data && data.session){ 
      localStorage.setItem('luwei_auth', JSON.stringify({ user: data.session.user, access_token: data.session.access_token }));
      console.log('[luwei-auth] session restored');
    }
    return data && data.session ? data.session : null;
  }

  async function hasSession(){
    const client = ensureClient();
    if (!client) return false;
    const { data } = await client.auth.getSession();
    return !!(data && data.session);
  }

  function setupAuthStateListener(){
    const client = ensureClient();
    if (!client) return;
    client.auth.onAuthStateChange((event, session) => {
      console.log('[luwei-auth] state change', event, !!session);
      if (event === 'SIGNED_IN' && session){
        localStorage.setItem('luwei_auth', JSON.stringify({ user: session.user, access_token: session.access_token }));
      } else if (event === 'SIGNED_OUT'){
        localStorage.removeItem('luwei_auth');
      }
    });
  }

  window.luweiAuth = { getSession, signOut, oauthSignIn, refreshSession, setupAuthStateListener, hasSession };

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setupAuthStateListener());
  } else {
    setupAuthStateListener();
  }

  (function handleCallback(){
    const h = location.hash.match(/[#&]access_token=([^&]+)/);
    if (h){
      console.log('[luwei-auth] OAuth callback detected');
      location.hash = '';
      // Retry if config not ready yet
      let tries = 0; const maxTries = 10; const t = 200;
      const attempt = ()=>{
        tries++;
        const client = ensureClient();
        if (!client && tries < maxTries){
          setTimeout(attempt, t);
        } else if (client) {
          client.auth.getSession().then(({ data }) => {
            console.log('[luwei-auth] session after OAuth', !!data.session);
            if (data && data.session) location.reload();
          }).catch(()=>{});
        } else {
          console.warn('[luwei-auth] client not ready after', maxTries, 'retries');
        }
      };
      attempt();
    }
  })();
})();
