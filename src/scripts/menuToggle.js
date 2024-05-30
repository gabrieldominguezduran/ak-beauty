// src/scripts/menuToggle.js

// document.addEventListener("DOMContentLoaded", function () {
//   const hamburger = document.getElementById("hamburger");
//   const closeMenu = document.getElementById("close-menu");
//   const menu = document.getElementById("menu");

//   if (hamburger && closeMenu && menu) {
//     hamburger.addEventListener("click", function () {
//       menu.classList.toggle("expanded");
//     });

//     closeMenu.addEventListener("click", function () {
//       menu.classList.remove("expanded");
//     });
//   }
// });

document.getElementById("close-menu").addEventListener("click", function () {
  document.querySelector("#menu").classList.remove("expanded");
});

document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector("#menu").classList.toggle("expanded");
});
