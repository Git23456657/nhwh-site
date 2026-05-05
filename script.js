const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const revealItems = document.querySelectorAll(".reveal");
const productCards = document.querySelectorAll(".product-spotlight");
const productSummaries = document.querySelectorAll(".product-summary");
const productCloseButtons = document.querySelectorAll(".product-close");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

productSummaries.forEach((summary) => {
  summary.addEventListener("click", (event) => {
    event.preventDefault();
    const card = summary.parentElement;
    const shouldOpen = !card?.open;

    productCards.forEach((otherCard) => {
      otherCard.open = false;
    });

    if (card && shouldOpen) {
      card.open = true;
    }
  });
});

productCloseButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const card = event.currentTarget.closest(".product-spotlight");

    if (card) {
      card.open = false;
    }
  });
});
