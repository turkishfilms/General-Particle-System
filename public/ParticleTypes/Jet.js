class Jet extends QTParticle {
    constructor({
        v = 5,
        r = 50,
        cycleDelay = 1,
        atkVal = 1,
        hpVal = 10,
        turningSpeed = radians(10),
        ...options
    } = {}) {
        const { x, y, o, v, radius, cols, shouldShow, shouldMove, qtIndex, r, neighbors } = options
        super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols, shouldShow: shouldShow, shouldMove: shouldMove, qtIndex: qtIndex, r: r, neighbors: neighbors })
        this.cycleDelay = cycleDelay
        this.atkVal = atkVal
        this.hpVal = hpVal
        this.cycleIndex = 0
        this.stepCount = 0
        this.oodaHasFourParts = 4
        this.decision = 0
        this.angleToOp = 0
    }

    nextStep = () => {
        if (!(this.stepCount <= this.cycleDelay)) {
            this.incrementStepCount(1)
            return { deltaV: 0, deltaO: 0, color: this.correctColor() }
        }
        const deltas = ooda(this.cycleIndex)
        updateCycleIndex(1)
        updateStepCount(0)
        return deltas
    }

    ooda(step) {
        switch (step) {
            case 0:
                this.observe()
                return { deltaV: 0, deltaO: 0, color: this.correctColor() }
                break;
            case 1:
                this.orient()
                return { deltaV: 0, deltaO: 0, color: this.correctColor() }
                break;
            case 2:
                this.decide()
                return { deltaV: 0, deltaO: 0, color: this.correctColor() }
                break;
            case 3:
                return { deltaV: 0, deltaO: this.act(), color: this.correctColor() }
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
        options.forEach(option => scores.push(scoreOption(option)))
        this.decision = this.turningSpeed * options[scores.sort((a, b) => b - a)[0]]
    }

    act = () => { return this.decision }

    scoreOption = (option) => {
        return abs((this.o + (this.turningSpeed * option)) - this.angleToOp)
    }

    incrementStepCount = (increment) => { this.stepCount += increment }

    updateStepCount = (newCount) => { this.stepCount = newCount }

    updateCycleIndex = (increment) => { this.cycleIndex = (this.cycleIndex + increment + this.oodaHasFourParts) % this.oodaHasFourParts }

    correctColor = () => {
        if (isHit()) return { r: this.cols[0][0] + 100, g: this.cols[0][1], b: this.cols[0][2] }
        return { r: this.cols[0][0], g: this.cols[0][1], b: this.cols[0][2] }
    }
}