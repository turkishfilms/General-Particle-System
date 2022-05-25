/**
 * TODO::
 * particles can have more than one "lookup" qt but are always inserted into qts of thier own type ?? right
 * perhaps making a child of basic particl called qtextendedparticle
 * make pause keep particles on screen
 * 
 * 

 */



//  const ya = (this) => {
//     this.x = x
//     this.y = y
//     this.o = o // orientation
//     this.v = v // velocity
//     this.r = r // how far agent can see
//     this.radius = radius // size of agent
//     this.cols = cols // cols
//     this.shouldMove = shouldMove
//     this.shouldShow = shouldShow
//     this.qtIndex = qtIndex
//     this.qt
//     this.neighbors = []
// }

let numParticles = 400,
    system

function setup() {
    background(100)
    background(150, 85, 35)
    createCanvas(windowWidth, windowHeight)
    noStroke()
    system = new ParticleSystem({ qtCapacities: [1] })

    for (let k = 0; k < 1000; k++) {
        system.addParticle(new InfectionParticle({ infectionLevel: 0.1, radius: 5, infectability: 0.1, }))
    }

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