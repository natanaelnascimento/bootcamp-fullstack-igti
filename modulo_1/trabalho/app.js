window.addEventListener('load', init);

function init() {
    renderAll(0, 0, 0);
    var ranges = document.querySelectorAll('.range');
    ranges.forEach(function() {
        this.addEventListener('input', handleRange)
    });
}

function handleRange() {
    var rangeR = document.querySelector('#rangeR');
    var rangeG = document.querySelector('#rangeG');
    var rangeB = document.querySelector('#rangeB');
    var r = rangeR.value;
    var g = rangeG.value;
    var b = rangeB.value;
    renderOutput(r, g, b);
}

function renderOutput(r, g, b) {
    renderText(r, g, b);
    renderColor(r, g, b);
}

function renderAll(r, g, b) {
    renderRange(r, g, b)
    renderOutput(r, g, b);
}

function renderRange(r, g, b) {
    var rangeR = document.querySelector('#rangeR');
    var rangeG = document.querySelector('#rangeG');
    var rangeB = document.querySelector('#rangeB');
    rangeR.value = r;
    rangeG.value = g;
    rangeB.value = b;
}

function renderText(r, g, b) {
    var textR = document.querySelector('#textR');
    var textG = document.querySelector('#textG');
    var textB = document.querySelector('#textB');
    textR.value = r;
    textG.value = g;
    textB.value = b;
}

function renderColor(r, g, b) {
    var rgbColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    var colorPanel = document.querySelector('#colorPanel');
    colorPanel.style.backgroundColor = rgbColor;
}