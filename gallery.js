document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll(".gallery-item");
  const popup = document.getElementById("imagePopup");
  const popupImg = document.getElementById("popupImg");
  const closeBtn = document.getElementById("closePopup");

  let scale = 1;
  let posX = 0;
  let posY = 0;
  let startX = 0;
  let startY = 0;
  let dragging = false;

  /* =========================
     CLICK LOGIC
  ========================= */

  items.forEach(item => {

    const img = item.querySelector("img");

    item.addEventListener("click", () => {

      // If overlay NOT active → show description
      if (!item.classList.contains("active")) {

        // remove others
        items.forEach(i => i.classList.remove("active"));

        item.classList.add("active");

      } else {
        // If already active → open popup
        popup.classList.add("active");
        popupImg.src = img.src;

        scale = 1;
        posX = 0;
        posY = 0;

        updateTransform();

        // remove overlay after opening
        item.classList.remove("active");
      }

    });

  });

  /* =========================
     CLOSE
  ========================= */

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popup.classList.remove("active");
    }
  });

  /* =========================
     ZOOM
  ========================= */

  popupImg.addEventListener("wheel", (e) => {
    e.preventDefault();

    scale += e.deltaY < 0 ? 0.2 : -0.2;
    scale = Math.min(Math.max(1, scale), 4);

    updateTransform();
  });

  /* =========================
     DRAG
  ========================= */

  popupImg.addEventListener("mousedown", (e) => {
    if (scale === 1) return;

    dragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;

    popupImg.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    updateTransform();
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
    popupImg.style.cursor = "grab";
  });

  function updateTransform() {
    popupImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
  }

});