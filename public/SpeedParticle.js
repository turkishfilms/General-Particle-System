class SpeedParticle extends BasicParticle {
    constructor({
        x = random(0, width),
        y = random(0, height),
        o = random(0, PI),
        v = 1,
        radius = 5,
        cols = [
            [120, 200, 120],
            [100, 100, 250],
            [255, 20, 180],
            [30, 100, 250],
        ],
        r = radius,
        thresholds = [10, 7, 3, 1],
        speedIncrement = 0.01,
        qt = 0
    } = {}) {
        super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols })
        this.x = x
        this.y = y
        this.o = o // orientation
        this.v = v // velocity
        this.radius = radius // size of agent
        this.cols = cols
        this.r = r
        this.speedIncrement = speedIncrement
        this.thresholds = thresholds.sort((a,b)=>a-b).reverse()
        this.neighbors = []
        this.qt = qt
        const { x: qtx, y: qty, sizex, sizey } = system.qts[this.qt]
        this.box = { minX: qtx, maxX: qtx + sizex, minY: qty, maxY: qty + sizey }
    }

    isOutOfBounds(box) {
        return (this.x + this.radius >= box.maxX) ||
            (this.x + this.radius <= box.minX) ||
            (this.y + this.radius >= box.maxY) ||
            (this.y + this.radius <= box.minY)
    }

    collisionCount() {
        return this.neighbors.length - 1
    }

    updateNeighbors() {
        this.neighbors = []
        this.neighbors = this.findNeighbors()
    }

    findNeighbors() {
        return system.qts[this.qt].ask(this, this.neighbors)
    }

    isFirst(){return this == system.particles[0]}

    nextStep() {
        this.updateNeighbors()
        const collisions = this.collisionCount()
        const color= this.correctColor()
        return { deltaO: ((collisions > 0 || this.isOutOfBounds(box)) ? PI : 0), deltaV: (this.speedIncrement * collisions), color: color }
    }

    correctColor() {
        if(this.isFirst()) console.log(this.thresholds.length, this.cols.length)
        for (let i = 0; i < this.thresholds.length; i++) {
            if (this.v >= this.thresholds[i]) return {
                r: this.cols[i % this.cols.length][0],
                g: this.cols[i % this.cols.length][1],
                b: this.cols[i % this.cols.length][2]
            }
        }
    }

}