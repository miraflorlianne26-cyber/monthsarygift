document.addEventListener("DOMContentLoaded", () => {
  populateContent();
  setupUnlock();
  setupCake();
  setupHeart();
  setupLetter();
  setupStory();
  setupModal();
  startCounter();
});

function populateContent() {
  document.getElementById("creator-name").textContent = CONFIG.yourName;
  document.getElementById("footer-name").textContent = CONFIG.yourName;
  document.getElementById("hero-title").textContent = CONFIG.birthdayTitle;
  document.getElementById("hero-sub").textContent = CONFIG.birthdaySubtitle;
  document.getElementById("hero-msg").textContent = CONFIG.birthdayMessage;
  document.getElementById("letter-title").textContent = CONFIG.loveLetterTitle;
  document.getElementById("letter-message").textContent = CONFIG.loveLetterMessage;
  document.getElementById("modal-title").textContent = CONFIG.lovedModalTitle;
  document.getElementById("modal-message").textContent = CONFIG.lovedModalMessage;
  document.getElementById("full-letter-title").textContent = CONFIG.fullLetterTitle;
  document.getElementById("full-letter-body").textContent = CONFIG.fullLetterBody;

  const bannerEl = document.getElementById("banner-photos");
  CONFIG.bannerPhotos.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Us";
    bannerEl.appendChild(img);
  });

  const gridEl = document.getElementById("photo-grid");
  CONFIG.photos.forEach(({ src, alt }) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    gridEl.appendChild(img);
  });

  const reasonsEl = document.getElementById("reasons-grid");
  CONFIG.reasons.forEach(({ emoji, text }) => {
    const card = document.createElement("div");
    card.className = "reason-card";
    card.innerHTML = `<span class="reason-emoji">${emoji}</span><p>${text}</p>`;
    reasonsEl.appendChild(card);
  });
}

function setupUnlock() {
  const btn = document.getElementById("unlock-btn");
  const input = document.getElementById("birthdate-input");
  const error = document.getElementById("unlock-error");

  function tryUnlock() {
    if (input.value === CONFIG.birthdate) {
      document.getElementById("unlock-screen").classList.add("hidden");
      document.getElementById("main-site").classList.remove("hidden");
      error.classList.add("hidden");
    } else {
      error.classList.remove("hidden");
      input.style.borderColor = "#e91e63";
      setTimeout(() => { input.style.borderColor = ""; }, 2000);
    }
  }

  btn.addEventListener("click", tryUnlock);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryUnlock();
  });
}

function setupCake() {
  const btn = document.getElementById("blow-btn");
  const candles = document.querySelectorAll(".candle");
  let blown = 0;

  btn.addEventListener("click", () => {
    if (blown < candles.length) {
      candles[blown].classList.add("blown");
      blown++;
    }
    if (blown === candles.length) {
      btn.textContent = "🎉 Wish granted!";
      btn.disabled = true;
      setTimeout(() => showModal(), 800);
    }
  });
}

function setupHeart() {
  const openBtn = document.getElementById("open-heart-btn");
  const heartCard = document.getElementById("heart-card");

  openBtn.addEventListener("click", () => {
    heartCard.classList.remove("hidden");
    openBtn.classList.add("hidden");
    heartCard.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  heartCard.addEventListener("click", () => {
    showModal();
    document.getElementById("letter-trigger").scrollIntoView({ behavior: "smooth" });
  });
}

function setupLetter() {
  const trigger = document.getElementById("letter-trigger");
  const reveal = document.getElementById("letter-reveal");

  trigger.addEventListener("click", () => {
    trigger.classList.add("hidden");
    reveal.classList.remove("hidden");
  });
}

function setupStory() {
  const openBtn = document.getElementById("story-open-btn");
  const letter = document.getElementById("story-letter");
  const closeBtn = document.getElementById("close-letter-btn");

  openBtn.addEventListener("click", () => {
    openBtn.classList.add("hidden");
    letter.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    letter.classList.add("hidden");
    openBtn.classList.remove("hidden");
  });
}

function setupModal() {
  const modal = document.getElementById("loved-modal");
  document.getElementById("modal-close").addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}

function showModal() {
  document.getElementById("loved-modal").classList.remove("hidden");
}

function startCounter() {
  const start = new Date(CONFIG.relationshipStart + "T00:00:00");

  function update() {
    const now = new Date();
    const diff = now - start;
    if (diff < 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }

  update();
  setInterval(update, 1000);
}
