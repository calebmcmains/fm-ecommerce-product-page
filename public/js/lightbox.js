const body1 = document.querySelector("body");
const modal = document.querySelector(".modal");

const mainImg = document.querySelector(".main-img");
const thumbnailImgs = document.querySelectorAll(".thumbnail-img");
const modalMainImg = document.querySelector(".modal-main-img");
const modalThumbnailImgs = document.querySelectorAll(".modal-thumbnail-img");

//-----------------------------------------------------------------------------------
// FUNCTIONS
//-----------------------------------------------------------------------------------
const returnActiveImgIndex = () => {
  for (let i = 0; i < thumbnailImgs.length; i++) {
    if (thumbnailImgs[i].parentElement.classList.contains("active-img")) {
      return i;
    }
  }
};

const mobilePrevImg = (event) => {
  event.stopPropagation();
  for (let i = 0; i < thumbnailImgs.length; i++) {
    if (thumbnailImgs[i].parentElement.classList.contains("active-img")) {
      thumbnailImgs[i].parentElement.classList.remove("active-img");
      if (i === 0) {
        const newImgSource = `./images/image-product-${3}.jpg`;
        mainImg.setAttribute("src", newImgSource);
        thumbnailImgs[
          i
        ].parentElement.parentElement.lastElementChild.classList.add(
          "active-img",
        );
        return;
      } else {
        const newImgSource = `./images/image-product-${i - 1}.jpg`;
        mainImg.setAttribute("src", newImgSource);

        thumbnailImgs[i].parentElement.previousElementSibling.classList.add(
          "active-img",
        );
        return;
      }
    }
  }
};

const mobileNextImg = (event) => {
  event.stopPropagation();
  for (let i = 0; i < thumbnailImgs.length; i++) {
    if (thumbnailImgs[i].parentElement.classList.contains("active-img")) {
      thumbnailImgs[i].parentElement.classList.remove("active-img");
      if (i === 3) {
        const newImgSource = `./images/image-product-${0}.jpg`;
        mainImg.setAttribute("src", newImgSource);
        thumbnailImgs[
          i
        ].parentElement.parentElement.firstElementChild.classList.add(
          "active-img",
        );
        return;
      } else {
        const newImgSource = `./images/image-product-${i + 1}.jpg`;
        mainImg.setAttribute("src", newImgSource);

        thumbnailImgs[i].parentElement.nextElementSibling.classList.add(
          "active-img",
        );
        return;
      }
    }
  }
};

const returnModalActiveImgIndex = () => {
  for (let i = 0; i < modalThumbnailImgs.length; i++) {
    if (
      modalThumbnailImgs[i].parentElement.classList.contains("modal-active-img")
    ) {
      return i;
    }
  }
};

const modalPrevImg = () => {
  for (let i = 0; i < modalThumbnailImgs.length; i++) {
    if (
      modalThumbnailImgs[i].parentElement.classList.contains("modal-active-img")
    ) {
      modalThumbnailImgs[i].parentElement.classList.remove("modal-active-img");
      if (i === 0) {
        const newImgSource = `./images/image-product-${3}.jpg`;
        modalMainImg.setAttribute("src", newImgSource);
        modalThumbnailImgs[
          i
        ].parentElement.parentElement.lastElementChild.classList.add(
          "modal-active-img",
        );
        return;
      } else {
        const newImgSource = `./images/image-product-${i - 1}.jpg`;
        modalMainImg.setAttribute("src", newImgSource);

        modalThumbnailImgs[
          i
        ].parentElement.previousElementSibling.classList.add(
          "modal-active-img",
        );
        return;
      }
    }
  }
};

const modalNextImg = () => {
  for (let i = 0; i < modalThumbnailImgs.length; i++) {
    if (
      modalThumbnailImgs[i].parentElement.classList.contains("modal-active-img")
    ) {
      modalThumbnailImgs[i].parentElement.classList.remove("modal-active-img");
      if (i === 3) {
        const newImgSource = `./images/image-product-${0}.jpg`;
        modalMainImg.setAttribute("src", newImgSource);
        modalThumbnailImgs[
          i
        ].parentElement.parentElement.firstElementChild.classList.add(
          "modal-active-img",
        );
        return;
      } else {
        const newImgSource = `./images/image-product-${i + 1}.jpg`;
        modalMainImg.setAttribute("src", newImgSource);

        modalThumbnailImgs[i].parentElement.nextElementSibling.classList.add(
          "modal-active-img",
        );
        return;
      }
    }
  }
};

const openModal = () => {
  body1.classList.add("modal-open");
  modal.classList.add("show");
  return;
};

const closeModal = () => {
  body1.classList.remove("modal-open");
  modal.classList.remove("show");
  return;
};

const startLightBox = () => {
  const currentImg = document.querySelector(".main-img");
  const currentImgSource = currentImg.getAttribute("src");
  modalMainImg.setAttribute("src", currentImgSource);

  const thumbActiveIndex = returnActiveImgIndex();
  modalThumbnailImgs.forEach((thumbImg) => {
    thumbImg.parentElement.classList.remove("modal-active-img");
  });
  modalThumbnailImgs[thumbActiveIndex].parentElement.classList.add(
    "modal-active-img",
  );
  openModal();
};

//-----------------------------------------------------------------------------------
// LIGHTBOX (MODAL) IMAGES
//-----------------------------------------------------------------------------------
// sets the clicked images as the first image in the lightbox
const mql = window.matchMedia("(max-width: 768px)");

if (!mql.matches) {
  const mainImgContainer = document.querySelector(".main-img-container");
  mainImgContainer.addEventListener("click", startLightBox);
}

mql.addEventListener("change", (event) => {
  const mainImgContainer = document.querySelector(".main-img-container");
  if (event.matches) {
    mainImgContainer.removeEventListener("click", startLightBox);
  } else {
    mainImgContainer.addEventListener("click", startLightBox);
  }
});

// event listener on document for keydown
// --> lightbox: escape key closes it, arrow right and left change main image
document.addEventListener("keydown", (event) => {
  if (body1.classList.contains("modal-open")) {
    switch (event.key) {
      case "Escape":
        closeModal();
        break;

      case "ArrowLeft":
        modalPrevImg();
        break;

      case "ArrowRight":
        modalNextImg();
        break;

      default:
        break;
    }
  }
});

// changes main image to the clicked on thumnail image
modalThumbnailImgs.forEach((thumbImg, index) => {
  thumbImg.addEventListener("click", () => {
    const activeThumbImg = document.querySelector(".modal-active-img");
    const newImgSource = `./images/image-product-${index}.jpg`;
    modalMainImg.setAttribute("src", newImgSource);
    activeThumbImg.classList.remove("modal-active-img");
    thumbImg.parentElement.classList.add("modal-active-img");
  });
});

// makes the previous thumbnail image the main image displayed
const modalPrevImgBtn = document
  .querySelector(".modal")
  .querySelector(".previous");
modalPrevImgBtn.addEventListener("click", modalPrevImg);

// makes the next thumbnail image the main image displayed
const modalNextImgBtn = document.querySelector(".modal").querySelector(".next");
modalNextImgBtn.addEventListener("click", modalNextImg);

// event listeners to close lightbox with "x" icon
const modalCloseBtn = document.querySelector(".modal-close-icon");
modalCloseBtn.addEventListener("click", closeModal);

//-----------------------------------------------------------------------------------
// MAIN PAGE IMAGES
//-----------------------------------------------------------------------------------
// changes main image to the clicked on thumnail image
thumbnailImgs.forEach((thumbImg, index) => {
  thumbImg.addEventListener("click", () => {
    const mainImg = document.querySelector(".main-img");
    const activeImg = document.querySelector(".active-img");
    const newImgSource = `./images/image-product-${index}.jpg`;
    mainImg.setAttribute("src", newImgSource);
    activeImg.classList.remove("active-img");
    thumbImg.parentElement.classList.add("active-img");
  });
});

// makes the previous thumbnail image the main image displayed
const prevImgBtn = document
  .querySelector(".main-img-container")
  .querySelector(".previous");
prevImgBtn.addEventListener("click", mobilePrevImg);

// makes the next thumbnail image the main image displayed
const nextImgBtn = document
  .querySelector(".main-img-container")
  .querySelector(".next");
nextImgBtn.addEventListener("click", mobileNextImg);
