# General Particle System

## Description

This project is a particle system I've worked on. 

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Tests](#tests)
5. [License](#license)
6. [Credits](#credits)

## Installation

Clone the repo and run `npm i` to install all dependencies.

## Usage

Run the `npm start` command to start the Express server. Navigate to 127.0.0.1:3009 to enjoy the game.

The 'index.js' script creates an interactive particle system in the browser using p5.js. It includes classes for the particle system itself (`ParticleSystem`), as well as different types of particles.

### Setup

To set up the particle system:

```javascript
const numParticles = 400
let system

function setup() {
    // Set up the canvas
    background(150, 85, 35)
    createCanvas(windowWidth, windowHeight)

    // Initialize the particle system
    system = new ParticleSystem({ qtCapacities: [1] })
    noStroke()

    // Add particles to the system
    for (let k = 0; k < numParticles; k++) {
        system.addParticle(new PrimordialParticle({}))
    }
}
```

In this setup, we create a new particle system and add 'numParticles' `PrimordialParticle` particles to it. (Look in public/ParticleTypes to find more particles, or even add your own)

### Interaction

The simulation can be paused and unpaused by pressing the spacebar:

```javascript
function keyPressed() {
    if (key == ' ') {
        system.togglePause()
    }
}
```

### Drawing

The `draw` function runs on every frame of the browser's draw loop, updating the system and redrawing the particles:

```javascript
function draw() {
    if (system.simStatus) {
        background(0)
        system.nextFrame()
    }
}
```

In this function, if the system is not paused (`system.simStatus` is true), we clear the canvas to black and then draw the next frame of the particle system.

---

## Contributing

```javascript
class BasicParticle {
    nextStep() {
        return { deltaV: 0, deltaO: 0 }
    }
}

class QTParticle extends BasicParticle{
    constructor(){
        super()
    }
    //Quadtree functionality
}

class PrimordialParticle extends QTParticle{
    constructor(){
        super()
    }
    nextStep(){
        returns { deltaV:100, deltaO:100 } // Primordial Particle movement 
    }
}



```
Each Particle in the ParticleTypes folder inherits from basic Particle. After extending the particle and super()ing all the properties, all that's left to do is to overwrite the nextStep function. It must return an object with 'deltaV' and 'deltaO' properties. These values will be added to the particles velocity and orientation respectively. 

Currently the BasicParticle uses Direction and Speed instead of xSpeed and ySpeed, but I plan to add support in the future. 


Many particles inherit from the QTParticle class. This class enables use of a quadtree to speed up lookups. The Quadtree was coded by me, and needs some work of its own. 

To use Quadtrees just ensure your particle inherits from the QTParticle and you have at least one number in the qtCapacities array of the Particle System.  

Feel free to add make contributions, fork this repo and submit your Pull Request!

## Tests

Currently no testing is available. 

## License

This project is licensed under the MIT License.

## Credits

This project was developed by Reginald Robinson.



