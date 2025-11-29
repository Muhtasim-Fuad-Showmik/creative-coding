const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ] // Creates a square canvas with dimensions 2048 x 2048 pixels
};

const sketch = () => {
  // Prepares a white background for our canvas
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
