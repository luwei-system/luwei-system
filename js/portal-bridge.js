// LUWEI Portal Bridge - App to Web Portal Activation
(function() {
  'use strict';
  
  const BRIDGE_KEY = 'luwei_portal_bridge';
  
  // Listen for app messages (if in webview)
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'luwei:activate') {
      const element = e.data.element || 'water';
      localStorage.setItem('luwei_active_element', element);
      console.log('[portal-bridge] Portal activated:', element);
    }
  });
  
  // Provide activation method for testing
  window.luweiActivatePortal = function(element) {
    localStorage.setItem('luwei_active_element', element);
    console.log('[portal-bridge] Manual activation:', element);
  };
  
  console.log('[portal-bridge] Loaded');
})();
