/**
 * TODO::
 * particles can have more than one "lookup" qt but are always inserted into qts of thier own type ?? right
 * perhaps making a child of basic particl called qtextendedparticle
 * make pause keep particles on screen
 * gpu support
 * encapsulate everything correctly

 */

const numBirds = 400
let system

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(150, 85, 35)
    noStroke()
    system = new ParticleSystem({ qtCapacities: [1] })
    for (let k = 0; k < 3000; k++) {
        system.addParticle(new PrimordialParticle2({}))
    }
}

function keyPressed() {
    if (key == ' ') {
        system.togglePause()
    }
}

function draw() {
    if (system.simStatus) {
        background(0)
        system.nextFrame()
    }
}