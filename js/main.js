document.addEventListener("DOMContentLoaded", () => {
  populateContent();
  setupUnlock();
  setupFlowers();
  setupStory();
  setupModal();
  startCounter();
});

let letterRead = false;

function getMonthsBetween(start, end) {
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();
  if (end.getDate() < start.getDate()) months--;
  return Math.max(0, months);
}

function populateContent() {
  document.getElementById("creator-signature").textContent = CONFIG.signature;
  document.getElementById("hero-title").textContent = CONFIG.heroTitle;
  document.getElementById("hero-sub").textContent = CONFIG.heroSubtitle;
  document.getElementById("hero-msg").textContent = CONFIG.heroMessage;
  document.getElementById("flower-title").textContent = CONFIG.flowerTitle;
  document.getElementById("flower-sub").textContent = CONFIG.flowerSub;
  document.getElementById("flower-hint").textContent = CONFIG.flowerHint;
  document.getElementById("flower-btn").textContent = CONFIG.flowerButton;
  document.getElementById("forever-title").textContent = CONFIG.foreverTitle;
  document.getElementById("forever-message").textContent = CONFIG.foreverMessage;
  document.getElementById("monthsary-title").textContent = CONFIG.monthsaryTitle;
  document.getElementById("monthsary-sub").textContent = CONFIG.monthsarySub;
  document.getElementById("monthsary-footer").textContent = CONFIG.monthsaryFooter;
  document.getElementById("modal-title").textContent = CONFIG.lovedModalTitle;
  document.getElementById("modal-message").textContent = CONFIG.lovedModalMessage;
  document.getElementById("story-section-title").textContent = CONFIG.storySectionTitle;
  document.getElementById("full-letter-title").textContent = CONFIG.fullLetterTitle;
  document.getElementById("full-letter-body").textContent = CONFIG.fullLetterBody;

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

  input.addEventListener("input", () => {
    const digits = input.value.replace(/\D/g, "").slice(0, 8);
    let formatted = digits;
    if (digits.length > 2) formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    if (digits.length > 4) formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    input.value = formatted;
  });

  function tryUnlock() {
    if (input.value === CONFIG.unlockDate) {
      document.getElementById("unlock-screen").classList.add("hidden");
      document.getElementById("main-site").classList.remove("hidden");
      document.body.classList.add("content-locked");
      error.classList.add("hidden");
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      error.classList.remove("hidden");
      input.style.borderColor = "#1a1a1a";
      setTimeout(() => { input.style.borderColor = ""; }, 2000);
    }
  }

  btn.addEventListener("click", tryUnlock);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryUnlock();
  });
}

function setupFlowers() {
  const btn = document.getElementById("flower-btn");
  const hint = document.getElementById("flower-hint");
  const flowers = document.querySelectorAll(".bloom-flower");
  let bloomed = false;

  btn.addEventListener("click", () => {
    if (bloomed) return;
    bloomed = true;

    hint.textContent = CONFIG.flowerHintOpening;
    hint.classList.add("flower-hint-active");

    flowers.forEach((flower, i) => {
      setTimeout(() => flower.classList.add("bloomed"), i * 250);
    });

    btn.textContent = "🌸 17 months of love!";
    btn.disabled = true;
    setTimeout(() => showModal(), 1500);
  });
}

function unlockRestOfSite() {
  if (letterRead) return;
  letterRead = true;

  document.body.classList.remove("content-locked");
  const locked = document.getElementById("locked-content");
  const hero = document.getElementById("hero-section");
  locked.classList.remove("hidden");
  hero.classList.remove("content-only");

  setTimeout(() => {
    locked.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 400);
}

function closeModalAndContinue() {
  document.getElementById("loved-modal").classList.add("hidden");
  unlockRestOfSite();
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

  document.getElementById("modal-close").addEventListener("click", closeModalAndContinue);
  document.getElementById("modal-continue-btn").addEventListener("click", closeModalAndContinue);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModalAndContinue();
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
    const weeks = Math.floor(days / 7);
    const months = getMonthsBetween(start, now);

    document.getElementById("months").textContent = months;
    document.getElementById("weeks").textContent = weeks;
    document.getElementById("days").textContent = days;
  }

  update();
  setInterval(update, 60000);
}
