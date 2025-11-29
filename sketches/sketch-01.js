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
    context.fillStyle = 'black';
    context.strokeStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    // Draw a grid of squares with randomized inset squares
    const rectWidth = width * 0.1;
    const rectHeight = height * 0.1;
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy = height * 0.17;

    const offset = width * 0.02;

    let x, y;
    
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
          x = ix + (rectWidth + gap) * i;
          y = iy + (rectHeight + gap) * j;

          context.beginPath();
          context.rect(x, y, rectWidth, rectHeight);
          context.stroke();

          // Randomize the drawing of inset rectangles
          if (Math.random() > 0.5) {
              // Create smaller rectangles inset within the larger ones
              context.beginPath();
              context.rect(x + offset / 2, y + offset / 2, rectWidth - offset, rectHeight - offset);
              context.stroke();
          }
      }
    }
  };
};

canvasSketch(sketch, settings);
