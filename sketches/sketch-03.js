// Run the sketch using the following command to export stream in video format
// canvas-sketch sketch-03.js --output=output/03 --stream
//
// ! Make sure you have ffmpeg-installer/ffmpeg installed locally first

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

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

    // Draw lines between every pair of agents that are close to each other
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const otherAgent = agents[j];

        // Avoid drawing lines between pairs of points that are more than
        // 200 pixels apart
        const distance = agent.position.getDistance(otherAgent.position);
        if (distance > 200) continue;

        // Map the line width based on the distance between the agents
        context.lineWidth = math.mapRange(distance, 0, 200, 12, 1);

        context.beginPath();
        context.moveTo(agent.position.x, agent.position.y);
        context.lineTo(otherAgent.position.x, otherAgent.position.y);
        context.stroke();
      }
    }

    // Draw all stored agents
    agents.forEach((agent) => {
      agent.update(); // update position of agent on each frame render
      agent.draw(context);
      // agent.bounce(width, height);
      agent.wrap(width, height);
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

  /**
   * Uses Pythagoras theorem to calculate distance between a provided vector
   * and current vector
   *
   * @param {Vector} v
   * @returns distance between v and current vector
   */
  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
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
    this.lineWidth = 4;
    this.radius = random.range(4, 12);
  }

  /**
   * Toggles direction of velocity when agent hits the canvas edges
   * keeping the line width under consideration
   *
   * @param {int} width - width of the canvas
   * @param {int} height - height of the canvas
   */
  bounce(width, height) {
    if (
      this.position.x <= this.lineWidth ||
      this.position.x >= width - this.lineWidth
    )
      this.velocity.x *= -1;
    if (
      this.position.y <= this.lineWidth ||
      this.position.y >= height - this.lineWidth
    )
      this.velocity.y *= -1;
  }

  /**
   * Wraps the agent's position to the opposite side of the canvas when it
   * goes out of bounds
   *
   * @param {int} width - width of the canvas
   * @param {int} height - height of the canvas
   */
  wrap(width, height) {
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
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

    context.lineWidth = this.lineWidth;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}
