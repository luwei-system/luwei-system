// LUWEI Plaza - Portal UI Management
(function() {
  'use strict';
  
  const portalsContainer = document.getElementById('portals');
  const allElements = ['sand', 'water', 'light', 'wind', 'void', 'ether', 'stone', 'flame', 'mist', 'star'];
  
  function createPortalElement(name) {
    const div = document.createElement('div');
    div.className = `portal ${name}`;
    div.setAttribute('data-element', name);
    div.style.cssText = `
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.5);
      background: radial-gradient(circle, rgba(207, 232, 255, 0.3), rgba(207, 232, 255, 0.1));
      cursor: pointer;
      transition: all 0.3s ease;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--lu-font-kr);
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      box-shadow: 0 0 30px rgba(207, 232, 255, 0.5);
    `;
    div.textContent = name.toUpperCase();
    
    div.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 0 40px rgba(207, 232, 255, 0.8)';
    });
    
    div.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 0 30px rgba(207, 232, 255, 0.5)';
    });
    
    return div;
  }
  
  function initPlaza() {
    if (!portalsContainer) {
      console.warn('[plaza] portals container not found');
      return;
    }
    
    // Check for active element
    const activeElement = localStorage.getItem('luwei_active_element');
    
    if (activeElement) {
      // Create active portal
      const portal = createPortalElement(activeElement);
      portal.style.left = 'calc(50% - 100px)';
      portal.style.top = 'calc(50% - 100px)';
      portal.style.opacity = '1';
      portal.classList.add('active');
      
      portal.addEventListener('click', function() {
        window.location.href = `world_${activeElement}.html`;
      });
      
      portalsContainer.appendChild(portal);
    }
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlaza);
  } else {
    initPlaza();
  }
})();
