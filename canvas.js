// // Canvas DOM 元素
// const canvas = document.getElementById('Canvas');
// const ctx = canvas.getContext('2d');

// // 起始點座標
// let x1 = 0;
// let y1 = 0;

// // 終點座標
// let x2 = 0;
// let y2 = 0;

// // 宣告一個 hasTouchEvent 變數，來檢查是否有 touch 的事件存在
// const hasTouchEvent = window.ontouchstart ? true : false;

// // 透過上方的 hasTouchEvent 來決定要監聽的是 mouse 還是 touch 的事件
// const downEvent = hasTouchEvent ? 'touchstart' : 'mousedown';
// const moveEvent = hasTouchEvent ? 'touchmove' : 'mousemove';
// const upEvent = hasTouchEvent ? 'touchend' : 'mouseup';

// // 宣告 isMouseActive 為滑鼠點擊的狀態，因為我們需要滑鼠在 mousedown 的狀態時，才會監聽 mousemove 的狀態
// let isMouseActive = false;
// const canvasTop = canvas.offsetTop;
// canvas.addEventListener(downEvent, function (e) {
//   isMouseActive = true;
//   // 根據事件類型取得座標
//   x1 = hasTouchEvent ? e.touches[0].clientX : e.offsetX;
//   y1 = hasTouchEvent ? e.touches[0].clientY - canvasTop : e.offsetY;
//   // 比刷大小
//   ctx.lineWidth = lineWidth;
//   ctx.lineCap = 'round';
//   ctx.lineJoin = 'round';
// });

// canvas.addEventListener(moveEvent, function (e) {
//   if (!isMouseActive) {
//     return;
//   }
//   // 取得終點座標
//   x2 = hasTouchEvent ? e.touches[0].clientX : e.offsetX;
//   y2 = hasTouchEvent ? e.touches[0].clientY - canvasTop : e.offsetY;

//   // 開始繪圖
//   ctx.beginPath();
//   ctx.moveTo(x1, y1);
//   ctx.lineTo(x2, y2);
//   ctx.stroke();

//   // 更新起始點座標
//   x1 = x2;
//   y1 = y2;
// });

// canvas.addEventListener(upEvent, function (e) {
//   isMouseActive = false;
// });

// window.addEventListener(mouseup, function (e) {
//   state.mousedown = false;
// })
// =============
// == Globals ==
// =============
const canvas = document.getElementById('Canvas');
const canvasWrapper = document.getElementById('CanvasWrapper');
const ctx = canvas.getContext('2d');
const state = {
  mousedown: false
};

// ===================
// == Configuration ==
// ===================
const lineWidth = 6;
const lineCap = 'round';
const lineJoin = 'round';

// =====================
// == Event Listeners ==
// =====================
canvas.addEventListener('mousedown', handleWritingStart);
canvas.addEventListener('mousemove', handleWritingInProgress);
canvas.addEventListener('mouseup', handleDrawingEnd);
window.addEventListener('mouseup', handleDrawingEnd);

canvas.addEventListener('touchstart', handleWritingStart);
canvas.addEventListener('touchmove', handleWritingInProgress);
canvas.addEventListener('touchend', handleDrawingEnd);
window.addEventListener('touchend', handleDrawingEnd);
// canvasWrapper.addEventListener('resize', resizeCanvas);


// ====================
// == Event Handlers ==
// ====================
function handleWritingStart(event) {
  event.preventDefault();

  const mousePos = getMousePositionOnCanvas(event);

  ctx.beginPath();

  ctx.moveTo(mousePos.x, mousePos.y);

  ctx.lineWidth = lineWidth;
  ctx.lineCap = lineCap;
  ctx.lineJoin = lineJoin;

  state.mousedown = true;
}

function handleWritingInProgress(event) {
  event.preventDefault();

  if (state.mousedown) {
    const mousePos = getMousePositionOnCanvas(event);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
  }
}

function handleDrawingEnd(event) {
  event.preventDefault();
  event.stopPropagation();
  if (state.mousedown) {
    ctx.stroke();
  }

  state.mousedown = false;
}


// ======================
// == Helper Functions ==
// ======================
function getMousePositionOnCanvas(event) {
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  const { offsetLeft, offsetTop } = event.target;
  const { offsetTop: wrapperTop, offsetLeft: wrapperLeft } = event.target.offsetParent;
  const canvasX = clientX - offsetLeft - wrapperLeft;
  const canvasY = clientY - offsetTop - wrapperTop;

  return { x: canvasX, y: canvasY };
}

function resizeCanvas() {
  canvas.width = Math.min(400, canvasWrapper.clientWidth);
  canvas.height = 250;
}
const resizeObserver = new ResizeObserver(entries => {
  resizeCanvas();
});
resizeObserver.observe(canvasWrapper);
