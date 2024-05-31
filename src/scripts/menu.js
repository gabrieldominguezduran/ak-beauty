// document.getElementById("close-menu").addEventListener("click", function () {
//   document.querySelector(".menu").classList.remove("expanded");
// });

// document.querySelector(".hamburger").addEventListener("click", () => {
//   document.querySelector(".menu").classList.toggle("expanded");
// });

function attachMenuListeners() {
  const closeMenuButton = document.getElementById("close-menu");
  const hamburgerButton = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  if (closeMenuButton && hamburgerButton && menu) {
    closeMenuButton.addEventListener("click", function () {
      menu.classList.remove("expanded");
    });

    hamburgerButton.addEventListener("click", function () {
      menu.classList.toggle("expanded");
    });
  }
}

attachMenuListeners();
document.addEventListener("astro:after-swap", attachMenuListeners);
