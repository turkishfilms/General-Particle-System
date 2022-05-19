class ParticleSystem {
    constructor({ width = 100, height = 100, qtCapacities = [4, 3] } = {}) {
        this.width = width
        this.height = height
        this.qts = []
        this.qtCapacities = qtCapacities
        this.particles = []
        this.simIsOn = true
        this.iterationsBeforeShow = 3
        this.initQTs()
    }

    addParticle = (particle) =>{
        this.particles.push(particle)
    }

    addParticles = () => {

    }

    initQTs = () => {
        this.qts = []
        this.qtCapacities.forEach(cap => this.qts.push(new Quadtree({ capacity: cap })))
    }

    togglePause = () => { this.simIsOn = this.simIsOn ? false : true }

    resetCondition = () => {}

    reset = () => {}

    fillQTs = () => { this.particles.forEach(particle => this.qts[particle.qt].insert(particle)) }

    nextFrame = () => {
        if(!this.simIsOn) return
        this.initQTs()
        this.fillQTs()
        this.particles.forEach(particle => particle.step())
    }
}