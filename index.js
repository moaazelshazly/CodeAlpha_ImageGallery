/**
 * Lumina Gallery — Interactive Image Gallery Logic
 * Features:
 * - Dynamic image rendering with responsive CSS Grid
 * - Smooth hover effects and CSS transitions
 * - Interactive lightbox view with slide animations
 * - Next / Previous navigation with keyboard, button, and touch swipe support
 * - Thumbnail strip preview in lightbox
 * - Category filter pills with dynamic count badges
 * - Real-time search filter by title, location, or keyword
 * - Bonus visual tone filters (Normal, Vibrant, B&W Noir, Warm Sunset, Vintage Sepia, Cyberpunk)
 * - Fullscreen toggle mode
 */

// ============================================================================
// 1. Image Dataset (Verified High-Resolution Photos)
// ============================================================================
const galleryData = [
  // --- Nature Category ---
  {
    id: 1,
    title: "Alpine Serenity",
    category: "nature",
    categoryLabel: "Nature",
    location: "Banff National Park, Canada",
    description: "Crystalline glacial waters mirror the towering snow-capped peaks in the quiet calm of dawn.",
    thumbUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85",
    alt: "Pristine glacial lake reflecting mountain range"
  },
  {
    id: 2,
    title: "Misty Valley Ridge",
    category: "nature",
    categoryLabel: "Nature",
    location: "Great Smoky Mountains, USA",
    description: "Layers of lush mountain ridges enveloped in dramatic rolling morning fog and golden sunbeams.",
    thumbUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=85",
    alt: "Foggy mountain valley ridge at sunrise"
  },
  {
    id: 3,
    title: "Golden Sahara Dunes",
    category: "nature",
    categoryLabel: "Nature",
    location: "Merzouga, Morocco",
    description: "Sculpted wind ripples carved across endless warm golden sand dunes in the afternoon heat.",
    thumbUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1800&q=85",
    alt: "Golden sand dunes with wind ripple patterns"
  },
  {
    id: 4,
    title: "Turquoise Coastline",
    category: "nature",
    categoryLabel: "Nature",
    location: "Bora Bora, French Polynesia",
    description: "Pristine coral waters gently lapping against powdery white shores beneath swaying coconut palms.",
    thumbUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
    alt: "Tropical turquoise water and palm tree shore"
  },

  // --- Architecture Category ---
  {
    id: 5,
    title: "Spiral Geometry",
    category: "architecture",
    categoryLabel: "Architecture",
    location: "Vatican City, Rome",
    description: "Hypnotic double helix staircase showcasing classical architectural proportion and bronze detailing.",
    thumbUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85",
    alt: "Geometric spiral staircase view from above"
  },
  {
    id: 6,
    title: "Glass & Steel Spire",
    category: "architecture",
    categoryLabel: "Architecture",
    location: "Frankfurt, Germany",
    description: "Towering modern skyscraper facades reflecting sky patterns across precision engineering panels.",
    thumbUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85",
    alt: "Low angle view of contemporary glass skyscrapers"
  },
  {
    id: 7,
    title: "Classical Pantheon",
    category: "architecture",
    categoryLabel: "Architecture",
    location: "Athens, Greece",
    description: "Ancient marble columns standing with enduring majesty, casting dramatic geometric shadows.",
    thumbUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1800&q=85",
    alt: "Historic Greek marble pillars and colonnade"
  },
  {
    id: 8,
    title: "Futuristic Curves",
    category: "architecture",
    categoryLabel: "Architecture",
    location: "Baku, Azerbaijan",
    description: "Flowing organic parametric architecture blending mathematical curves into fluid urban sculpture.",
    thumbUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=85",
    alt: "Futuristic white curving architectural exterior"
  },

  // --- Animals Category ---
  {
    id: 9,
    title: "Curious Red Fox",
    category: "animals",
    categoryLabel: "Animals",
    location: "Hokkaido, Japan",
    description: "Vibrant ginger-furred fox watching alertly through lush emerald grasses in early spring.",
    thumbUrl: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1800&q=85",
    alt: "Close-up of a red fox in the green wild"
  },
  {
    id: 10,
    title: "Monarch of Savannah",
    category: "animals",
    categoryLabel: "Animals",
    location: "Serengeti, Tanzania",
    description: "Regal male lion with full amber mane resting in the golden glow of an African sunset.",
    thumbUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1800&q=85",
    alt: "Majestic lion portrait in the wild savannah"
  },
  {
    id: 11,
    title: "Bengal Tiger Stalk",
    category: "animals",
    categoryLabel: "Animals",
    location: "Ranthambore, India",
    description: "Striking emerald gaze and striped camouflage of a royal Bengal tiger prowling through the jungle.",
    thumbUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1800&q=85",
    alt: "Royal Bengal Tiger moving through vegetation"
  },
  {
    id: 12,
    title: "Forest Red Deer",
    category: "animals",
    categoryLabel: "Animals",
    location: "Black Forest, Germany",
    description: "A noble stag with magnificent antlers framed by morning sunlight filtering through misty pine trees.",
    thumbUrl: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1800&q=85",
    alt: "Stag deer standing in morning forest light"
  },

  // --- Travel Category ---
  {
    id: 13,
    title: "Kyoto Twilight Pagoda",
    category: "travel",
    categoryLabel: "Travel",
    location: "Kyoto, Japan",
    description: "Traditional Yasaka Pagoda illuminated at dusk against cherry blossoms and historic flagstone alleys.",
    thumbUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=85",
    alt: "Kyoto Japanese Pagoda glowing during dusk"
  },
  {
    id: 14,
    title: "Cinque Terre Harbor",
    category: "travel",
    categoryLabel: "Travel",
    location: "Manarola, Italy",
    description: "Pastel colored houses perched dramatically on rugged Mediterranean cliffs overlooking sapphire seas.",
    thumbUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=85",
    alt: "Colorful houses of Cinque Terre on coastal cliff"
  },
  {
    id: 15,
    title: "Alpine Lake Crossing",
    category: "travel",
    categoryLabel: "Travel",
    location: "Lake Braies, Dolomites",
    description: "Wooden rowboats tied to the boathouse floating over emerald glacial waters surrounded by jagged peaks.",
    thumbUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=85",
    alt: "Wooden boats on emerald mountain lake"
  },
  {
    id: 16,
    title: "Voyager Essentials",
    category: "travel",
    categoryLabel: "Travel",
    location: "The Open Road",
    description: "Classic vintage leather journal, brass compass, camera, and explorer maps ready for global discovery.",
    thumbUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=750&q=80",
    fullUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=85",
    alt: "Travel flatlay with camera, journal, compass and maps"
  }
];

// ============================================================================
// 2. Application State
// ============================================================================
let activeCategory = 'all';
let searchQuery = '';
let activeVisualFilter = 'normal';
let filteredImages = [...galleryData];
let currentIndex = 0;
let isLightboxOpen = false;

// Touch tracking for swipe navigation
let touchStartX = 0;
let touchStartY = 0;

// ============================================================================
// 3. DOM Elements
// ============================================================================
const galleryGrid = document.getElementById('galleryGrid');
const emptyState = document.getElementById('emptyState');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const resultsBadge = document.getElementById('resultsBadge');
const visualFilterSelect = document.getElementById('visualFilterSelect');
const filterChips = document.querySelectorAll('.filter-chip');

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxContainer = document.getElementById('lightboxContainer');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxLoader = document.getElementById('lightboxLoader');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxLocation = document.getElementById('lightboxLocationText');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxDownloadBtn = document.getElementById('lightboxDownloadBtn');
const lightboxFullscreenBtn = document.getElementById('lightboxFullscreenBtn');
const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbnailStrip = document.getElementById('thumbnailStrip');

// ============================================================================
// 4. Initialization & Event Listeners
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  setupFilterListeners();
  setupSearchListeners();
  setupLightboxListeners();
  setupKeyboardNavigation();
  setupTouchNavigation();
  setupFullscreen();
});

/**
 * Initializes the gallery render and count updates
 */
function initGallery() {
  updateCategoryCounts();
  applyFilters();
}

// ============================================================================
// 5. Filtering & Search Logic
// ============================================================================

/**
 * Updates the category count badges based on dataset
 */
function updateCategoryCounts() {
  const counts = {
    all: galleryData.length,
    nature: 0,
    architecture: 0,
    animals: 0,
    travel: 0
  };

  galleryData.forEach(item => {
    if (counts[item.category] !== undefined) {
      counts[item.category]++;
    }
  });

  document.getElementById('count-all').textContent = counts.all;
  document.getElementById('count-nature').textContent = counts.nature;
  document.getElementById('count-architecture').textContent = counts.architecture;
  document.getElementById('count-animals').textContent = counts.animals;
  document.getElementById('count-travel').textContent = counts.travel;
}

/**
 * Sets up category navigation button click handlers
 */
function setupFilterListeners() {
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });

      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      activeCategory = chip.getAttribute('data-category');
      applyFilters();
    });
  });

  // Visual filter tone selector change listener
  visualFilterSelect.addEventListener('change', (e) => {
    activeVisualFilter = e.target.value;
    updateVisualFilterClass();
  });
}

/**
 * Sets up live search and clear input handlers
 */
function setupSearchListeners() {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    
    if (searchQuery.length > 0) {
      clearSearchBtn.classList.add('visible');
    } else {
      clearSearchBtn.classList.remove('visible');
    }

    applyFilters();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.classList.remove('visible');
    searchInput.focus();
    applyFilters();
  });

  resetFiltersBtn.addEventListener('click', () => {
    // Reset category to 'all'
    activeCategory = 'all';
    filterChips.forEach(c => {
      const isAll = c.getAttribute('data-category') === 'all';
      c.classList.toggle('active', isAll);
      c.setAttribute('aria-selected', isAll.toString());
    });

    // Reset search
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.classList.remove('visible');

    // Reset visual filter
    activeVisualFilter = 'normal';
    visualFilterSelect.value = 'normal';
    updateVisualFilterClass();

    applyFilters();
  });
}

/**
 * Filters the images and updates the DOM
 */
function applyFilters() {
  filteredImages = galleryData.filter(item => {
    // Category match
    const categoryMatch = (activeCategory === 'all' || item.category === activeCategory);

    // Search query match across title, category, location, and description
    const searchMatch = !searchQuery || (
      item.title.toLowerCase().includes(searchQuery) ||
      item.categoryLabel.toLowerCase().includes(searchQuery) ||
      item.location.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery)
    );

    return categoryMatch && searchMatch;
  });

  // Update counter badge
  resultsBadge.textContent = `Showing ${filteredImages.length} of ${galleryData.length} photo${filteredImages.length === 1 ? '' : 's'}`;

  // Render cards or show empty state
  if (filteredImages.length === 0) {
    galleryGrid.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    galleryGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    renderGalleryCards();
  }

  // If lightbox is currently open, refresh thumbnails and position
  if (isLightboxOpen) {
    if (filteredImages.length === 0) {
      closeLightbox();
    } else {
      if (currentIndex >= filteredImages.length) {
        currentIndex = 0;
      }
      displayLightboxImage(currentIndex);
      renderThumbnails();
    }
  }
}

/**
 * Applies the CSS tone filter class to all images
 */
function updateVisualFilterClass() {
  const filterClassMap = {
    normal: 'filter-normal',
    vibrant: 'filter-vibrant',
    bw: 'filter-bw',
    warm: 'filter-warm',
    sepia: 'filter-sepia',
    cyber: 'filter-cyber'
  };

  const currentClass = filterClassMap[activeVisualFilter] || 'filter-normal';

  // Apply to all card images
  const cardImages = document.querySelectorAll('.card-img');
  cardImages.forEach(img => {
    Object.values(filterClassMap).forEach(cls => img.classList.remove(cls));
    img.classList.add(currentClass);
  });

  // Apply to lightbox image
  Object.values(filterClassMap).forEach(cls => lightboxImage.classList.remove(cls));
  lightboxImage.classList.add(currentClass);
}

// ============================================================================
// 6. Gallery Cards Rendering
// ============================================================================

/**
 * Builds and renders the gallery cards with staggered entrance animations
 */
function renderGalleryCards() {
  galleryGrid.innerHTML = '';

  filteredImages.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'gallery-card animate-in';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View ${item.title}`);
    card.style.animationDelay = `${Math.min(index * 0.05, 0.4)}s`;

    card.innerHTML = `
      <div class="card-media">
        <span class="card-category-tag">${item.categoryLabel}</span>
        <button class="card-action-btn" aria-label="Expand image in lightbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h6v6"></path>
            <path d="M9 21H3v-6"></path>
            <path d="M21 3l-7 7"></path>
            <path d="M3 21l7-7"></path>
          </svg>
        </button>
        <img 
          src="${item.thumbUrl}" 
          alt="${item.alt}" 
          class="card-img" 
          loading="lazy"
        >
        <div class="card-overlay">
          <div class="card-content">
            <h3 class="card-title">${item.title}</h3>
            <div class="card-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${item.location}</span>
            </div>
            <p class="card-description">${item.description}</p>
          </div>
        </div>
      </div>
    `;

    // Click handler to open lightbox
    card.addEventListener('click', () => {
      openLightbox(index);
    });

    // Keyboard support: Enter or Space to open
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    galleryGrid.appendChild(card);
  });

  // Apply active visual filter tone
  updateVisualFilterClass();
}

// ============================================================================
// 7. Lightbox Modal Functionality
// ============================================================================

/**
 * Opens the lightbox for a specific filtered index
 */
function openLightbox(index) {
  if (index < 0 || index >= filteredImages.length) return;

  currentIndex = index;
  isLightboxOpen = true;

  lightbox.style.display = 'flex';
  // Trigger CSS transition in next frame
  requestAnimationFrame(() => {
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  });

  document.body.style.overflow = 'hidden';

  displayLightboxImage(currentIndex, 'fade');
  renderThumbnails();
}

/**
 * Closes the lightbox
 */
function closeLightbox() {
  isLightboxOpen = false;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');

  setTimeout(() => {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }, 350);

  // If in fullscreen, exit
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

/**
 * Updates the image and details displayed in the lightbox
 */
function displayLightboxImage(index, animationType = 'fade') {
  const item = filteredImages[index];
  if (!item) return;

  // Show loader while image loads
  lightboxLoader.style.opacity = '1';
  lightboxLoader.style.display = 'flex';

  // Apply slide animation class
  lightboxImage.classList.remove('slide-in-right', 'slide-in-left');
  void lightboxImage.offsetWidth; // Trigger reflow

  if (animationType === 'slide-right') {
    lightboxImage.classList.add('slide-in-right');
  } else if (animationType === 'slide-left') {
    lightboxImage.classList.add('slide-in-left');
  }

  // Preload and switch high-res image
  const tempImg = new Image();
  tempImg.src = item.fullUrl;

  tempImg.onload = () => {
    lightboxImage.src = item.fullUrl;
    lightboxImage.alt = item.alt;
    lightboxLoader.style.opacity = '0';
    setTimeout(() => {
      lightboxLoader.style.display = 'none';
    }, 200);
  };

  tempImg.onerror = () => {
    // Fallback to thumbnail if high-res fails
    lightboxImage.src = item.thumbUrl;
    lightboxLoader.style.display = 'none';
  };

  // Update meta information
  lightboxTitle.textContent = item.title;
  lightboxCategory.textContent = item.categoryLabel;
  lightboxCounter.textContent = `${index + 1} / ${filteredImages.length}`;
  lightboxLocation.textContent = item.location;
  lightboxDescription.textContent = item.description;

  // Update download / full-res link
  lightboxDownloadBtn.href = item.fullUrl;
  lightboxDownloadBtn.setAttribute('download', `${item.title.replace(/\s+/g, '_')}.jpg`);

  // Update thumbnail active states
  updateActiveThumbnail(index);
  updateVisualFilterClass();
}

/**
 * Navigates to next or previous image in lightbox
 */
function navigateLightbox(direction) {
  if (filteredImages.length <= 1) return;

  let newIndex = currentIndex + direction;

  // Infinite cycle
  if (newIndex >= filteredImages.length) {
    newIndex = 0;
  } else if (newIndex < 0) {
    newIndex = filteredImages.length - 1;
  }

  const animationType = direction > 0 ? 'slide-right' : 'slide-left';
  currentIndex = newIndex;
  displayLightboxImage(currentIndex, animationType);
}

/**
 * Generates the thumbnail preview strip at the bottom of lightbox
 */
function renderThumbnails() {
  thumbnailStrip.innerHTML = '';

  filteredImages.forEach((item, index) => {
    const thumb = document.createElement('div');
    thumb.className = `thumb-item ${index === currentIndex ? 'active' : ''}`;
    thumb.setAttribute('role', 'tab');
    thumb.setAttribute('tabindex', '0');
    thumb.setAttribute('aria-selected', (index === currentIndex).toString());
    thumb.setAttribute('aria-label', `Thumbnail ${index + 1}: ${item.title}`);

    thumb.innerHTML = `<img src="${item.thumbUrl}" alt="Thumbnail of ${item.title}">`;

    thumb.addEventListener('click', () => {
      const anim = index > currentIndex ? 'slide-right' : 'slide-left';
      currentIndex = index;
      displayLightboxImage(currentIndex, anim);
    });

    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        currentIndex = index;
        displayLightboxImage(currentIndex, 'fade');
      }
    });

    thumbnailStrip.appendChild(thumb);
  });

  scrollActiveThumbnailIntoView();
}

/**
 * Updates the active class on thumbnail items and scrolls it into view
 */
function updateActiveThumbnail(index) {
  const thumbs = thumbnailStrip.querySelectorAll('.thumb-item');
  thumbs.forEach((th, idx) => {
    const isActive = idx === index;
    th.classList.toggle('active', isActive);
    th.setAttribute('aria-selected', isActive.toString());
  });

  scrollActiveThumbnailIntoView();
}

/**
 * Smoothly scrolls the active thumbnail into view
 */
function scrollActiveThumbnailIntoView() {
  const activeThumb = thumbnailStrip.querySelector('.thumb-item.active');
  if (activeThumb) {
    activeThumb.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }
}

// ============================================================================
// 8. Event Handlers (Click, Keyboard, Touch, Fullscreen)
// ============================================================================

/**
 * Setup navigation button clicks, backdrop clicks, and close clicks
 */
function setupLightboxListeners() {
  // Navigation buttons
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });

  // Close button
  lightboxCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  // Close on backdrop click (click outside modal box)
  lightboxBackdrop.addEventListener('click', () => {
    closeLightbox();
  });

  // Prevent clicks inside container from closing lightbox
  lightboxContainer.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

/**
 * Setup keyboard shortcuts (Arrows, Esc, F)
 */
function setupKeyboardNavigation() {
  window.addEventListener('keydown', (e) => {
    if (!isLightboxOpen) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        navigateLightbox(-1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        navigateLightbox(1);
      break;
      case 'Escape':
        e.preventDefault();
        closeLightbox();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  });
}

/**
 * Setup mobile swipe gestures
 */
function setupTouchNavigation() {
  const stage = document.querySelector('.lightbox-stage');

  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
  }, { passive: true });
}

/**
 * Detects horizontal swipe direction
 */
function handleSwipe(startX, startY, endX, endY) {
  const diffX = endX - startX;
  const diffY = endY - startY;

  // Check if horizontal swipe is dominant and exceeds threshold
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
    if (diffX < 0) {
      // Swiped left -> Next
      navigateLightbox(1);
    } else {
      // Swiped right -> Prev
      navigateLightbox(-1);
    }
  }
}

/**
 * HTML5 Fullscreen API toggle
 */
function setupFullscreen() {
  const openIcon = lightboxFullscreenBtn.querySelector('.fullscreen-open-icon');
  const exitIcon = lightboxFullscreenBtn.querySelector('.fullscreen-exit-icon');

  lightboxFullscreenBtn.addEventListener('click', toggleFullscreen);

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      openIcon.style.display = 'none';
      exitIcon.style.display = 'block';
    } else {
      openIcon.style.display = 'block';
      exitIcon.style.display = 'none';
    }
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    lightboxContainer.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
}
