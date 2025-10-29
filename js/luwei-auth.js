(function(){
  'use strict';
  const FALLBACK = {
    url: 'https://ngyjzclndgffwzhoukuj.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5neWp6Y2xuZGdmZnd6aG91a3VqIiwicm9zZSI6ImFub24iLCJpYXQiOjE3NjE2Mzc3MDksImV4cCI6MjA3NzIxMzcwOX0.z2HvEUaVjiJ2HhfC8Qxf1Ka0Acpc3DtW4IM8dLYV_o0'
  };
  const cfg = () => {
    const fromUtil = (window.luweiSupabase && window.luweiSupabase.getConfig && window.luweiSupabase.getConfig()) || {};
    if (fromUtil.url && fromUtil.anonKey) return fromUtil;
    const fromGlobal = (window && window.__LUWEI_SUPABASE_CONFIG) || {};
    if (fromGlobal.url && fromGlobal.anonKey) return fromGlobal;
    return FALLBACK;
  };
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

  (async function handleCallback(){
    // v2 OAuth code flow: code/state in querystring
    const qs = new URLSearchParams(location.search);
    const hasCode = qs.get('code') && qs.get('state');
    if (hasCode){
      const client = ensureClient();
      if (client){
        try{
          const { data, error } = await client.auth.exchangeCodeForSession({ currentUrl: location.href });
          console.log('[luwei-auth] exchangeCodeForSession', !!(data && data.session), error);
          if (data && data.session){
            localStorage.setItem('luwei_auth', JSON.stringify({ user: data.session.user, access_token: data.session.access_token }));
            console.log('[luwei-auth] session saved to localStorage (code flow)');
            window.history.replaceState({}, '', location.pathname);
            // Dispatch custom event to notify UI
            window.dispatchEvent(new CustomEvent('luwei:authChanged'));
          }
        }catch(e){ console.warn('[luwei-auth] exchange failed', e); }
      }
    }

    // legacy hash flow fallback
    const h = location.hash.match(/[#&]access_token=([^&]+)/);
    if (h){
      console.log('[luwei-auth] OAuth callback detected');
      // Do NOT clear hash before extracting tokens
      const hp = new URLSearchParams(location.hash.slice(1));
      const at = hp.get('access_token');
      const rt = hp.get('refresh_token');
      let tries = 0; const maxTries = 10; const t = 200;
      const attempt = ()=>{
        tries++;
        const client = ensureClient();
        if (!client && tries < maxTries){
          setTimeout(attempt, t);
        } else if (client) {
          const next = async ()=>{
            try {
              const { data } = await client.auth.getSession();
              console.log('[luwei-auth] session after OAuth', !!(data && data.session));
              if (data && data.session){
                const sessionData = { user: data.session.user, access_token: data.session.access_token };
                localStorage.setItem('luwei_auth', JSON.stringify(sessionData));
                console.log('[luwei-auth] session saved to localStorage');
                // Clear URL parameters
                window.history.replaceState({}, '', location.pathname);
                // Dispatch custom event to notify UI
                window.dispatchEvent(new CustomEvent('luwei:authChanged'));
              }
            }catch(e){ 
              console.warn('[luwei-auth] getSession failed', e);
            }
          };
          if (at && rt){
            client.auth.setSession({ access_token: at, refresh_token: rt }).then(() => next()).catch(() => next());
          } else {
            next();
          }
        } else {
          console.warn('[luwei-auth] client not ready after', maxTries, 'retries');
        }
      };
      attempt();
    }
  })();
})();
