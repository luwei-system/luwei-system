// LUWEI Hourglass - Sand Timer with Emotion Recording
(function() {
  'use strict';
  
  const hourglass = document.getElementById('hg');
  const sand = document.getElementById('sand');
  const addBtn = document.getElementById('add');
  const releaseBtn = document.getElementById('release');
  const note = document.getElementById('note');
  
  if (!hourglass || !sand || !addBtn || !releaseBtn || !note) {
    console.warn('[hourglass] Required elements not found');
    return;
  }
  
  let sandCount = 0;
  const maxSand = 10;
  
  // Load saved sand count
  function loadSand() {
    try {
      const saved = localStorage.getItem('luwei_hourglass_sand');
      if (saved) {
        sandCount = parseInt(saved, 10) || 0;
        updateSand();
      }
    } catch (e) {
      console.warn('[hourglass] Failed to load sand:', e);
    }
  }
  
  // Save sand count
  function saveSand() {
    localStorage.setItem('luwei_hourglass_sand', sandCount.toString());
  }
  
  // Update sand display
  function updateSand() {
    const percentage = Math.min((sandCount / maxSand) * 100, 100);
    sand.style.height = percentage + '%';
    sand.style.background = `radial-gradient(circle at 50% ${percentage}%, 
      rgba(255, 182, 82, 1) 0%,
      rgba(255, 165, 0, 0.9) 50%,
      rgba(255, 140, 0, 0.7) 100%)`;
    note.textContent = `모래: ${sandCount}/${maxSand}`;
  }
  
  // Add sand particle
  function addSandParticle() {
    if (sandCount >= maxSand) {
      alert('모래가 가득 찼습니다');
      return;
    }
    
    sandCount++;
    updateSand();
    saveSand();
    
    // Add visual particle
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: rgba(255, 182, 82, 0.9);
      border-radius: 50%;
      top: ${Math.random() * 20}%;
      left: ${Math.random() * 100}%;
      pointer-events: none;
    `;
    hourglass.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
  }
  
  // Release sand (portal activation)
  function releaseSand() {
    if (sandCount === 0) {
      alert('비울 모래가 없습니다');
      return;
    }
    
    // Animate release
    sand.style.transition = 'all 2s ease-out';
    sand.style.height = '0%';
    
    setTimeout(() => {
      sandCount = 0;
      updateSand();
      saveSand();
      sand.style.transition = '';
      
      // Activate portal
      const elements = ['sand', 'water', 'light', 'wind', 'void'];
      const pick = elements[Math.floor(Math.random() * elements.length)];
      localStorage.setItem('luwei_active_element', pick);
      
      alert(`모래를 비웠습니다. "${pick}" 문이 깨어났습니다.`);
    }, 2000);
  }
  
  // Event listeners
  addBtn.addEventListener('click', addSandParticle);
  releaseBtn.addEventListener('click', releaseSand);
  
  // Initialize
  hourglass.style.cssText = `
    position: relative;
    width: 300px;
    height: 400px;
    margin: 0 auto;
    background: radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
    overflow: hidden;
  `;
  
  sand.style.cssText = `
    position: absolute;
    bottom: 0;
    width: 100%;
    transition: height 0.3s ease;
  `;
  
  loadSand();
  console.log('[hourglass] Initialized');
})();
