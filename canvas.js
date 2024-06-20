
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
