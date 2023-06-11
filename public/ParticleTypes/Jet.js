class Jet extends QTParticle {
    constructor({
        cycleDelay = 1,
        atkVal = 1,
        hpVal = 10,
        turningSpeed = radians(10),

        ...options
    } = {}) {
<<<<<<< HEAD
        const { x, y, o, v = 2, radius, cols, shouldShow, shouldMove, qtIndex, r = 500, neighbors } = options
=======
        const { x, y, o, radius, cols, shouldShow, shouldMove, qtIndex, neighbors } = options
>>>>>>> c23ea6b9efda7d5296c02cfb91b157bc67c719ef
        super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols, shouldShow: shouldShow, shouldMove: shouldMove, qtIndex: qtIndex, r: r, neighbors: neighbors })
        this.cycleDelay = cycleDelay
        this.cycleIndex = 0
        this.stepCount = 0
        this.oodaHasFourParts = 4
        this.decision = 0
        this.angleToOp = 0
        this.turningSpeed = turningSpeed
        this.atkVal = atkVal
        this.hpVal = hpVal
        this.box = this.initBox()
    }

    nextStep = () => {
        const collided = this.isOutOfBounds(box) ? PI : 0

        if ((this.stepCount < this.cycleDelay)) { //wait
            this.incrementStepCount(1)
            return { deltaV: 0, deltaO: collided, color: this.correctColor() }
        }

        const deltas = this.ooda(this.cycleIndex, collided)
        this.updateCycleIndex(1)
        this.updateStepCount(0)
        return deltas
    }

    ooda(step, invisiWall) {
        switch (step) {
            case 0:
                this.observe()
                return { deltaV: 0, deltaO: invisiWall, color: this.correctColor() }
                break;
            case 1:
                this.orient()
                return { deltaV: 0, deltaO: invisiWall, color: this.correctColor() }
                break;
            case 2:
                this.decide()
                return { deltaV: 0, deltaO: invisiWall, color: this.correctColor() }
                break;
            case 3:
                return { deltaV: 0, deltaO: invisiWall + this.act(), color: this.correctColor() }
        }
    }

    observe = () => { this.updateNeighbors() }

    orient = () => {
        if (this.neighborsCount > 1) {
            const neighbor = this.neighbors[1]
            this.target = neighbor
            this.angleToOp = this.findAngleToNeighbor(neighbor)
        }
    } //hehe i dont know what to put here

    decide = () => {
        const options = [-1, 0, 1] //turn left dont turn turn right
        let scores = []
        options.forEach(option => scores.push(this.scoreOption(option)))
        const scores2 = JSON.parse(JSON.stringify(scores))
        this.decision = this.turningSpeed * options[scores2.indexOf(scores.sort((a, b) => b - a)[0])]
    }

    act = () => { return this.decision }

    scoreOption = (option) => {
        // return abs(this.o + this.turningSpeed * option- this.angleToOp)
        return 1 / abs((this.o + (this.turningSpeed * option)) - this.angleToOp)
    }

    incrementStepCount = (increment) => { this.stepCount += increment }

    updateStepCount = (newCount) => { this.stepCount = newCount }

    updateCycleIndex = (increment) => { this.cycleIndex = (this.cycleIndex + increment + this.oodaHasFourParts) % this.oodaHasFourParts }

    initBox = () => {
        const { x, y, sizex, sizey } = system.qts[this.qtIndex]
        return { minX: x, maxX: x + sizex, minY: y, maxY: y + sizey }
    }

    isOutOfBounds(box) {
        return (this.x + this.radius >= box.maxX) ||
            (this.x + this.radius <= box.minX) ||
            (this.y + this.radius >= box.maxY) ||
            (this.y + this.radius <= box.minY)
    }

    correctColor = () => {
        // if (isHit()) return { r: this.cols[0][0] + 100, g: this.cols[0][1], b: this.cols[0][2] }
        return { r: this.cols[0][0], g: this.cols[0][1], b: this.cols[0][2] }
    }
}