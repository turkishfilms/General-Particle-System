/**
 *TODO:
 reset
 an array of reset objects is passed in at instantiation
 a reset onbject per Quadtree
 resetobj = {
     targetQT:
     specific proeperty:
     value of proeperty
    percentage of population needed to trigger
 } 



 */

class ParticleSystem {
    constructor({ width = 100, height = 100, qtCapacities = [1] } = {}) {
        this.width = width
        this.height = height
        this.qts = []
        this.qtCapacities = qtCapacities
        this.particles = []
        this.simIsOn = true
        this.iterationsBeforeShow = 3
        this.initQTs()
    }

    addParticle = (particle) => {
        this.particles.push(particle)
    }

    initQTs = () => {
        this.qts = []
        this.qtCapacities.forEach(cap => this.qts.push(new Quadtree({ capacity: cap })))
    }

    togglePause = () => { this.simIsOn = this.simIsOn ? false : true }

    resetCondition = (targetQT) => {
        let tot = 0
        let nah = true
        this.particles.forEach(p=>{
            if(p.qt==targetQT && p.v==0){

            }else nah = false
        })
        return nah
    }

    reset = () => {}

    fillQTs = () => {
        this.particles.forEach(particle => {
            // if (particle == this.particles[0]) console.log(this, particle)
            this.qts[particle.qtIndex].insert(particle)
            particle.addQT(this.qts[particle.qtIndex])
        })
    }

    nextFrame = () => {
        if (this.simIsOn) {
            this.initQTs()
            this.fillQTs()
            this.particles.forEach(particle => particle.step())
        }
    }
}