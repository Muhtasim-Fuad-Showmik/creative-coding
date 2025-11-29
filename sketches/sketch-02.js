const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#f8e602";
    context.fillRect(0, 0, width, height);

    // Define colors from the cyberpunk theme
    const cyberPunkColors = [
      "#4bff21",
      "#00f0ff",
      "#772289",
      "#772289",
      "#772289",
      "#772289",
      "#772289",
    ];

    context.fillStyle = "black"; // Set color of clock hands to black

    // Center of the canvas
    const cx = width * 0.5;
    const cy = height * 0.5;

    // Width of clock hands
    const handWidth = width * 0.01;
    const handHeight = height * 0.1;

    let x, y; // Position of clock hands

    const numOfClockHands = 68; // Number of clock hands
    const slice = math.degToRad(360 / numOfClockHands); // Angle for each slice of the circle
    const radius = width * 0.3; // Radius of the circle

    for (let i = 0; i < numOfClockHands; i++) {
      const angle = slice * i; // Angle for each clock hand incremented in slices

      /**
       * Calculate the (x, y) position for each clock hand using polar coordinates:
       *
       * General formula for polar coordinates starting from,
       * 0 degrees (3 o'clock horizontal axis) and clockwise rotation:
       * Cartesian X coordinate = Center X + (Radius * cos(Angle))
       * Cartesian Y coordinate = Center Y + (Radius * sin(Angle))
       *
       * Implemented formula for polar coordinates starting from,
       * 90 degrees (6 o'clock horizontal axis) and counter-clockwise rotation:
       * Cartesian X coordinate = Center X + (Radius * sin(Angle))
       * Cartesian Y coordinate = Center Y + (Radius * cos(Angle))
       */
      x = cx + Math.sin(angle) * radius;
      y = cy + Math.cos(angle) * radius;

      // CLOCK HANDLES:
      // Save context to being a set of dedicated transformations
      context.save();

      // Translate and rotate the context
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 1));

      // Draw the rectangle on the rotated context
      //(simliar to drawing on a rotated paper)
      context.beginPath();
      context.rect(
        -handWidth * 0.5,
        random.range(0, -handHeight * 0.5),
        handWidth,
        handHeight
      );
      context.fillStyle =
        cyberPunkColors[random.rangeFloor(0, cyberPunkColors.length)];
      context.fill();

      // Restore the context to its original state
      context.restore();

      // CLOCK ARCS:
      // Save context to being a set of dedicated transformations
      context.save();

      // Translate and rotate the context
      context.translate(cx, cy);
      context.rotate(-angle);

      // Set the line width
      context.lineWidth = random.range(5, 20);

      // Draw the arc on the rotated context from a fraction of
      // the negative slice to the positive slice
      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        slice * random.range(1, -12),
        slice * random.range(1, 8)
      );
      context.strokeStyle =
        cyberPunkColors[random.rangeFloor(0, cyberPunkColors.length)];
      context.stroke();

      // Restore the context to its original state
      context.restore();
    }

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
