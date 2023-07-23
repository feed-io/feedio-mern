const container = document.querySelector(".masonry_scroll");
let scrollSpeed = 1;

setInterval(() => {
  container.scrollTop += scrollSpeed;

  if (container.scrollHeight - container.scrollTop === container.clientHeight) {
    container.scrollTop = 0;
  }
}, 100);
