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
