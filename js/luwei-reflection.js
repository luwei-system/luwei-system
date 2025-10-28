// LUWEI Reflection - Modal for Emotion Reflection
(function(){
  const KEY='luwei_reflections';
  
  function load(){ 
    try{ return JSON.parse(localStorage.getItem(KEY)||'[]'); }catch(_){ return []; } 
  }
  
  function save(arr){ 
    localStorage.setItem(KEY, JSON.stringify(arr)); 
  }

  function openModal(payload){
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(5px);display:grid;place-items:center;z-index:99999;font-family: "Noto Sans KR", system-ui';
    
    wrap.innerHTML = `
      <style>
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .modal-content {
          animation: fadeIn 0.3s ease-out;
        }
      </style>
      <div class="modal-content" style="width:min(92vw,520px);border:1px solid rgba(200,200,200,0.3);border-radius:20px;background:#fff;padding:24px;box-shadow:0 10px 40px rgba(0,0,0,0.2)">
        <h3 style="margin:0 0 16px 0;font-size:20px;color:#333;">루틴 리플렉션</h3>
        
        <label style="display:block;margin:.5rem 0;font-size:14px;color:#666">
          감정의 색
          <input id="lu_color" type="color" value="#CFE8FF" style="width:100%;height:50px;border:1px solid rgba(200,200,200,0.5);border-radius:12px;cursor:pointer;margin-top:8px"/>
        </label>
        
        <label style="display:block;margin:.5rem 0;font-size:14px;color:#666">
          감정의 강도
          <div style="display:flex;align-items:center;gap:10px;margin-top:8px">
            <input id="lu_int" type="range" min="0" max="100" value="40" style="flex:1;cursor:pointer"/>
            <span id="lu_int_val" style="font-size:14px;color:#333;min-width:40px;text-align:right">40%</span>
          </div>
        </label>
        
        <label style="display:block;margin:.5rem 0 .75rem;font-size:14px;color:#666">
          오늘의 한 줄
          <input id="lu_note" type="text" placeholder="이 순간의 감정을 적어보세요" style="width:100%;height:40px;border:1px solid rgba(200,200,200,0.5);border-radius:12px;padding:0 14px;margin-top:8px;font-size:14px;transition:border 0.2s"/>
        </label>
        
        <div style="display:flex;gap:.5rem;justify-content:flex-end;margin-top:20px">
          <button id="lu_cancel" style="padding:.6rem 1.2rem;border-radius:10px;border:1px solid rgba(200,200,200,0.5);background:#fff;cursor:pointer;font-size:14px;transition:all 0.2s">닫기</button>
          <button id="lu_save" style="padding:.6rem 1.2rem;border-radius:10px;border:none;background:linear-gradient(135deg, #CFE8FF 0%, #B8D9F7 100%);cursor:pointer;font-size:14px;font-weight:500;color:#333;transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.1)">저장</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(wrap);

    // 강도 슬라이더 업데이트
    const intSlider = wrap.querySelector('#lu_int');
    const intVal = wrap.querySelector('#lu_int_val');
    intSlider.addEventListener('input', () => {
      intVal.textContent = intSlider.value + '%';
    });

    // 인풋 포커스 효과
    wrap.querySelector('#lu_note').addEventListener('focus', function(){
      this.style.border = '1px solid #CFE8FF';
    });
    wrap.querySelector('#lu_note').addEventListener('blur', function(){
      this.style.border = '1px solid rgba(200,200,200,0.5)';
    });

    wrap.querySelector('#lu_cancel').onclick = () => wrap.remove();
    
    wrap.querySelector('#lu_save').onclick = () => {
      const color = wrap.querySelector('#lu_color').value;
      const intensity = +wrap.querySelector('#lu_int').value;
      const note = wrap.querySelector('#lu_note').value || '';
      const rec = { ...payload, color, intensity, note, ts: Date.now(), device:'web' };

      const arr = load(); 
      arr.push(rec); 
      save(arr);

      // 오프라인 큐로도 푸시(나중 동기화)
      if(window.luweiSync && window.luweiSync.enqueue){
        const sess = (window.luweiAuth && window.luweiAuth.getSession && window.luweiAuth.getSession()) || null;
        const userId = sess && sess.user && (sess.user.id || sess.user.uid || sess.user.email) || null;
        window.luweiSync.enqueue({ 
          type:'emotion', 
          payload:{
            session:{ user_id: userId, routine_slug:'water', duration_seconds: rec.duration, device:'web' },
            emotion:{ color_hex: color, intensity, note }
          }
        });
      }

      // 원소 활성화(랜덤) → 광장 방문 시 포털 깨어남
      const elements = ['sand','water','light','wind','void'];
      const pick = elements[Math.floor(Math.random()*elements.length)];
      localStorage.setItem('luwei_active_element', pick);

      // 모달 닫기
      wrap.style.opacity = '0';
      wrap.style.transition = 'opacity 0.2s';
      setTimeout(() => wrap.remove(), 200);
      
      // 저장 알림
      setTimeout(() => {
        const notice = document.createElement('div');
        notice.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:rgba(255,255,255,0.95);padding:12px 24px;border-radius:50px;box-shadow:0 4px 20px rgba(0,0,0,0.2);z-index:99999;font-size:14px;color:#333;font-family:"Noto Sans KR"';
        notice.textContent = '✓ 저장되었습니다. 광장에서 문이 깨어납니다.';
        document.body.appendChild(notice);
        setTimeout(() => {
          notice.style.opacity = '0';
          notice.style.transition = 'opacity 0.3s';
          setTimeout(() => notice.remove(), 300);
        }, 2000);
      }, 100);
    };
  }

  // 루틴 완료 시 모달 자동 열기
  window.addEventListener('luwei:routineCompleted', (e) => {
    setTimeout(() => openModal(e.detail), 300);
  });
})();
