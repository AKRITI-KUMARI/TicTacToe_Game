function selectMode(mode) {
  localStorage.setItem("gameMode", mode);
  window.location.href = "game.html";
}
