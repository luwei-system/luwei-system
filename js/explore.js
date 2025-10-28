(function(){
  'use strict';

  const grid = document.getElementById('explore-grid');
  const moreBtn = document.getElementById('explore-more');
  const modal = document.getElementById('explore-modal');
  const modalBody = document.getElementById('explore-modal-body');
  const modalClose = document.getElementById('explore-modal-close');

  let cursor = null;
  let loading = false;

  function intensityToStyle(i){
    const border = Math.max(1, Math.floor((i||0)/10)+1);
    const size = 110 + Math.floor((i||0)/2); // px
    return { border, size };
  }

  function card({ color_hex, intensity, note, created_at }){
    const { border, size } = intensityToStyle(intensity);
    const div = document.createElement('div');
    div.className = 'explore-card';
    div.style.cssText = `
      width:${size}px;height:${size}px;border-radius:16px;display:flex;align-items:center;justify-content:center;
      background:${color_hex||'#eee'};border:${border}px solid rgba(0,0,0,.08);box-shadow:var(--lu-shadow);cursor:pointer;
    `;
    div.title = new Date(created_at).toLocaleString();
    div.addEventListener('click', () => openModal({ color_hex, intensity, note, created_at }));
    return div;
  }

  function openModal(item){
    if (!modal) return;
    modalBody.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
        <div style="width:18px;height:18px;border-radius:50%;background:${item.color_hex};box-shadow:0 0 16px ${item.color_hex}80"></div>
        <strong style="font-family:var(--lu-font-kr)">강도 ${item.intensity}%</strong>
      </div>
      <div style="font-size:14px;color:#333;margin-bottom:12px">${(item.note||'').replace(/</g,'&lt;')}</div>
      <div style="font-size:12px;color:#666">${new Date(item.created_at).toLocaleString()}</div>
    `;
    modal.style.display = 'grid';
  }

  function closeModal(){ if (modal) modal.style.display = 'none'; }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

  async function loadMore(){
    if (loading) return; loading = true;
    try{
      const res = (window.luweiSupabase && window.luweiSupabase.fetchExplore)
        ? await window.luweiSupabase.fetchExplore({ cursor, limit: 24 })
        : { items: [], nextCursor: null };
      (res.items||[]).forEach(it => grid.appendChild(card(it)));
      cursor = res.nextCursor || null;
      if (!cursor) {
        moreBtn.style.display = 'none';
      }
    }catch(err){
      console.warn('[explore] load failed', err);
    }finally{
      loading = false;
    }
  }

  if (moreBtn) moreBtn.addEventListener('click', loadMore);

  // init
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', loadMore);
  } else {
    loadMore();
  }
})();


