/**
 * Comments with (Corner) are for art that was placed on the corner of the
 * canvas and are immediate duplicates to the lines prior using reference of
 * which can be toggled into being if required as such
 */

const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ width, height }) => {
  // Center of the canvas
  const cx = width * 0.5;
  const cy = height * 0.5;
  // const cx = 0; // (Corner)
  // const cy = height; // (Corner)

  const numOfClockHands = 68;
  const agent = new Agent(width, height, numOfClockHands, width * 0.3);
  agent.generateClockHandsAndArcs(cx, cy);

  return ({ context, width, height }) => {
    context.fillStyle = "#f8e602";
    context.fillRect(0, 0, width, height);

    agent.draw(cx, cy, context);
  };
};

canvasSketch(sketch, settings);

/**
 * Main agent to draw our clock
 *
 * params:
 * width: width of the canvas
 * height: height of the canvas
 * numOfClockHands: number of clock hands
 * radius: radius of the clock
 */
class Agent {
  constructor(width, height, numOfClockHands, radius) {
    // Define colors from the cyberpunk theme
    this.cyberPunkColors = [
      "#4bff21",
      "#00f0ff",
      "#772289",
      "#772289",
      "#772289",
      "#772289",
      "#772289",
    ];

    this.width = width;
    this.height = height;
    this.numOfClockHands = numOfClockHands;
    this.clockHandles = [];
    this.clockArcs = [];
    this.slice = math.degToRad(360 / numOfClockHands); // Angle for each slice of the circle
    this.radius = radius;
  }

  /**
   * Generates clock hands and arcs as many as numOfClockHands
   * and based on the provided center for the circle
   *
   * @param {int} cx - x coordinate of the center
   * @param {int} cy - y coordinate of the center
   */
  generateClockHandsAndArcs(cx, cy) {
    // Width of clock hansds
    const handWidth = this.width * 0.01;
    const handHeight = this.height * 0.15;

    let x, y; // Position of clock hands

    for (let i = 0; i < this.numOfClockHands; i++) {
      const angle = this.slice * i; // Angle for each clock hand incremented in slices

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
      x = cx + Math.sin(angle) * this.radius;
      y = cy + Math.cos(angle) * this.radius;

      // Generate a random fill color from the stored cyberpunk colors
      const fillStyle =
        this.cyberPunkColors[random.rangeFloor(0, this.cyberPunkColors.length)];

      // Generate a clock handle
      this.clockHandles.push(
        new ClockHandle(x, y, handWidth, handHeight, angle, fillStyle)
      );

      // Generate a clock arc
      this.clockArcs.push(
        new ClockArc(angle, this.slice, this.radius, fillStyle)
      );
    }
  }

  /**
   * Draws the clock hands and clock arcs pivoted on the provided center
   * and the context provided to draw on
   *
   * @param {int} cx - x coordinate of the center
   * @param {int} cy - y coordinate of the center
   * @param {context} context - context to draw on
   */
  draw(cx, cy, context) {
    this.clockHandles.forEach((clockHandle) => {
      clockHandle.update();
      clockHandle.draw(context);
    });

    this.clockArcs.forEach((clockArc) => {
      clockArc.update();
      clockArc.draw(context, cx, cy);
    });
  }
}

// Class for clock handles based on provided position, dimensions, angle and color
class ClockHandle {
  /**
   * Constructs a clock handle
   *
   * @param {int} x - x coordinate to place the hand on
   * @param {int} y - y coordinate to place the hand on
   * @param {int} handWidth - width of the hand
   * @param {int} handHeight - height of the hand
   * @param {float} angle - angle of the hand
   * @param {string} color - color of the hand
   */
  constructor(x, y, handWidth, handHeight, angle, color) {
    this.x = x;
    this.y = y;
    this.handWidth = handWidth;
    this.handHeight = handHeight;
    this.initialHandHeight = handHeight;
    this.velocity = random.range(0.8, 1.3);
    this.scaleX = random.range(0.1, 2);
    this.scaleY = random.range(0.2, 1);
    this.angle = angle;
    this.color = color;
  }

  /**
   * Updates the height of the hand based on defined velocity
   * maintaining a minimum height of 100px
   */
  update() {
    this.handHeight += this.velocity;

    if (this.handHeight <= 100 || this.handHeight > this.initialHandHeight)
      this.velocity *= -1;
  }

  // Draws the clock hand on the provided context
  draw(context) {
    // CLOCK HANDLES:
    // Save context to being a set of dedicated transformations
    context.save();

    // Translate and rotate the context
    context.translate(this.x, this.y);
    context.rotate(-this.angle);
    context.scale(this.scaleX, this.scaleY);

    // Draw the rectangle on the rotated context
    //(simliar to drawing on a rotated paper)
    context.beginPath();
    context.rect(
      -this.handWidth * 0.5,
      -this.handHeight,
      this.handWidth,
      this.handHeight
    );
    context.fillStyle = this.color;
    context.fill();

    // Restore the context to its original state
    context.restore();
  }
}

// Class for clock arcs based on provided angle, slice, radius and color
class ClockArc {
  constructor(angle, slice, radius, color) {
    this.angle = angle;
    this.slice = slice;
    this.radius = radius;
    this.color = color;

    this.lineWidth = random.range(5, 20);
    this.radiusScale = random.range(0.7, 1.3);
    this.startSlice = random.range(1, -12);
    this.endSlice = random.range(1, 8);

    // Animation properties
    this.rotationSpeed = random.range(-0.02, 0.02);
    this.oscillationSpeed = random.range(0.01, 0.05);
    this.oscillationTime = random.range(0, 20);
  }

  /**
   * Updates the angle of the arc based on defined rotation speed
   * and oscillation time
   */
  update() {
    this.angle += this.rotationSpeed;
    this.oscillationTime += this.oscillationSpeed;
  }

  /**
   * Draws the clock arc on the provided context
   */
  draw(context, cx, cy) {
    context.save();
    context.translate(cx, cy);
    context.rotate(-this.angle);

    // Varry the line width slightly over time for a "breathing" effect
    context.lineWidth =
      this.lineWidth + Math.sin(this.oscillationTime) * (this.lineWidth * 0.2);

    context.beginPath();
    context.arc(
      0,
      0,
      this.radius * this.radiusScale,
      this.slice * this.startSlice,
      this.slice * this.endSlice
    );
    context.strokeStyle = this.color;
    context.stroke();

    context.restore();
  }
}
