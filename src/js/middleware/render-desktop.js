function renderPagesForDesktop() {
  main.classList.remove("carousel", "carousel-slider");
  main.classList.add("container");

  // side navigation links
  let sidenavLinks = sidenav.querySelectorAll("a");
  sidenavLinks[2].href = "./src/pages/add.html";
  sidenavLinks[3].href = "./src/pages/label.html";
  sidenavLinks[4].href = "./src/pages/train.html";
  sidenavLinks[5].href = "./src/pages/choose.html";
  sidenavLinks[6].href = "./src/pages/view.html";
  sidenavLinks[7].href = "./src/pages/contact.html";

  // getting started
  const indexPage = main.querySelector("#getting-started");
  main.innerHTML = "";
  main.appendChild(indexPage);
  document.querySelector(".video-controller").classList.remove("container");
}
