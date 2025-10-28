// LUWEI Sync - Offline Queue + Reconnection Sync
(function(){
  const QK = 'luwei_offline_queue';
  
  function qload(){ 
    try{ return JSON.parse(localStorage.getItem(QK)||'[]'); }catch(_){ return []; } 
  }
  
  function qsave(arr){ 
    localStorage.setItem(QK, JSON.stringify(arr)); 
  }

  async function flush(){
    const arr = qload(); 
    if(arr.length===0) return;
    
    // TODO: 실제 서버 엔드포인트로 교체
    const endpoint = '/edge/emotion/batch'; // 더미
    
    try{
      // 실제로는 fetch POST. 여기선 성공 가정 후 비우기
      // await fetch(endpoint, {
      //   method:'POST',
      //   headers:{'content-type':'application/json'},
      //   body:JSON.stringify(arr)
      // });
      
      console.log('[luwei-sync] flushed', arr.length, 'items');
      qsave([]); // 성공시 비움
    }catch(err){
      console.warn('[luwei-sync] flush failed', err);
    }
  }

  window.luweiSync = {
    enqueue(item){
      const arr = qload(); 
      arr.push({ ...item, createdAt: Date.now() }); 
      qsave(arr);
      console.log('[luwei-sync] enqueued', item.type);
    },
    flush,
    getQueue(){
      return qload();
    }
  };

  // 온라인 상태로 돌아오면 동기화 시도
  window.addEventListener('online', flush);
  
  // 페이지 로드 후 1.5초 후 동기화 시도
  setTimeout(flush, 1500);
})();
