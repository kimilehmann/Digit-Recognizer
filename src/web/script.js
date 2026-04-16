const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear');
const predictBtn = document.getElementById('predict');
const resultDiv = document.getElementById('result');

let drawing = false;

canvas.width = 280;
canvas.height = 280;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 18;
ctx.lineCap = 'round';
ctx.strokeStyle = 'black';

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
        y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    };
}

function startDraw(e) {
    drawing = true;
    const pos = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
    if (!drawing) return;
    const pos = getMousePos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function stopDraw() {
    drawing = false;
    ctx.closePath();
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseleave', stopDraw);
canvas.addEventListener('touchstart', startDraw);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDraw);

clearBtn.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    resultDiv.textContent = '';
};

predictBtn.onclick = async () => {
    // Bild auf 28x28 runterskalieren
    const smallCanvas = document.createElement('canvas');
    smallCanvas.width = 28;
    smallCanvas.height = 28;
    const smallCtx = smallCanvas.getContext('2d');
    smallCtx.drawImage(canvas, 0, 0, 28, 28);
    const dataUrl = smallCanvas.toDataURL('image/png');

    resultDiv.textContent = 'Vorhersage läuft...';
    try {
        const response = await fetch('http://localhost:8000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: dataUrl })
        });
        const data = await response.json();
        resultDiv.textContent = `Erkannte Ziffer: ${data.prediction}`;
    } catch (err) {
        resultDiv.textContent = 'Fehler bei der Vorhersage.';
    }
};
