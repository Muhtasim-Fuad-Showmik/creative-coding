const canvasSketch = require('canvas-sketch');
const { degToRad } = require('./utils');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const x = width * 0.5;
    const y = height * 0.5;
    const rectWidth = width * 0.3;
    const rectHeight = height * 0.3;

    // Save context to being a set of dedicated transformations
    context.save();

    // Translate and rotate the context
    context.translate(x, y);
    context.rotate(degToRad(45));

    // Draw the rectangle on the rotated context 
    //(simliar to drawing on a rotated paper)
    context.beginPath();
    context.rect(-rectWidth * 0.5, -rectHeight * 0.5, rectWidth, rectHeight);
    context.fill();

    // Restore the context to its original state
    context.restore();

    // Commented out the circle as it's no longer needed but can
    // help out as notes for the lesson it was meant for
    // /**
    //  * Because we saved and restored out context in the previous set of
    //  * instructions, the sketches from her onwards will remain unaffected
    //  * from the previous transformations
    //  */

    // // Translate the context to a new position
    // context.translate(100, 400);

    // // Draw a circle on the translated context
    // context.beginPath();
    // context.arc(0, 0, 50, 0, Math.PI * 2);
    // context.fill();
  };
};

canvasSketch(sketch, settings);
