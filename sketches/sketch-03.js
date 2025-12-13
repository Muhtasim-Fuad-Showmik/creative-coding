const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // Create instances of agents using only coordinates
    const agentA = new Agent(800, 400);
    const pointB = new Agent(300, 700);

    // Use draw method from agent to draw the dots
    agentA.draw(context);
    pointB.draw(context);
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
