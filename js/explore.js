// Explore Feed
(function(){
  const grid = document.getElementById('grid');
  const more = document.getElementById('more');
  let cursor = null;
  let loading = false;

  async function load(){
    if(loading || !window.luweiSupabase) return;
    loading = true;
    
    try {
      const result = await window.luweiSupabase.fetchExplore({
        limit: 20,
        cursor: cursor
      });
      
      const items = result.items || [];
      
      items.forEach(it => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const sw = document.createElement('div');
        sw.className = 'swatch';
        sw.style.cssText = `background: ${it.color_hex || '#CFE8FF'}; opacity: ${0.5 + (it.intensity||0)/200}`;
        
        const note = document.createElement('div');
        note.className = 'note';
        note.textContent = it.note || '';
        
        card.appendChild(sw);
        card.appendChild(note);
        grid.appendChild(card);
      });
      
      cursor = result.nextCursor || null;
      more.style.display = cursor ? 'inline-block' : 'none';
      
    } catch(err) {
      console.error('[explore] load error', err);
    }
    
    loading = false;
  }

  more.onclick = load;
  load();
})();
