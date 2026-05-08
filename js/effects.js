function createSplashIntro() {
  if (sessionStorage.getItem("fxSplashShown")) return;
  sessionStorage.setItem("fxSplashShown", "1");

  const splash = document.createElement("div");
  splash.className = "fx-splash";
  splash.innerHTML = `
    <div class="fx-splash-center">
      <h1>NOVASPHERE 3D EXPERIENCE</h1>
      <p>Loading animated universe...</p>
    </div>
    <div class="coin-track"></div>
    <div class="coin"></div>
    <div class="coin coin-b"></div>
    <div class="coin coin-c"></div>
  `;
  document.body.appendChild(splash);

  setTimeout(() => splash.classList.add("hide"), 3800);
  setTimeout(() => splash.remove(), 5200);
}

function createFxCanvas() {
  if (document.getElementById("fxCanvas")) return;
  const canvas = document.createElement("canvas");
  canvas.id = "fxCanvas";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const particles = [];
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  for (let i = 0; i < 55; i += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r: Math.random() * 2.4 + 0.8,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.max(Math.hypot(dx, dy), 1);
      if (dist < 160) {
        p.vx += (dx / dist) * 0.012;
        p.vy += (dy / dist) * 0.012;
      }
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.vy *= 0.99;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = "rgba(130, 150, 255, 0.55)";
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

function enableTiltCards() {
  document.querySelectorAll(".card, .hero-card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -8;
      const ry = ((x / rect.width) - 0.5) * 10;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function upgradeButtons() {
  document.querySelectorAll(".btn, .icon-btn").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createSplashIntro();
  createFxCanvas();
  enableTiltCards();
  upgradeButtons();
});
