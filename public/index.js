/**
 * TODO::
 * particles can have more than one "lookup" qt but are always inserted into qts of thier own type ?? right
 * perhaps making a child of basic particl called qtextendedparticle
 * make pause keep particles on screen
 * gpu support
 * encapsulate everything correctly

 */

const numParticles = 400
let system
// const gpu = new GPU()
// console.log(gpu)

function setup() {
    // background(100)
    background(150, 85, 35)
    createCanvas(windowWidth, windowHeight)
    system = new ParticleSystem({ qtCapacities: [1] })
    noStroke()

    for (let k = 0; k < 3000; k++) {
        system.addParticle(new PrimordialParticle2({}))
    }

    // for (let k = 0; k < 100; k++) {
    //     system.addParticle(new InfectionParticle1({ qtIndex: 1, infectionLevel: 0.1, radius: 5, infectability: 0.1, stayHomeSick: true, infectionCap: 30, rgb: 2 }))
    // }
    // system.addParticle(new Jet({
    //     cycleDelay: 1,
    //     cols: [
    //         [0, 0, 200]
    //     ]
    // }))

    // system.addParticle(new Jet({
    //     cycleDelay: 3,
    //     cols: [
    //         [200, 0, 0]
    //     ]
    // }))

}

function keyPressed() {
    if (key == ' ') {
        // noLoop()
        system.togglePause()
    }
}

function draw() {
    // background(150, 85, 35)
    if (system.simStatus) {
        background(0)
        system.nextFrame()
    }
}