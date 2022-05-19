/**
 * TODO::
 * particles can have more than one "lookup" qt but are always inserted into qts of thier own type ?? right
 * perhaps making a child of basic particl called qtextendedparticle
 * 
 * 
 * 

 */





let paused = false,
    numParticles = 400,
    system

function setup() {
    background(100)
    background(150, 85, 35)
    createCanvas(windowWidth, windowHeight)
    noStroke()
    system = new ParticleSystem({ qtCapacities: [6, 3] })
    for (let k = 0; k < 20; k++) {
        system.addParticle(new BasicParticle({ radius: 4, qt:0 }))
    }
    for (let k = 0; k < 200; k++) {
        system.addParticle(new PrimordialParticle({ radius: 6, qt:1 }))
    }
    for (let k = 0; k < numParticles; k++) {
        system.addParticle(new SpeedParticle({ speedIncrement: 0.1, radius: 10, v: 0.5 ,qt:1}))
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
        // background(23);
        background(150, 85, 35)
        system.nextFrame()
    }

    // ellipse(width / 4, height / 2, system.particles[0].r)
}