const container = document.querySelector(".container");
const viewHeight = document.documentElement.clientHeight;
console.log("viewHeight=", viewHeight);
const pageNum = document.querySelectorAll(".section").length;
console.log("pageNum=", pageNum);

window.scrollTo(0, 0);

const scrollHeight = Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.offsetHeight,
  document.body.clientHeight,
  document.documentElement.clientHeight
);
console.log("scrollHeight=", scrollHeight);

let currentPosition = 0;
function goDown() {
  console.log("goDown");
  if (currentPosition < scrollHeight) {
    currentPosition += viewHeight;
    window.scrollTo(0, currentPosition);
  }
}

function goUp() {
  console.log("goUp");
  if (currentPosition > 0) {
    currentPosition -= viewHeight;
    window.scrollTo(0, currentPosition);
  }
}

function scrollMove(e) {
  const delta = e.detail || -e.wheelDelta;
  if (isNaN(delta)) return;
  console.log(delta);
  if (delta > 0) {
    goDown();
  } else {
    goUp();
  }
}

function wait(fn, delay) {
  let baseTime = 0;
  return function () {
    let currentTime = Date.now();
    if (baseTime + delay < currentTime) {
      fn.apply(this, arguments);
      baseTime = currentTime;
    }
  };
}

const handlerWheel = wait(scrollMove, 500);
if (navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
  console.log("1");
  document.addEventListener("DOMMouseScroll", handlerWheel, false);
} else if (document.addEventListener) {
  console.log("2");
  document.addEventListener("mousewheel", handlerWheel, false);
  document.addEventListener("scroll", handlerWheel, false);
} else if (document.attachEvent) {
  console.log("3");
  document.attachEvent("onmousewheel", handlerWheel);
} else {
  console.log("4");
  document.onmousewheel = handlerWheel;
}
