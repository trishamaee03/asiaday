/* =========================================================
   BIRTHDAY SCRAPBOOK — EASY CUSTOMIZATION
   Edit the details in this object to personalize the website.

   PHOTO GUIDE:
   baby-photo.jpg
   birthday-photo-1.jpg
   birthday-photo-2.jpg (optional)
   birthday-photo-3.jpg (optional)
   memory-1.jpg through memory-4.jpg

   Put photos in the same folder as index.html, or update
   their paths below. Missing photos get illustrated
   placeholders automatically.
   ========================================================= */

const BIRTHDAY = {
  name: "[NAME]",
  age: "[AGE]",

  birthdayMessage:
    "May this new chapter bring you gentle days, loud laughs, beautiful surprises, and all the love you deserve. Never forget how special you are. ♡",

  greeting: `Happy birthday, my lovely friend!

I hope this year gives you a hundred little reasons to smile, people who make you feel safe and loved, and the courage to chase every dream that lives in your heart.

Thank you for being exactly who you are. The world is softer and brighter with you in it.

May your favorite things find their way to you, may the hard days pass gently, and may you always remember how deeply you are appreciated.

Today is your day — let yourself be celebrated. ♡`,

  surpriseLetter: `Dear [NAME],

If I could wrap up every good thing I wish for you, I would.

I hope you always find a reason to laugh until your cheeks hurt, a place where you can be completely yourself, and people who show up for you in the ways you need.

Thank you for the little things you do that maybe you don't even notice — your kindness, your humor, your energy, and the way you make ordinary moments feel special.

You deserve a life that feels warm, honest, and full of beautiful surprises.

Whenever you forget how wonderful you are, I hope you come back to this page and remember that someone is always cheering for you.

Happy birthday, sunshine. Keep being you. ♡`,

  // Replace these image paths and captions with your own memories.
  memories: [
    {
      image: "memory-1.jpg",
      caption: "That day we still talk about…"
    },
    {
      image: "memory-2.jpg",
      caption: "A tiny moment, a huge memory."
    },
    {
      image: "memory-3.jpg",
      caption: "Our kind of chaos ♡"
    },
    {
      image: "memory-4.jpg",
      caption: "One for the memory book."
    }
  ],

  // Replace all the bracketed text with real details about your friend.
  about: [
    {
      title: "Your signature energy ✨",
      text: "[Add the energy she brings into every room — sunshine, chaos, calm, or all three.]"
    },
    {
      title: "Things you absolutely love ♡",
      text: "[Favorite snacks, songs, shows, colors, places, or tiny comforts.]"
    },
    {
      title: "Little things that remind me of you 🌼",
      text: "[A song, a smell, a phrase, a place, or an inside joke.]"
    },
    {
      title: "Your funny little quirks ✿",
      text: "[The habits and hilarious things only she does.]"
    },
    {
      title: "What makes you special 💚",
      text: "[Her kindness, courage, creativity, loyalty, or something only you know.]"
    },
    {
      title: "A wish for your next chapter ⭐",
      text: "[A hope or dream you want her to carry into this new year.]"
    }
  ]
};


/* =========================================================
   PHOTO PLACEHOLDERS
   These appear automatically if an image file is missing.
   ========================================================= */

function makePlaceholder(label) {
  const safeLabel = label.replace(/[&<>"']/g, "");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="600" height="450" viewBox="0 0 600 450">

      <rect width="600" height="450" fill="#edf1e5"/>

      <rect x="8" y="8" width="584" height="434"
            fill="none" stroke="#b9cbaa"
            stroke-width="4" stroke-dasharray="12 10"/>

      <g fill="#899b70" opacity=".55">
        <path d="M300 105l12 28 30 3-23 20 7 30-26-16-26 16 7-30-23-20 30-3Z"/>
        <circle cx="220" cy="180" r="7"/>
        <circle cx="380" cy="180" r="7"/>
      </g>

      <text x="300" y="255"
            text-anchor="middle"
            font-family="Arial,sans-serif"
            font-size="25"
            font-weight="bold"
            fill="#344c3a">${safeLabel}</text>

      <text x="300" y="292"
            text-anchor="middle"
            font-family="Arial,sans-serif"
            font-size="18"
            fill="#62765a">add your photo here ♡</text>
    </svg>
  `;

  return "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(svg);
}

const placeholderLabels = {
  baby: "baby-photo.jpg",
  birthday1: "birthday-photo-1.jpg",
  birthday2: "birthday-photo-2.jpg",
  birthday3: "birthday-photo-3.jpg"
};

// Replace missing opening/reveal photos with decorative placeholders.
document.querySelectorAll("img[data-fallback]").forEach(img => {
  img.addEventListener("error", () => {
    img.src = makePlaceholder(
      placeholderLabels[img.dataset.fallback] ||
      img.dataset.fallback
    );

    img.classList.add("photo-placeholder");
  }, { once: true });
});


/* =========================================================
   OCTOBER 2026 CALENDAR
   October 1, 2026 is Thursday.
   October 17, 2026 is Saturday.
   ========================================================= */

function renderCalendar() {
  const grid = document.getElementById("calendar-grid");

  const weekdays = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ];

  weekdays.forEach(day => {
    const element = document.createElement("div");
    element.className = "weekday";
    element.textContent = day;
    grid.appendChild(element);
  });

  // JavaScript months start at zero: 9 means October.
  const offset = new Date(2026, 9, 1).getDay();

  // Add empty cells before October 1.
  for (let i = 0; i < offset; i++) {
    const element = document.createElement("div");
    element.className = "day empty";
    element.setAttribute("aria-hidden", "true");
    grid.appendChild(element);
  }

  // Add October 1 through October 31.
  for (let date = 1; date <= 31; date++) {
    const element = document.createElement("div");

    element.className =
      "day" + (date === 17 ? " birthday" : "");

    if (date === 17) {
      element.setAttribute(
        "aria-label",
        "October 17, her special birthday"
      );

      element.title = "Her special day!";
    }

    const number = document.createElement("span");
    number.className = "date-num";
    number.textContent = date;

    element.appendChild(number);
    grid.appendChild(element);
  }

  // Finish the calendar with empty cells for a 6-row layout.
  while (grid.children.length < 42) {
    const element = document.createElement("div");
    element.className = "day empty";
    element.setAttribute("aria-hidden", "true");
    grid.appendChild(element);
  }
}


/* =========================================================
   PERSONALIZED CONTENT
   Name, age, messages, photos, captions, and personality notes.
   ========================================================= */

function applyCustomization() {
  // Set the birthday girl's name.
  document.querySelectorAll('[data-text="name"]').forEach(element => {
    element.textContent = BIRTHDAY.name;
  });

  // Build the large age numbers and animate each character.
  const age = String(BIRTHDAY.age);
  const ageDisplay = document.getElementById("age-display");

  ageDisplay.replaceChildren();

  [...age].forEach((digit, index) => {
    const span = document.createElement("span");

    span.textContent = digit;
    span.style.animationDelay = (index * 0.12) + "s";

    ageDisplay.appendChild(span);
  });

  ageDisplay.setAttribute("aria-label", "Age " + age);

  // Add the personalized birthday message.
  document.getElementById("reveal-message").textContent =
    BIRTHDAY.birthdayMessage;

  // Add the birthday greeting.
  document.getElementById("greeting-copy").textContent =
    BIRTHDAY.greeting.replaceAll("[NAME]", BIRTHDAY.name);

  // Add the surprise letter.
  document.getElementById("surprise-letter-copy").textContent =
    BIRTHDAY.surpriseLetter.replaceAll("[NAME]", BIRTHDAY.name);

  // Build the memories gallery.
  const memoryGrid = document.getElementById("memory-grid");

  BIRTHDAY.memories.forEach((memory, index) => {
    const figure = document.createElement("figure");
    figure.className = "memory-photo";

    const image = document.createElement("img");
    image.src = memory.image;
    image.alt = "Memory photo " + (index + 1);

    image.addEventListener("error", () => {
      image.src = makePlaceholder(memory.image);
      image.classList.add("photo-placeholder");
    }, { once: true });

    const caption = document.createElement("figcaption");
    caption.textContent = memory.caption;

    figure.append(image, caption);
    memoryGrid.appendChild(figure);
  });

  // Build the personality scrapbook.
  const aboutGrid = document.getElementById("personality-grid");

  BIRTHDAY.about.forEach(item => {
    const card = document.createElement("article");
    card.className = "personality-note";

    const heading = document.createElement("h3");
    heading.textContent = item.title;

    const paragraph = document.createElement("p");
    paragraph.textContent = item.text;

    card.append(heading, paragraph);
    aboutGrid.appendChild(card);
  });
}


/* =========================================================
   PAGE NAVIGATION
   All screens live in index.html.
   The buttons switch between screens without reloading.
   ========================================================= */

const screens = [
  ...document.querySelectorAll(".screen")
];

let currentScreen = "calendar-screen";

function showScreen(id) {
  const target = document.getElementById(id);

  if (!target) return;

  screens.forEach(screen => {
    const isActive = screen.id === id;

    screen.classList.toggle("active", isActive);

    screen.setAttribute(
      "aria-hidden",
      isActive ? "false" : "true"
    );
  });

  currentScreen = id;

  window.scrollTo({
    top: 0,
    behavior: window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches ? "auto" : "smooth"
  });

  if (id === "reveal-screen") {
    celebrate();
  }
}

// Connect all navigation buttons.
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.go);
  });
});


/* =========================================================
   INTERACTIVE BIRTHDAY CANDLES
   Clicking the candle extinguishes the flames, shows smoke,
   and automatically opens the birthday reveal.
   ========================================================= */

let candleBlown = false;

function blowCandles() {
  if (candleBlown) return;

  candleBlown = true;

  document.querySelectorAll(".flame").forEach((flame, index) => {
    flame.style.animation = "none";

    setTimeout(() => {
      flame.classList.add("off");
    }, index * 90);
  });

  // Animate smoke rising from the candles.
  document.getElementById("smoke").classList.add("show");

  document.getElementById("wish-hint").textContent =
    "Wish sent into the universe. ✨";

  const button = document.getElementById("blow-button");

  button.disabled = true;
  button.textContent = "Wish made ♡";

  // Move to the birthday reveal after the smoke animation.
  setTimeout(() => {
    showScreen("reveal-screen");
  }, 1450);
}

const candle = document.getElementById("candle-hit");

candle.addEventListener("click", blowCandles);

candle.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    blowCandles();
  }
});

document.getElementById("blow-button")
  .addEventListener("click", blowCandles);


/* =========================================================
   CONFETTI CELEBRATION
   Runs once when the birthday reveal appears.
   ========================================================= */

let celebrated = false;

function celebrate() {
  if (celebrated) return;

  celebrated = true;

  const layer = document.getElementById("confetti");

  for (let i = 0; i < 44; i++) {
    const bit = document.createElement("i");

    bit.style.left = (Math.random() * 100) + "%";

    bit.style.animationDelay =
      (Math.random() * 0.75) + "s";

    bit.style.animationDuration =
      (1.6 + Math.random() * 1.5) + "s";

    bit.style.transform =
      `rotate(${Math.random() * 180}deg)`;

    layer.appendChild(bit);
  }

  // Clean up the confetti after the animation.
  setTimeout(() => {
    layer.replaceChildren();
  }, 4000);
}


/* =========================================================
   INTERACTIVE SURPRISE LETTER
   Clicking the envelope or its button opens/closes the letter.
   ========================================================= */

const envelope = document.getElementById("envelope-button");
const letter = document.getElementById("surprise-letter");
const letterToggle = document.getElementById("letter-toggle");

let letterOpen = false;

function toggleLetter() {
  letterOpen = !letterOpen;

  envelope.classList.toggle("open", letterOpen);

  envelope.setAttribute(
    "aria-expanded",
    String(letterOpen)
  );

  letter.classList.toggle("open", letterOpen);

  letterToggle.textContent = letterOpen
    ? "Close my letter ♡"
    : "Open my letter ♡";

  envelope.setAttribute(
    "aria-label",
    letterOpen
      ? "Close the surprise letter"
      : "Open the surprise letter"
  );

  document.getElementById("envelope-caption").textContent =
    letterOpen
      ? "A little love, just for you."
      : "Open when you're ready.";

  if (letterOpen) {
    setTimeout(() => {
      letter.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 250);
  }
}

envelope.addEventListener("click", toggleLetter);
letterToggle.addEventListener("click", toggleLetter);


/* =========================================================
   START THE WEBSITE
   ========================================================= */

renderCalendar();
applyCustomization();
