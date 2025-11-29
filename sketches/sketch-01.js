const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 600, 600 ] // Creates a square canvas with dimensions 2048 x 2048 pixels
  
  // Templated dimensions and other configurations can also be done on the canvas
  // dimensions: 'A4',
  // pixelsPerInch: 300,
  // orientation: 'landscape'
};

const sketch = () => {
  // Prepares a white background for our canvas
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Draw a grid of squares with randomized inset squares
    const rectWidth = 60;
    const rectHeight = 60;
    const gap = 20;
    let x, y;
    context.lineWidth = 4;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
          x = 100 + (rectWidth + gap) * i;
          y = 100 + (rectHeight + gap) * j;

          context.beginPath();
          context.rect(x, y, rectWidth, rectHeight);
          context.stroke();

          // Randomize the drawing of inset rectangles
          if (Math.random() > 0.5) {
              // Create smaller rectangles inset within the larger ones
              context.beginPath();
              context.rect(x + 8, y + 8, rectWidth - 16, rectHeight - 16);
              context.stroke();
          }
      }
    }
  };
};

canvasSketch(sketch, settings);
