// LUWEI Room - Customizable Personal Space
(function() {
  'use strict';
  
  const canvas = document.getElementById('room-canvas');
  const toolbar = document.getElementById('toolbar');
  
  if (!canvas || !toolbar) {
    console.warn('[room] Canvas or toolbar not found');
    return;
  }
  
  let items = [];
  
  // Load saved room state
  function loadRoom() {
    try {
      const saved = localStorage.getItem('luwei_room_state');
      if (saved) {
        items = JSON.parse(saved);
        renderItems();
      }
    } catch (e) {
      console.warn('[room] Failed to load saved state:', e);
    }
  }
  
  // Save room state
  function saveRoom() {
    localStorage.setItem('luwei_room_state', JSON.stringify(items));
    console.log('[room] Saved state');
  }
  
  // Render all items
  function renderItems() {
    canvas.innerHTML = '';
    items.forEach(item => {
      const el = createItemElement(item);
      canvas.appendChild(el);
    });
  }
  
  // Create item element
  function createItemElement(item) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      left: ${item.x}px;
      top: ${item.y}px;
      padding: 12px;
      background: ${item.bg || 'rgba(255, 255, 255, 0.9)'};
      border-radius: 12px;
      cursor: move;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-family: var(--lu-font-kr);
      font-size: 14px;
      max-width: 200px;
      word-wrap: break-word;
    `;
    el.textContent = item.text || item.type;
    
    // Make draggable
    makeDraggable(el, item);
    
    return el;
  }
  
  // Make element draggable
  function makeDraggable(el, item) {
    let isDragging = false;
    let offset = { x: 0, y: 0 };
    
    el.addEventListener('mousedown', function(e) {
      isDragging = true;
      offset.x = e.clientX - el.offsetLeft;
      offset.y = e.clientY - el.offsetTop;
    });
    
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      el.style.left = (e.clientX - offset.x) + 'px';
      el.style.top = (e.clientY - offset.y) + 'px';
      item.x = el.offsetLeft;
      item.y = el.offsetTop;
    });
    
    document.addEventListener('mouseup', function() {
      isDragging = false;
      saveRoom();
    });
  }
  
  // Add item
  function addItem(type, text) {
    const item = {
      id: Date.now(),
      type: type,
      text: text || type,
      x: Math.random() * (window.innerWidth - 200),
      y: Math.random() * (window.innerHeight - 100),
      bg: canvas.style.background
    };
    items.push(item);
    renderItems();
    saveRoom();
  }
  
  // Toolbar button handlers
  toolbar.addEventListener('click', function(e) {
    const btn = e.target.closest('button');
    if (!btn) return;
    
    const bg = btn.dataset.bg;
    const add = btn.dataset.add;
    const id = btn.id;
    
    if (bg) {
      canvas.style.background = `url('./assets/${bg}.jpg')`;
      canvas.style.backgroundSize = 'cover';
    } else if (add) {
      if (add === 'text') {
        const text = prompt('문장을 입력하세요:');
        if (text) addItem('text', text);
      } else if (add === 'card') {
        addItem('card', '새 카드');
      }
    } else if (id === 'save') {
      saveRoom();
      alert('저장되었습니다');
    }
  });
  
  // Initialize
  loadRoom();
  
  // Set initial background
  canvas.style.cssText = `
    min-height: 100vh;
    position: relative;
    background: linear-gradient(135deg, #CFE8FF 0%, #B8D9F7 100%);
  `;
  
  console.log('[room] Initialized');
})();
