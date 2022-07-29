// Example of drawing some simple stuff and peeking
// and poking some pixels with getImageData
// and putImageData.

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgba(100, 0, 200, 0.7)';
ctx.fillRect(0, 0, 150, 50);
ctx.strokeRect(20, 20, 50, 50);
ctx.clearRect(40, 40, 50, 50);

ctx.beginPath();
ctx.moveTo(75, 50);
ctx.lineTo(100, 75);
ctx.lineTo(100, 25);
ctx.fill();

const myImageData = ctx.getImageData(0, 0, 150, 150);
console.log(myImageData.data[0]);
console.log(myImageData.data[3]);

for (let i = 0; i < 5000; i+=8) {
    myImageData.data[i] = 200;
}
ctx.putImageData(myImageData, 0, 0);
