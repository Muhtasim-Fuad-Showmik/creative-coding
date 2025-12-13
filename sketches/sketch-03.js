const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true, // renders frames at 60 fps
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
      agent.update(); // update position of agent on each frame render
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

// Represents positional coordinates
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Preserves coordinates and prepares radius randomly within
 * the range of 4 and 12 and then draws the dot on the canvas
 * at the predefined position
 */
class Agent {
  constructor(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  // Updates the agent's position based on current velocity
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  // Draws a stroked circle using the agent's position and radius
  draw(context) {
    context.save();
    context.translate(this.position.x, this.position.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}
