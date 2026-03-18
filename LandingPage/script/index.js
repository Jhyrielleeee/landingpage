window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const originalCards = Array.from(track.children);

  const modal = document.getElementById("courseModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const closeBtn = document.querySelector(".close-btn");

  const courseDescriptions = {
    "ELECTRICAL INSTALLATION":
      "Learn residential and industrial electrical systems, maintenance, and safety.",
    "AUTOMOTIVE SERVICING":
      "Master engine diagnostics, car maintenance, and light truck repairs.",
    "COMPUTER SYSTEMS":
      "Assemble PCs, install software, and configure networking systems.",
    COOKERY:
      "Professional culinary training, food safety, and kitchen management.",
    "ENGLISH PROFICIENCY":
      "Enhance global communication skills for professional workplace environments.",
    "FOOD BEVERAGE AND SERVICES":
      "Professional dining service, bartending, and customer relation skills.",
    HOUSEKEEPING:
      "Acquire skills for hospitality industry room preparation and maintenance.",
    "MOTORCYCLE SERVICING":
      "Specialized mechanical repair and tuning for motorcycles.",
    "SHIELDED METAL ARC WELDING":
      "Industrial welding techniques for construction and fabrication.",
    "BREAD AND PASTRY PRODUCTION":
      "Commercial baking, pastry creation, and bread production techniques.",
    CAREGIVING:
      "Professional care for children, the elderly, and hospital patients.",
    HAIRDRESSING:
      "Learn professional hair cutting, coloring, and styling techniques.",
    "MASSAGE THERAPY":
      "Master therapeutic massage techniques and wellness protocols.",
    "REF AND AIRCON SERVICING":
      "Installation and repair of refrigeration and air conditioning units.",
  };

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollAmount = 0;
  const autoSpeed = 1;
  let isHovered = false;
  let isTransitioning = false;

  function autoAnimate() {
    if (!isHovered && !isTransitioning) {
      scrollAmount -= autoSpeed;

      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(scrollAmount) >= halfWidth) {
        scrollAmount = 0;
      }

      track.style.transition = "none";
      track.style.transform = `translateX(${scrollAmount}px)`;
    }
    requestAnimationFrame(autoAnimate);
  }

  track.addEventListener("mouseenter", () => (isHovered = true));
  track.addEventListener("mouseleave", () => (isHovered = false));

  const shiftOneByOne = (direction) => {
    if (isTransitioning) return;
    isTransitioning = true;

    const cardGap = 30;
    const cardWidth = originalCards[0].offsetWidth + cardGap;

    if (direction === "next") {
      scrollAmount -= cardWidth;
    } else {
      scrollAmount += cardWidth;
    }

    track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translateX(${scrollAmount}px)`;

    setTimeout(() => {
      const halfWidth = track.scrollWidth / 2;

      if (Math.abs(scrollAmount) >= halfWidth) {
        scrollAmount += halfWidth;
      } else if (scrollAmount > 0) {
        scrollAmount -= halfWidth;
      }

      track.style.transition = "none";
      track.style.transform = `translateX(${scrollAmount}px)`;
      isTransitioning = false;
    }, 600);
  };

  nextBtn.addEventListener("click", () => shiftOneByOne("next"));
  prevBtn.addEventListener("click", () => shiftOneByOne("prev"));
  track.addEventListener("click", (e) => {
    const card = e.target.closest(".course-card");
    if (card) {
      const title = card.querySelector("h3").innerText;
      modalTitle.innerText = title;
      modalDesc.innerText =
        courseDescriptions[title] || "Detailed course information coming soon.";

      modal.style.display = "flex";
      setTimeout(() => {
        modal.classList.add("active");
      }, 50);
    }
  });

  const closePopup = () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
    }, 800);
  };

  closeBtn.onclick = closePopup;

  window.onclick = (event) => {
    if (event.target == modal) {
      closePopup();
    }
  };
  autoAnimate();
});

function toggleAbout(card) {
  const cards = document.querySelectorAll(".about-card");

  cards.forEach((c) => {
    if (c !== card) {
      c.classList.remove("active");
    }
  });

  card.classList.toggle("active");
}
