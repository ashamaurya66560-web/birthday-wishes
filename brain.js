/* =========================================================
   SHIVANSH — THE LITTLE CHAMP'S DAY
   brain.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------
     ELEMENTS
  ----------------------------- */

  const sparkleLayer = document.getElementById("sparkle-layer");
  const confettiLayer = document.getElementById("confetti-layer");
  const fireworksLayer = document.getElementById("fireworks-layer");

  const soundToggle = document.getElementById("sound-toggle");

  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  const openingGift = document.getElementById("opening-gift");
  const openSurprise = document.getElementById("open-surprise");
  const reveal = document.getElementById("reveal");

  const surpriseGift = document.getElementById("surprise-gift");
  const surpriseCard = document.getElementById("surprise-card");
  const oneMoreSurprise = document.getElementById("one-more-surprise");

  const memorySlider = document.getElementById("memory-slider");
  const memorySlides = [...document.querySelectorAll(".memory-slide")];
  const memoryCounter = document.querySelector(".memory-counter");
  const memoryDots = document.querySelector(".memory-dots");

  const cinematicPhoto = document.getElementById("cinematic-photo");
  const cinematicImage = document.getElementById("cinematic-image");
  const cinematicPlaceholder = document.getElementById("cinematic-placeholder");
  const cinematicCaption = document.getElementById("cinematic-caption");
  const cinematicProgress = document.getElementById("cinematic-progress");

  const finalCake = document.getElementById("final-cake");
  const makeWish = document.getElementById("make-wish");
  const finalMessage = document.getElementById("final-message");

  /* -----------------------------
     SETTINGS
  ----------------------------- */

  let soundEnabled = true;
  let audioContext = null;

  let memoryIndex = 0;
  let cinematicRunning = false;

  /* -----------------------------
     AUDIO
  ----------------------------- */

  function getAudioContext() {
    if (!soundEnabled) return null;

    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
      }

      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      return audioContext;
    } catch (error) {
      return null;
    }
  }

  function tone(frequency, duration, type = "sine", volume = 0.035, delay = 0) {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(
        frequency,
        ctx.currentTime + delay
      );

      gain.gain.setValueAtTime(
        0.0001,
        ctx.currentTime + delay
      );

      gain.gain.exponentialRampToValueAtTime(
        volume,
        ctx.currentTime + delay + 0.02
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + delay + duration
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + duration + 0.03);
    } catch (error) {}
  }

  function soundClick() {
    tone(520, 0.08, "sine", 0.025);
  }

  function soundPop() {
    tone(180, 0.12, "sine", 0.045);
    tone(420, 0.16, "sine", 0.025, 0.04);
  }

  function soundChime() {
    tone(660, 0.20, "sine", 0.035);
    tone(880, 0.22, "sine", 0.030, 0.12);
    tone(1046, 0.28, "sine", 0.025, 0.25);
  }

  function soundCelebration() {
    tone(523, 0.18, "sine", 0.025);
    tone(659, 0.18, "sine", 0.025, 0.13);
    tone(784, 0.24, "sine", 0.030, 0.26);
  }

  function soundFinale() {
    tone(392, 0.35, "sine", 0.025);
    tone(523, 0.40, "sine", 0.030, 0.22);
    tone(659, 0.55, "sine", 0.035, 0.48);
    tone(784, 0.65, "sine", 0.025, 0.78);
  }

  /* -----------------------------
     SOUND BUTTON
  ----------------------------- */

  function updateSoundButton() {
    if (!soundToggle) return;

    soundToggle.textContent = soundEnabled
      ? "🔊"
      : "🔇";

    soundToggle.setAttribute(
      "aria-label",
      soundEnabled ? "Sound on" : "Sound off"
    );
  }

  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      updateSoundButton();

      if (soundEnabled) {
        soundClick();
      }
    });
  }

  updateSoundButton();

  /* -----------------------------
     SMALL HELPERS
  ----------------------------- */

  function scrollToSection(id) {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  /* -----------------------------
     NAVIGATION
  ----------------------------- */

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      soundClick();
    });

    navMenu.querySelectorAll("[data-target]").forEach(button => {
      button.addEventListener("click", () => {
        const target = button.dataset.target;

        navMenu.classList.remove("open");

        soundClick();

        setTimeout(() => {
          scrollToSection(target);
        }, 80);
      });
    });
  }

  /* -----------------------------
     SPARKLES
  ----------------------------- */

  function createSparkles(amount = 12) {
    if (!sparkleLayer) return;

    for (let i = 0; i < amount; i++) {

      const sparkle = document.createElement("span");

      sparkle.className = "sparkle";

      sparkle.textContent = Math.random() > 0.5
        ? "✦"
        : "✧";

      sparkle.style.left = random(5, 95) + "%";
      sparkle.style.top = random(8, 92) + "%";

      sparkle.style.animationDelay =
        random(0, 0.8) + "s";

      sparkleLayer.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 2600);
    }
  }

  /* -----------------------------
     CONFETTI
  ----------------------------- */

  function createConfetti(amount = 32) {
    if (!confettiLayer) return;

    const symbols = ["●", "■", "◆", "✦", "★"];

    for (let i = 0; i < amount; i++) {

      const piece = document.createElement("span");

      piece.className = "confetti-piece";

      piece.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      piece.style.left = random(5, 95) + "%";
      piece.style.top = random(-10, 15) + "%";

      piece.style.animationDelay =
        random(0, 0.5) + "s";

      piece.style.animationDuration =
        random(1.5, 2.7) + "s";

      confettiLayer.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, 3200);
    }

    soundCelebration();
  }

  /* -----------------------------
     FIREWORKS
  ----------------------------- */

  function createFirework(x, y) {
    if (!fireworksLayer) return;

    const burst = document.createElement("div");

    burst.className = "firework-burst";

    burst.style.left = x + "%";
    burst.style.top = y + "%";

    fireworksLayer.appendChild(burst);

    setTimeout(() => {
      burst.remove();
    }, 1800);
  }

  function createFireworks(amount = 3) {

    for (let i = 0; i < amount; i++) {

      setTimeout(() => {

        createFirework(
          random(20, 80),
          random(15, 48)
        );

        if (i === 0) {
          soundChime();
        }

      }, i * 420);
    }
  }

  /* -----------------------------
     IMAGE FALLBACK
  ----------------------------- */

  function setupImage(img, placeholder) {

    if (!img) return;

    function imageLoaded() {

      if (img.naturalWidth > 0) {

        img.classList.remove("photo-missing");

        if (placeholder) {
          placeholder.style.opacity = "0";
          placeholder.style.pointerEvents = "none";
        }
      }
    }

    function imageMissing() {

      img.classList.add("photo-missing");

      if (placeholder) {
        placeholder.style.opacity = "1";
        placeholder.style.pointerEvents = "auto";
      }
    }

    img.addEventListener("load", imageLoaded);
    img.addEventListener("error", imageMissing);

    if (img.complete) {

      if (img.naturalWidth > 0) {
        imageLoaded();
      } else {
        imageMissing();
      }
    }
  }

  document.querySelectorAll(".photo-frame").forEach(frame => {

    const img = frame.querySelector("img");
    const placeholder = frame.querySelector(".photo-placeholder");

    setupImage(img, placeholder);
  });

  setupImage(
    cinematicImage,
    cinematicPlaceholder
  );

  /* -----------------------------
     OPENING GIFT
  ----------------------------- */

  let openingOpened = false;

  function openOpeningGift() {

    if (openingOpened) return;

    openingOpened = true;

    if (openingGift) {
      openingGift.classList.add("opening");
    }

    soundPop();

    createSparkles(14);

    setTimeout(() => {
      createConfetti(35);
    }, 350);

    setTimeout(() => {

      if (reveal) {
        reveal.classList.add("revealed");
      }

      createFireworks(3);
      soundChime();

    }, 900);

    setTimeout(() => {
      scrollToSection("reveal");
    }, 1200);
  }

  if (openSurprise) {
    openSurprise.addEventListener("click", openOpeningGift);
  }

  if (openingGift) {
    openingGift.addEventListener("click", openOpeningGift);
  }

  /* -----------------------------
     MEMORY SLIDER
  ----------------------------- */

  function createMemoryDots() {

    if (!memoryDots) return;

    memoryDots.innerHTML = "";

    memorySlides.forEach((slide, index) => {

      const dot = document.createElement("span");

      dot.className = "dot";

      if (index === 0) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        memoryIndex = index;
        updateMemorySlider();
        soundClick();
      });

      memoryDots.appendChild(dot);
    });
  }

  function updateMemorySlider() {

    if (!memorySlides.length) return;

    memorySlides.forEach((slide, index) => {

      slide.classList.toggle(
        "active",
        index === memoryIndex
      );
    });

    if (memoryCounter) {

      memoryCounter.textContent =
        String(memoryIndex + 1).padStart(2, "0") +
        " / " +
        String(memorySlides.length).padStart(2, "0");
    }

    if (memoryDots) {

      memoryDots.querySelectorAll(".dot")
        .forEach((dot, index) => {

          dot.classList.toggle(
            "active",
            index === memoryIndex
          );

        });
    }
  }

  function nextMemory() {

    if (!memorySlides.length) return;

    memoryIndex =
      (memoryIndex + 1) %
      memorySlides.length;

    updateMemorySlider();
    soundClick();
  }

  function previousMemory() {

    if (!memorySlides.length) return;

    memoryIndex =
      (memoryIndex - 1 + memorySlides.length) %
      memorySlides.length;

    updateMemorySlider();
    soundClick();
  }

  createMemoryDots();
  updateMemorySlider();

  /* -----------------------------
     TOUCH SWIPE
  ----------------------------- */

  let touchStartX = 0;
  let touchStartY = 0;

  if (memorySlider) {

    memorySlider.addEventListener(
      "touchstart",
      event => {

        const touch = event.changedTouches[0];

        touchStartX = touch.clientX;
        touchStartY = touch.clientY;

      },
      { passive: true }
    );

    memorySlider.addEventListener(
      "touchend",
      event => {

        const touch = event.changedTouches[0];

        const deltaX =
          touch.clientX - touchStartX;

        const deltaY =
          touch.clientY - touchStartY;

        if (Math.abs(deltaX) < 45) return;

        if (Math.abs(deltaX) < Math.abs(deltaY)) {
          return;
        }

        if (deltaX < 0) {
          nextMemory();
        } else {
          previousMemory();
        }

      },
      { passive: true }
    );
  }

  /* -----------------------------
     SURPRISE GIFT
  ----------------------------- */

  let surpriseOpened = false;

  function openSurpriseGift() {

    if (surpriseOpened) return;

    surpriseOpened = true;

    if (surpriseGift) {
      surpriseGift.classList.add("opened");
    }

    soundPop();

    createSparkles(16);

    setTimeout(() => {

      createConfetti(38);

    }, 400);

    setTimeout(() => {

      if (surpriseCard) {
        surpriseCard.classList.add("visible");
      }

      soundCelebration();

    }, 850);
  }

  if (surpriseGift) {
    surpriseGift.addEventListener(
      "click",
      openSurpriseGift
    );
  }

  /* -----------------------------
     CINEMATIC PHOTO JOURNEY
  ----------------------------- */

  const cinematicPhotos = [
    {
      src: "images/shivansh1.jpg",
      caption: "Our Little Champ ❤️"
    },
    {
      src: "images/shivansh2.jpg",
      caption: "That cute smile ✨"
    },
    {
      src: "images/shivansh3.jpg",
      caption: "Masti mode ON 😄"
    },
    {
      src: "images/shivansh4.jpg",
      caption: "Keep shining, Shivansh! 👑"
    }
  ];

  let cinematicTimer = null;

  function showCinematicImage(index) {

    if (!cinematicImage) return;

    const photo = cinematicPhotos[index];

    if (!photo) return;

    cinematicImage.classList.remove("visible");

    setTimeout(() => {

      cinematicImage.src = photo.src;

      if (cinematicCaption) {
        cinematicCaption.textContent =
          photo.caption;
      }

      if (cinematicProgress) {

        cinematicProgress.textContent =
          String(index + 1).padStart(2, "0") +
          " / " +
          String(cinematicPhotos.length).padStart(2, "0");
      }

      setupImage(
        cinematicImage,
        cinematicPlaceholder
      );

      cinematicImage.onload = () => {
        cinematicImage.classList.add("visible");

        if (cinematicPlaceholder) {
          cinematicPlaceholder.style.opacity = "0";
        }
      };

      cinematicImage.onerror = () => {

        cinematicImage.classList.add(
          "photo-missing"
        );

        if (cinematicPlaceholder) {
          cinematicPlaceholder.style.opacity = "1";
        }
      };

    }, 120);
  }

  function startCinematicJourney() {

    if (cinematicRunning) return;

    cinematicRunning = true;

    clearTimeout(cinematicTimer);

    if (cinematicPhoto) {
      cinematicPhoto.classList.add("active");
    }

    soundChime();

    let index = 0;

    function next() {

      if (index >= cinematicPhotos.length) {

        cinematicRunning = false;

        setTimeout(() => {

          if (cinematicCaption) {
            cinematicCaption.textContent =
              "Chahe tum kitne bhi bade ho jao... apni ye cute si smile kabhi mat khona. ❤️";
          }

          createSparkles(12);

        }, 500);

        return;
      }

      showCinematicImage(index);

      index++;

      cinematicTimer = setTimeout(
        next,
        1750
      );
    }

    next();
  }

  if (oneMoreSurprise) {

    oneMoreSurprise.addEventListener(
      "click",
      () => {

        soundClick();

        scrollToSection("more-memories");

        setTimeout(() => {
          startCinematicJourney();
        }, 700);

      }
    );
  }

  /* -----------------------------
     MAKE A WISH
  ----------------------------- */

  let wishDone = false;

  function makeBirthdayWish() {

    if (wishDone) return;

    wishDone = true;

    if (finalCake) {
      finalCake.classList.add("blown");
    }

    soundFinale();

    setTimeout(() => {
      createSparkles(18);
    }, 250);

    setTimeout(() => {
      createFireworks(3);
    }, 500);

    setTimeout(() => {
      createConfetti(25);
    }, 850);

    setTimeout(() => {

      if (finalMessage) {
        finalMessage.classList.add("visible");
      }

    }, 1100);
  }

  if (makeWish) {
    makeWish.addEventListener(
      "click",
      makeBirthdayWish
    );
  }

  /* -----------------------------
     INITIAL MAGIC
  ----------------------------- */

  setTimeout(() => {
    createSparkles(7);
  }, 700);

  /* -----------------------------
     KEYBOARD SUPPORT
  ----------------------------- */

  document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {
      nextMemory();
    }

    if (event.key === "ArrowLeft") {
      previousMemory();
    }

    if (event.key === "Escape") {

      if (navMenu) {
        navMenu.classList.remove("open");
      }

    }

  });

});