const images = document.querySelectorAll(".gallery-card img");
const popup = document.getElementById("imagePopup");
const popupImg = document.getElementById("popupImg");
const closeBtn = document.getElementById("closePopup");

let scale = 1;
let posX = 0;
let posY = 0;
let startX = 0;
let startY = 0;
let dragging = false;

/* OPEN IMAGE */

images.forEach(img=>{
  img.addEventListener("click", ()=>{
    popup.classList.add("active");
    popupImg.src = img.src;

    scale = 1;
    posX = 0;
    posY = 0;

    popupImg.style.transform = `translate(0px,0px) scale(1)`;
  });
});

/* CLOSE BUTTON */

closeBtn.addEventListener("click", ()=>{
  popup.classList.remove("active");
});

/* CLOSE CLICK OUTSIDE */

popup.addEventListener("click",(e)=>{
  if(e.target === popup){
    popup.classList.remove("active");
  }
});

/* CLOSE ESC */

document.addEventListener("keydown",(e)=>{
  if(e.key === "Escape"){
    popup.classList.remove("active");
  }
});

/* ZOOM WITH SCROLL */

popupImg.addEventListener("wheel",(e)=>{
  e.preventDefault();

  if(e.deltaY < 0){
    scale += 0.15;
  }else{
    scale -= 0.15;
  }

  scale = Math.min(Math.max(1, scale), 4);

  popupImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
});

/* START DRAG */

popupImg.addEventListener("mousedown",(e)=>{
  if(scale === 1) return;

  dragging = true;
  startX = e.clientX - posX;
  startY = e.clientY - posY;

  popupImg.style.cursor = "grabbing";
});

/* DRAG MOVE */

document.addEventListener("mousemove",(e)=>{
  if(!dragging) return;

  posX = e.clientX - startX;
  posY = e.clientY - startY;

  popupImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
});

/* STOP DRAG */

document.addEventListener("mouseup",()=>{
  dragging = false;
  popupImg.style.cursor = "grab";
});

const enquiryBtns = document.querySelectorAll(".enquiry-btn");
const enquiryPopup = document.getElementById("enquiryPopup");
const closeEnquiry = document.getElementById("closeEnquiry");

const productNameInput = document.getElementById("productName");
const productImageInput = document.getElementById("productImage");
const enquiryPreviewImg = document.getElementById("enquiryProductImg");

enquiryBtns.forEach(btn=>{
  btn.addEventListener("click",(e)=>{

    e.stopPropagation();

    const productName = btn.getAttribute("data-item");
    document.getElementById("emailSubject").value = "Enquiry for " + productName;

    const card = btn.closest(".gallery-card");
    const imageSrc = card.querySelector("img").src;

    productNameInput.value = productName;
    productImageInput.value = imageSrc;
    enquiryPreviewImg.src = imageSrc;

    enquiryPopup.classList.add("active");

  });
});

// close button
closeEnquiry.addEventListener("click",()=>{
  enquiryPopup.classList.remove("active");
});

// ESC key close
document.addEventListener("keydown",(e)=>{
  if(e.key === "Escape"){
    enquiryPopup.classList.remove("active");
  }
});


const form = document.getElementById("enquiryForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async function(e){

e.preventDefault();

const formData = new FormData(form);

const response = await fetch("https://api.web3forms.com/submit", {
method: "POST",
body: formData
});

const result = await response.json();

if(result.success){

status.style.display = "block";

setTimeout(()=>{

enquiryPopup.classList.remove("active");
form.reset();
status.style.display = "none";

},2000);

}

});

document.addEventListener("DOMContentLoaded", () => {

  const images = document.querySelectorAll(".popup-img");
  const popup = document.getElementById("imagePopup");
  const popupImg = document.getElementById("popupImg");
  const closeBtn = document.getElementById("closePopup");

  let scale = 1;
  let posX = 0;
  let posY = 0;
  let startX = 0;
  let startY = 0;
  let dragging = false;

  // OPEN IMAGE
  images.forEach(img => {
    img.addEventListener("click", () => {
      popup.classList.add("active");
      popupImg.src = img.src;

      scale = 1;
      posX = 0;
      posY = 0;

      updateTransform();
    });
  });

  // CLOSE
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

  // ZOOM (MOUSE WHEEL)
  popupImg.addEventListener("wheel", (e) => {
    e.preventDefault();

    scale += e.deltaY < 0 ? 0.2 : -0.2;
    scale = Math.min(Math.max(1, scale), 4);

    updateTransform();
  });

  // START DRAG
  popupImg.addEventListener("mousedown", (e) => {
    if (scale === 1) return;

    dragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;

    popupImg.style.cursor = "grabbing";
  });

  // MOVE
  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    updateTransform();
  });

  // STOP
  document.addEventListener("mouseup", () => {
    dragging = false;
    popupImg.style.cursor = "grab";
  });

  function updateTransform() {
    popupImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
  }

});