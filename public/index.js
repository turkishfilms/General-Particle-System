/**
 * TODO::
 * particles can have more than one "lookup" qt but are always inserted into qts of thier own type ?? right
 * perhaps making a child of basic particl called qtextendedparticle
 * make pause keep particles on screen
 * 
 * 

 */

const numBirds = 400
let system

function setup() {
    // background(100)
    background(150, 85, 35)
    createCanvas(windowWidth, windowHeight)
    system = new QTParticleSystem({ qtCapacities: [1] })
    noStroke()
    for (let k = 0; k < numBirds; k++) {
        system.addParticle(new Boid({v:3,sepWeight:1,aliWeight:0,cohWeight:0,separationRadius:50}))
    }

    // for (let k = 0; k < 100; k++) {
    //     system.addParticle(new InfectionParticle1({ qtIndex: 1, infectionLevel: 0.1, radius: 5, infectability: 0.1, stayHomeSick: true, infectionCap: 30, rgb: 2 }))
    // }
// system.addParticle(new Jet({ cols: [
//         [200, 0, 0]
//     ] }))
// system.addParticle(new Jet({ cols: [
//         [0, 0, 200]
//     ] }))

}

function keyPressed() {
    if (key == ' ') {
        // noLoop()
        system.togglePause()
    }
}

function draw() {
    // background(150, 85, 35)
    if (system.simIsOn) {
        background(0)
        system.nextFrame()
    }
}