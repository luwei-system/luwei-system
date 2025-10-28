// LUWEI Supabase Utility (Phase 1)
(function(){
  'use strict';

  // NOTE: 실제 키를 주면 setConfig로 주입하여 사용. 주입 전에는 더미 동작.
  let config = {
    url: '',
    anonKey: '',
    functionsUrl: '' // e.g. https://<project>.supabase.co/functions/v1
  };

  function setConfig(partial){
    config = Object.assign({}, config, partial || {});
    console.log('[luwei-supabase] config set', {
      url: !!config.url,
      anonKey: !!config.anonKey,
      functionsUrl: !!config.functionsUrl
    });
  }
  function getConfig(){ return { ...config }; }

  async function postEmotionBatch(items){
    // 키 없으면 더미 성공 처리
    if (!config.functionsUrl || !config.anonKey){
      console.log('[luwei-supabase] dummy postEmotionBatch', items.length);
      return { ok: true, saved: items.length, dummy: true };
    }
    const endpoint = config.functionsUrl.replace(/\/$/, '') + '/emotion-batch';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'apikey': config.anonKey
      },
      body: JSON.stringify(items)
    });
    if (!res.ok){
      throw new Error('failed to post emotion batch');
    }
    return await res.json();
  }

  async function fetchExplore({ cursor, limit } = {}){
    // 키 없으면 로컬 스텁
    if (!config.functionsUrl || !config.anonKey){
      return {
        items: (JSON.parse(localStorage.getItem('luwei_reflections')||'[]')||[])
          .slice(-24).reverse().map(r=>({
            type: 'emotion',
            color_hex: r.color,
            intensity: r.intensity,
            note: r.note,
            created_at: new Date(r.ts||Date.now()).toISOString()
          })),
        nextCursor: null,
        dummy: true
      };
    }
    const endpoint = config.functionsUrl.replace(/\/$/, '') + '/explore-feed' + (cursor ? ('?cursor=' + encodeURIComponent(cursor)) : '');
    const res = await fetch(endpoint, { headers: { 'apikey': config.anonKey }});
    if (!res.ok){
      throw new Error('failed to fetch explore feed');
    }
    return await res.json();
  }

  window.luweiSupabase = {
    setConfig,
    getConfig,
    postEmotionBatch,
    fetchExplore
  };
})();


