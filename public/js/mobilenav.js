///////////////////////////////////////////////////////////
//Make mobile navigation work
///////////////////////////////////////////////////////////
const mobileNavBtn = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
const body = document.querySelector("body");

mobileNavBtn.addEventListener("click", () => {
  header.classList.toggle("nav-open");
  body.classList.toggle("stop-scrolling");
});

///////////////////////////////////////////////////////////
// additional mobile navigation fuctions
///////////////////////////////////////////////////////////
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      header.classList.toggle("nav-open");
      body.classList.toggle("stop-scrolling");
    }
  });
});
