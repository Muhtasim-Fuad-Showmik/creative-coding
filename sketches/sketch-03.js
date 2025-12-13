const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = ({ context, width, height }) => {
  // Create an array of random agents to be drawn on the canvas
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // Draw all stored agents
    agents.forEach((agent) => {
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

// Represents positional coordinates
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Preserves coordinates and defaults radius to 10 and then
 * draws the dot on the canvas at the predefined position
 */
class Agent {
  constructor(x, y) {
    this.position = new Point(x, y);
    this.radius = 10;
  }

  draw(context) {
    context.fillStyle = "black";

    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}
