// ===== FAST READY / NO BLOCKING LOADER =====
document.addEventListener("DOMContentLoaded",()=>{
  const preloader=document.getElementById("preloader")||document.getElementById("loading-screen");
  if(preloader) preloader.remove();
  document.documentElement.classList.remove("loading");
  document.body.classList.remove("loading");
});

// ===== REVEAL =====
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduceMotion){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("active"); });
  },{threshold:.15});

  document.querySelectorAll(".section,.card,.hero").forEach(el=>{
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// ===== NAV ACTIVE =====
const page=document.body.dataset.page;
const currentFile=location.pathname.split("/").pop()||"index.html";
document.querySelectorAll(".nav a").forEach(a=>{
  const href=(a.getAttribute("href")||"").split("/").pop();
  if((page && a.dataset.nav===page) || (href && href===currentFile)){
    a.classList.add("active");
  }
});

// ===== SCROLLBAR =====
const scrollbar=document.getElementById("scrollbar");
if(scrollbar){
  const updateScroll=()=>{
    const h=document.documentElement;
    const max=h.scrollHeight-h.clientHeight;
    const sc=max>0?(h.scrollTop/max)*100:0;
    scrollbar.style.width=sc+"%";
  };
  window.addEventListener("scroll",updateScroll,{passive:true});
  updateScroll();
}

// ===== CURSOR GLOW (desktop only) =====
if(window.matchMedia("(hover: hover)").matches){
  const cursor=document.createElement("div");
  cursor.className="cursor-glow";
  document.body.appendChild(cursor);
  document.addEventListener("mousemove",e=>{
    cursor.style.left=e.clientX+"px";
    cursor.style.top=e.clientY+"px";
  });
}

// ===== CARD INTERAÇÃO =====
document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty("--x", e.clientX-r.left+"px");
    card.style.setProperty("--y", e.clientY-r.top+"px");
  });
});

// ===== HERO PARALLAX =====
const hero=document.querySelector(".hero");
if(hero && !reduceMotion){
  window.addEventListener("scroll",()=>{
    hero.style.transform=`translateY(${window.scrollY*0.08}px)`;
  },{passive:true});
}


// ===== MODALS =====
const lockScroll=(locked)=>{ document.body.style.overflow=locked?"hidden":""; };
document.querySelectorAll("[data-modal-open]").forEach(btn=>{
  btn.addEventListener("click",e=>{
    e.preventDefault();
    const id=btn.getAttribute("data-modal-open");
    const modal=document.getElementById(id);
    if(!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden","false");
    lockScroll(true);
  });
});

document.querySelectorAll("[data-modal-close]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const modal=btn.closest(".modal-overlay");
    if(!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden","true");
    lockScroll(false);
  });
});

document.querySelectorAll(".modal-overlay").forEach(overlay=>{
  overlay.addEventListener("click",e=>{
    if(e.target!==overlay) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden","true");
    lockScroll(false);
  });
});

document.addEventListener("keydown",e=>{
  if(e.key!=="Escape") return;
  document.querySelectorAll(".modal-overlay.is-open").forEach(modal=>{
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden","true");
  });
  lockScroll(false);
});
