# Canvas Sketches

## Pre-requisites

You will need `node.js` and the `canvas-sketch-cli` npm package installed globally.

To install `canvas-sketch-cli` in your system, run:

```[bash]
npm i canvas-sketch-cli -g
```

## Instructions

To create a new canvas sketch, run the following command:

```[bash]
canvas-sketch sketch-01.js --new
```

Canvas outputs can be saved directly. To define the output directory of images for your canvas sketch, run the following command (where output/01 has been used as an example directory of "01" within an "output" folder within the current project working directory):

```[bash]
canvas-sketch sketch-01.js --output=output/01
```

> **Note:** For more information visit the official [docs for canvas sketch](https://github.com/mattdesl/canvas-sketch/blob/master/docs/installation.md).
