let paused = false,
    numberOfAgents = 1000,
    system

function setup() {
    background(100)
    createCanvas(windowWidth, windowHeight)
    noStroke()
    system = new ParticleSystem({ qtCapacities: [6, 3] })
    for (let k = 0; k < 1500; k++) {
        system.addParticle(new PrimordialParticle({ r: 25 }))
    }
    for (let k = 0; k < 0; k++) {
        // system.addParticle( new BasicParticle({ radius: 4,  }), 1)
    }
}

const togglePause = () => {
    paused = paused ? false : true
    system.togglePause()
}

function keyPressed() {
    if (key == ' ') togglePause()
}

function draw() {
    if (!paused) {
        background(23);
        system.nextFrame()
    }

    // ellipse(width / 4, height / 2, system.particles[0].r)
}