// LUWEI Player - Web Component for Routine Playback
(function(){
  class LuweiPlayer extends HTMLElement{
    connectedCallback(){
      this.id_ = this.getAttribute('data-id') || ('routine_'+Date.now());
      this.title_ = this.getAttribute('title') || 'Routine';
      this.src_ = this.getAttribute('audio-src');
      this.dur_ = parseInt(this.getAttribute('duration')||'60',10);
      this.color_ = this.getAttribute('color') || '#CFE8FF';

      this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML = `
        <style>
          :host{ 
            display:inline-block; 
            font-family: 'Noto Sans KR', system-ui; 
          }
          .box{ 
            display:flex; 
            align-items:center; 
            gap:.75rem; 
            padding:.75rem 1rem; 
            border:1px solid rgba(200, 200, 200, 0.3); 
            border-radius:1rem; 
            background:rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          .box:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
          }
          .dot{ 
            width:14px; 
            height:14px; 
            border-radius:999px; 
            background:${this.color_}; 
            box-shadow:0 0 18px ${this.color_}80;
            animation: pulse 2s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          .title{ 
            font-size:.95rem; 
            opacity:.9; 
            flex: 1;
          }
          .btn{ 
            padding:.5rem .85rem; 
            border-radius:.85rem; 
            border:1px solid rgba(200, 200, 200, 0.5); 
            background:#fff; 
            cursor:pointer;
            font-size: 0.9rem;
            transition: all 0.2s ease;
          }
          .btn:hover {
            background: rgba(207, 232, 255, 0.3);
          }
          .time{ 
            font-size:.85rem; 
            opacity:.65;
            min-width: 40px;
            text-align: right;
          }
        </style>
        <div class="box">
          <div class="dot"></div>
          <div class="title">${this.title_}</div>
          <button class="btn" part="btn">재생</button>
          <span class="time" part="time">${this.dur_}s</span>
        </div>
      `;
      this.btn = this.shadowRoot.querySelector('.btn');
      this.timeEl = this.shadowRoot.querySelector('.time');

      this.audio = new Audio(this.src_);
      this.audio.preload = 'auto';
      this.audio.addEventListener('ended', ()=> this.finish());
      this.playing = false;
      this.remaining = this.dur_;
      this.timer = null;

      this.btn.addEventListener('click', ()=> this.toggle());
    }
    
    toggle(){
      if(!this.playing){ this.start(); } else { this.pause(); }
    }
    
    start(){
      this.audio.currentTime = 0;
      this.audio.play().catch(()=>{});
      this.playing = true;
      this.btn.textContent = '일시정지';
      const start = Date.now();
      this.timer = setInterval(()=>{
        const elapsed = Math.floor((Date.now()-start)/1000);
        const left = Math.max(0, this.dur_ - elapsed);
        this.remaining = left;
        this.timeEl.textContent = left+'s';
        if(left<=0){ this.finish(); }
      }, 250);
    }
    
    pause(){
      this.audio.pause();
      this.playing = false;
      this.btn.textContent = '재생';
      clearInterval(this.timer);
    }
    
    finish(){
      clearInterval(this.timer);
      this.playing = false;
      this.btn.textContent = '완료';
      this.timeEl.textContent = '0s';
      this.audio.currentTime = 0;
      // 완료 이벤트 → 리플렉션 모달 트리거
      window.dispatchEvent(new CustomEvent('luwei:routineCompleted', {
        detail:{
          id: this.id_,
          title: this.title_,
          duration: this.dur_,
          src: this.src_
        }
      }));
    }
  }
  
  customElements.define('luwei-player', LuweiPlayer);
})();
