function resizeViewHeight() {
  let windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  let navHeight = document.getElementById("top-navbar").offsetHeight;
  document.getElementById("main").style.height =
    windowHeight - navHeight + "px";
}
