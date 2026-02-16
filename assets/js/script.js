const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  dropdown = document.querySelector(".af-dropdown"),
  dropdownToggle = document.querySelector(".af-dropdown-toggle"),
  navLinks = document.querySelectorAll(".af-nav__link");

/* ================= MENU TOGGLE ================= */

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("af-show-menu");
  navToggle.classList.toggle("active");
  document.body.classList.toggle("af-menu-open");
});

/* ================= DROPDOWN CLICK ================= */

dropdownToggle.addEventListener("click", (e) => {
  if (window.innerWidth <= 1023) {
    e.preventDefault();
  }
  dropdown.classList.toggle("active");
});

/* ================= CLICK OUTSIDE CLOSE (Desktop Only) ================= */

document.addEventListener("click", function (e) {
  if (window.innerWidth > 1023) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  }
});

/* ================= ACTIVE LINK ================= */

navLinks.forEach(link => {
  link.addEventListener("click", function () {

    if (this.classList.contains("af-dropdown-toggle")) return;

    navLinks.forEach(nav => nav.classList.remove("active"));
    this.classList.add("active");

    if (window.innerWidth <= 1023) {
      navMenu.classList.remove("af-show-menu");
      navToggle.classList.remove("active");
      document.body.classList.remove("af-menu-open");
    }
  });
});


// ================= back to top button =================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

//================= testimonials =================


const track = document.getElementById("testimonialTrack");
let cards = document.querySelectorAll(".testimonial-card");

let index = 0;
let visible;

function getVisibleCount() {
  if (window.innerWidth < 576) return 1;
  if (window.innerWidth < 992) return 2;
  return 3;
}

function cloneCards() {
  cards = document.querySelectorAll(".testimonial-card");
  visible = getVisibleCount();

  for (let i = 0; i < visible; i++) {
    const clone = cards[i].cloneNode(true);
    track.appendChild(clone);
  }
}

function slide() {
  const cardWidth = cards[0].offsetWidth + 25;
  index++;

  track.style.transform = `translateX(-${index * cardWidth}px)`;

  if (index >= cards.length - visible) {
    setTimeout(() => {
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      index = 0;
      setTimeout(() => {
        track.style.transition = "transform 0.6s ease";
      }, 50);
    }, 600);
  }
}

window.addEventListener("load", () => {
  cloneCards();
  setInterval(slide, 3000);
});

//================= About page counter =================

const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounter = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

let counterStarted = false;

window.addEventListener('scroll', () => {
    const section = document.querySelector('.counter-section');
    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !counterStarted) {
        startCounter();
        counterStarted = true;
    }
});

