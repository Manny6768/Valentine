function setYes(){ localStorage.setItem("julissaYes","true"); }
function hasYes(){ return localStorage.getItem("julissaYes")==="true"; }

function enableSpotlight(){
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty("--mx", mx + "%");
      card.style.setProperty("--my", my + "%");
    });
  });
}

function spawnFloatingHearts(count=18){
  const holder = document.querySelector(".hearts");
  if(!holder) return;

  const colors = [
    "rgba(255,45,109,.85)",
    "rgba(255,79,154,.75)",
    "rgba(183,155,255,.70)",
    "rgba(255,179,122,.75)",
    "rgba(126,227,194,.70)"
  ];

  for(let i=0;i<count;i++){
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = (Math.random()*100) + "vw";
    h.style.animationDuration = (28 + Math.random()*20) + "s";
    h.style.animationDelay = (Math.random()*-12) + "s";
    const c = colors[Math.floor(Math.random()*colors.length)];
    h.style.setProperty("--heartColor", c);

    const s = 16 + Math.random()*18;
    h.style.width = s + "px";
    h.style.height = s + "px";
    h.style.opacity = (0.18 + Math.random()*0.32).toFixed(2);

    holder.appendChild(h);
  }
}

function attachRunawayNo(id){
  const btn = document.getElementById(id);
  if(!btn) return;
  const move = () => {
    btn.style.position = "fixed";
    btn.style.left = (6 + Math.random()*88) + "vw";
    btn.style.top  = (10 + Math.random()*78) + "vh";
  };
  btn.addEventListener("mouseover", move);
  btn.addEventListener("click", move);
}

function confettiHearts(fromEl, amount=34){
  const r = fromEl.getBoundingClientRect();
  const x = r.left + r.width/2;
  const y = r.top + r.height/2;

  const colors = [
    "rgba(255,45,109,.95)",
    "rgba(255,79,154,.90)",
    "rgba(183,155,255,.85)",
    "rgba(255,179,122,.90)",
    "rgba(126,227,194,.85)"
  ];

  for(let i=0;i<amount;i++){
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = x + "px";
    c.style.top  = y + "px";
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.setProperty("--dx", (Math.random()*420 - 210) + "px");
    c.style.setProperty("--dy", (Math.random()*-420 - 80) + "px");
    document.body.appendChild(c);
    setTimeout(()=>c.remove(), 1250);
  }
}

window.Valentine = {
  setYes, hasYes,
  enableSpotlight,
  spawnFloatingHearts,
  attachRunawayNo,
  confettiHearts
};

function fireworksBurst(fromEl){
  const r = fromEl.getBoundingClientRect();
  const x = r.left + r.width/2;
  const y = r.top + r.height/2;

  // rings
  const mkRing = (cls, delay=0) => {
    const ring = document.createElement("div");
    ring.className = "fw-ring " + cls;
    ring.style.setProperty("--x", x + "px");
    ring.style.setProperty("--y", y + "px");
    document.body.appendChild(ring);
    setTimeout(()=> ring.remove(), 1400);
  };

  mkRing("r1", 0);
  setTimeout(()=> mkRing("r2"), 90);
  setTimeout(()=> mkRing("r3"), 170);

  // sparks
  const colors = [
    "rgba(255,255,255,.95)",
    "rgba(255,79,154,.95)",
    "rgba(183,155,255,.92)",
    "rgba(255,179,122,.95)",
    "rgba(126,227,194,.90)"
  ];

  const count = 28;
  for(let i=0;i<count;i++){
    const s = document.createElement("div");
    s.className = "spark";
    s.style.setProperty("--x", x + "px");
    s.style.setProperty("--y", y + "px");

    const angle = Math.random() * Math.PI * 2;
    const dist = 160 + Math.random()*180;
    const dx = Math.cos(angle) * dist + "px";
    const dy = Math.sin(angle) * dist + "px";

    s.style.setProperty("--dx", dx);
    s.style.setProperty("--dy", dy);
    s.style.setProperty("--c", colors[Math.floor(Math.random()*colors.length)]);
    s.style.setProperty("--a", (Math.random()*360) + "deg");

    document.body.appendChild(s);
    setTimeout(()=> s.remove(), 1300);
  }
}

function typewriter(el, text, speed=26){
  if(!el) return;
  el.textContent = "";
  let i = 0;

  // cursor
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "|";

  el.appendChild(document.createTextNode(""));
  el.appendChild(cursor);

  const tick = () => {
    i++;
    el.childNodes[0].textContent = text.slice(0, i);
    if(i < text.length){
      setTimeout(tick, speed);
    } else {
      // stop cursor blink after a moment (optional)
      setTimeout(()=> cursor.remove(), 1400);
    }
  };
  tick();
}

/* expose them */
window.Valentine = window.Valentine || {};
window.Valentine.fireworksBurst = fireworksBurst;
window.Valentine.typewriter = typewriter;


function shockwave(fromEl){
  const r = fromEl.getBoundingClientRect();
  const ring = document.createElement("div");
  ring.className = "ring";
  ring.style.left = (r.left + r.width/2) + "px";
  ring.style.top  = (r.top + r.height/2) + "px";
  document.body.appendChild(ring);
  setTimeout(()=>ring.remove(), 950);
}

function heartRain(ms=2500){
  const colors = [
    "rgba(255,45,109,.95)",
    "rgba(255,79,154,.92)",
    "rgba(183,155,255,.88)",
    "rgba(255,179,122,.92)",
    "rgba(126,227,194,.85)"
  ];

  const endAt = Date.now() + ms;
  const interval = setInterval(() => {
    for(let i=0;i<3;i++){
      const h = document.createElement("div");
      h.className = "rainHeart";
      h.style.left = (Math.random()*100) + "vw";
      h.style.setProperty("--heartColor", colors[Math.floor(Math.random()*colors.length)]);
      h.style.setProperty("--rot", (120 + Math.random()*240) + "deg");
      h.style.setProperty("--dur", (2200 + Math.random()*1400) + "ms");
      document.body.appendChild(h);
      setTimeout(()=>h.remove(), 4200);
    }
    if(Date.now() > endAt){
      clearInterval(interval);
    }
  }, 180);
}

window.Valentine.shockwave = shockwave;
window.Valentine.heartRain = heartRain;


function clearYes(){ localStorage.removeItem("julissaYes"); }
window.Valentine.clearYes = clearYes;




