// ===== NAV ACTIVE =====
const page = document.body.dataset.page;
document.querySelectorAll(".nav a").forEach(a=>{
  if(a.href.includes(page)){
    a.classList.add("active");
  }
});

// ===== REVEAL ANIMATION =====
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("active");
    }
  });
},{threshold:0.15});

document.querySelectorAll(".section, .card, .hero").forEach(el=>{
  el.classList.add("reveal");
  observer.observe(el);
});

// ===== CARD GLOW TRACK =====
document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", e.clientX - rect.left + "px");
    card.style.setProperty("--y", e.clientY - rect.top + "px");
  });
});

// ===== SCROLLBAR =====
window.addEventListener("scroll",()=>{
  const h=document.documentElement;
  const sc=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;

  let bar=document.getElementById("scrollbar");
  if(!bar){
    bar=document.createElement("div");
    bar.id="scrollbar";
    bar.style.position="fixed";
    bar.style.top="0";
    bar.style.left="0";
    bar.style.height="3px";
    bar.style.background="linear-gradient(90deg,#7c3aed,#9d5cff)";
    document.body.appendChild(bar);
  }

  bar.style.width=sc+"%";
});