const images = Array.from(document.querySelectorAll(".gallery img"));
const filterButtons = document.querySelectorAll(".filters .filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let visibleImages = [...images];
let currentLightboxIndex = 0;

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Update active class on filter buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter").toLowerCase();

        visibleImages = [];

        images.forEach(img => {
            const category = (img.getAttribute("data-category") || "").toLowerCase();

            if (filter === "all" || category === filter) {
                img.style.display = "block";
                visibleImages.push(img);
            } else {
                img.style.display = "none";
            }
        });
    });
});

// Lightbox open function
images.forEach(image => {
    image.addEventListener("click", () => {
        // Find index of clicked image within currently visible images
        const index = visibleImages.indexOf(image);
        if (index !== -1) {
            currentLightboxIndex = index;
            openLightbox();
        }
    });
});

function openLightbox() {
    if (visibleImages.length === 0) return;
    lightboxImage.src = visibleImages[currentLightboxIndex].src;
    lightboxImage.alt = visibleImages[currentLightboxIndex].alt;
    lightbox.classList.add("active");
}

function closeLightbox() {
    lightbox.classList.remove("active");
}

function showNextImage() {
    if (visibleImages.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % visibleImages.length;
    openLightbox();
}

function showPrevImage() {
    if (visibleImages.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + visibleImages.length) % visibleImages.length;
    openLightbox();
}

// Event listeners for Lightbox controls
nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showNextImage();
});

prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrevImage();
});

closeBtn.addEventListener("click", () => {
    closeLightbox();
});

// Close lightbox on backdrop click
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
        closeLightbox();
    } else if (e.key === "ArrowRight") {
        showNextImage();
    } else if (e.key === "ArrowLeft") {
        showPrevImage();
    }
});