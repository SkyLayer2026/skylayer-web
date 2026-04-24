
// ===== REMOVE LOADING OVERLAYS =====
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll('#loading,#loader,#loading-screen,.loader,.loading,.preloader,[data-loading-screen]').forEach(el=>el.remove());
  document.body.classList.remove('loading');
  document.body.style.opacity='1';
  document.body.style.visibility='visible';
});

// ===== REVEAL =====
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("active");
    }
  });
},{threshold:.15});

document.querySelectorAll(".section,.card,.hero").forEach(el=>{
  el.classList.add("reveal");
  observer.observe(el);
});

// ===== NAV ACTIVE =====
const page=document.body.dataset.page;
document.querySelectorAll(".nav a").forEach(a=>{
  if(a.href.includes(page)){
    a.classList.add("active");
  }
});

// ===== SCROLLBAR =====
window.addEventListener("scroll",()=>{
  const h=document.documentElement;
  const sc=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;
  document.getElementById("scrollbar").style.width=sc+"%";
});

// ===== CURSOR GLOW =====
const cursor=document.createElement("div");
cursor.className="cursor-glow";
document.body.appendChild(cursor);

document.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";
});

// ===== CARD INTERAÇÃO =====
document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty("--x", e.clientX-r.left+"px");
    card.style.setProperty("--y", e.clientY-r.top+"px");
  });
});

// ===== HERO PARALLAX =====
window.addEventListener("scroll",()=>{
  const y=window.scrollY;
  const hero=document.querySelector(".hero");
  if(hero){
    hero.style.transform=`translateY(${y*0.15}px)`;
  }
});