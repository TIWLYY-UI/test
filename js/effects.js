function createSplashIntro() {
  if (sessionStorage.getItem("fxSplashShown")) return;
  sessionStorage.setItem("fxSplashShown", "1");

  const splash = document.createElement("div");
  splash.className = "fx-splash";
  splash.innerHTML = `
    <div class="fx-splash-center">
      <h1>FINMASTER 3D EXPERIENCE</h1>
      <p>Loading dollar storm background...</p>
    </div>
    <div class="coin-track"></div>
    <div class="coin"></div>
    <div class="coin coin-b"></div>
    <div class="coin coin-c"></div>
  `;
  document.body.appendChild(splash);

  setTimeout(() => splash.classList.add("hide"), 3200);
  setTimeout(() => splash.remove(), 4600);
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
  if (typeof initThreeBackground === "function") {
    initThreeBackground();
  }
  enableTiltCards();
  upgradeButtons();
});
