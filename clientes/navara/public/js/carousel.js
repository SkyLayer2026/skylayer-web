(async function(){
  const inner = document.getElementById('carouselInner');
  if (!inner) return;
  try {
    const refs = await fetch('/api/references/carousel').then(r=>r.json()).catch(()=>[]);
    inner.innerHTML = '';
    if(!Array.isArray(refs) || refs.length === 0){
      inner.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666">Sem imagens</div>';
      return;
    }
    refs.forEach(r=>{
      const img = document.createElement('img');
      img.src = r.image || ('/uploads/references/' + (r.filename||''));
      img.alt = r.title || '';
      inner.appendChild(img);
    });
    let idx = 0;
    setInterval(()=> {
      idx = (idx + 1) % Math.max(1, inner.children.length);
      inner.style.transform = `translateX(-${idx*100}%)`;
    },5000);
  } catch(e){ console.error(e); }
})();

