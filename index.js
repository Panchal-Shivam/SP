document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = navMenu.querySelectorAll("a");

  // TOGGLE menu on hamburger click
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // CLOSE menu when any link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
});

new Swiper(".hero-swiper", {
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  effect: "fade",
});


  lightGallery(document.getElementById('lightgallery'), {
    speed: 400,
    plugins: [lgZoom, lgThumbnail],
    thumbnail: true,
  });

  


