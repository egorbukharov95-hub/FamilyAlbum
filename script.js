// ===== DATA =====
const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "Июнь 2024",
    description: "Летний пикник в лесу",
    tags: ["семья", "природа", "лето"],
    year: "2024",
    category: "family",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "Декабрь 2023",
    description: "Рождественский вечер",
    tags: ["праздник", "зима", "дом"],
    year: "2023",
    category: "home",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "Сентябрь 2023",
    description: "Утренний кофе",
    tags: ["дом", "утро", "уют"],
    year: "2023",
    category: "home",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "Май 2023",
    description: "Прогулка в горах",
    tags: ["путешествия", "природа", "весна"],
    year: "2023",
    category: "travel",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "Август 2022",
    description: "Первое сентября",
    tags: ["семья", "школа", "осень"],
    year: "2022",
    category: "family",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "Март 2022",
    description: "Вечер с книгой",
    tags: ["дом", "чтение", "вечер"],
    year: "2022",
    category: "home",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1519207600473-7c79e8f4d1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "Июль 2021",
    description: "Отдых у моря",
    tags: ["путешествия", "море", "лето"],
    year: "2021",
    category: "travel",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "Ноябрь 2020",
    description: "День рождения",
    tags: ["праздник", "семья", "осень"],
    year: "2020",
    category: "family",
  },
];

// ===== STATE =====
let currentFilter = "all";
let currentYear = null;

// ===== DOM ELEMENTS =====
const galleryGrid = document.getElementById("photo-gallery");
const filterButtons = document.querySelectorAll(".filter-btn");
const yearCards = document.querySelectorAll(".year-card");
const modal = document.getElementById("photo-modal");
const modalImg = document.getElementById("modal-img");
const modalDate = document.getElementById("modal-date");
const modalDescription = document.getElementById("modal-description");
const modalTags = document.getElementById("modal-tags");
const modalClose = document.querySelector(".modal-close");
const themeToggle = document.getElementById("theme-toggle");
const navLinks = document.querySelectorAll(".nav-link");

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  loadPhotos();
  setupEventListeners();
  setupTheme();
  setupSmoothScroll();
  setupActiveNav();
}

// ===== PHOTO GALLERY =====
function loadPhotos() {
  galleryGrid.innerHTML = "";

  const filteredPhotos = photos.filter((photo) => {
    if (currentFilter !== "all" && photo.category !== currentFilter)
      return false;
    if (currentYear && photo.year !== currentYear) return false;
    return true;
  });

  filteredPhotos.forEach((photo) => {
    const photoCard = createPhotoCard(photo);
    galleryGrid.appendChild(photoCard);
  });
}

function createPhotoCard(photo) {
  const card = document.createElement("div");
  card.className = "photo-card fade-in";
  card.innerHTML = `
        <img src="${photo.src}" alt="${photo.description}" loading="lazy">
        <div class="photo-overlay">
            <div class="photo-date">${photo.date}</div>
            <div class="photo-description">${photo.description}</div>
        </div>
    `;

  card.addEventListener("click", () => openModal(photo));
  return card;
}

// ===== FILTERS =====
function setupFilterButtons() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Update current filter
      currentFilter = button.dataset.filter;

      // Reload photos
      loadPhotos();
    });
  });
}

function setupYearCards() {
  yearCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove active state from all cards
      yearCards.forEach((c) => c.classList.remove("active"));

      // Add active state to clicked card
      card.classList.add("active");

      // Update current year
      currentYear = card.dataset.year;

      // Reload photos
      loadPhotos();

      // Scroll to gallery
      document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ===== MODAL =====
function openModal(photo) {
  modalImg.src = photo.src;
  modalImg.alt = photo.description;
  modalDate.textContent = photo.date;
  modalDescription.textContent = photo.description;

  // Clear and add tags
  modalTags.innerHTML = "";
  photo.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "tag";
    tagElement.textContent = `#${tag}`;
    modalTags.appendChild(tagElement);
  });

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// ===== THEME TOGGLE =====
function setupTheme() {
  // Check for saved theme or prefer color scheme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "dark");
  }
}

// ===== NAVIGATION =====
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

function setupActiveNav() {
  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();
}

function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Filter buttons
  setupFilterButtons();

  // Year cards
  setupYearCards();

  // Modal
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close modal with ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Window scroll for nav
  window.addEventListener("scroll", updateActiveNav);
}

// ===== LOAD MORE FUNCTIONALITY =====
// Можно добавить позже при необходимости
function loadMorePhotos() {
  // Реализация подгрузки дополнительных фото
}

// ===== LAZY LOADING =====
// Используем нативный lazy loading через атрибут loading="lazy"
// Для старых браузеров можно добавить Intersection Observer

// ===== EXPORT FUNCTIONS (для расширения) =====
window.photoAlbum = {
  addPhoto: function (photoData) {
    photos.push(photoData);
    loadPhotos();
  },

  removePhoto: function (photoId) {
    const index = photos.findIndex((photo) => photo.id === photoId);
    if (index !== -1) {
      photos.splice(index, 1);
      loadPhotos();
    }
  },

  getPhotos: function () {
    return [...photos];
  },

  setFilter: function (filter) {
    currentFilter = filter;
    loadPhotos();
  },
};
