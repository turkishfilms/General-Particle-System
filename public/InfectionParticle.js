class InfectionParticle extends QTParticle {
    constructor({ turning = radians(0.001), infectionLevel = 0, infectability = 0.5, infectionCap = 10, stayHomeSick = false, ...options } = {}) {
        const {
            x = random(0, width),
                y = random(0, height),
                o = random(0, PI),
                v = 0.67 * 2,
                radius = 10,
                r = radius,
                cols = [
                    [255, 255, 255],
                    [255, 0, 255],
                    [0, 0, 255],
                    [0, 100, 0],
                ],
                qtIndex = 0,
                shouldMove = true,
                shouldShow = true,
        } = options
        super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols, shouldShow: shouldShow, shouldMove: shouldMove, r: r, qtIndex: qtIndex })
        this.turning = turning
        this.infectionLevel = infectionLevel
        this.infectability = infectability
        this.infectionCap = infectionCap
        this.stayHomeSick = stayHomeSick
    }

    nextStep = () => {
        this.updateNeighbors()
        this.updateInfection()
        if (this.infectionLevel >= this.infectionCap) this.shouldMove = false
        const bumped = this.neighborsCount > 1 ? PI : 0
        return { deltaV: 0, deltaO: (bumped + this.turning), color: this.correctColor() }
    }

    updateInfection = () => {
        if (this.neighborsCount > 1) {
            this.neighbors.forEach(neighbor => {
                if (neighbor != this) {
                    const neighborInfectionLevel = (neighbor.infectionLevel || 0) * this.infectability
                    this.infectionLevel += neighborInfectionLevel
                    if (this.stayHomeSick) this.turning += neighborInfectionLevel / 2
                }
            })
        }
    }

    correctColor = () => {
        if (!this.shouldMove) return { r: this.cols[0][0], g: this.cols[0][1], b: this.cols[0][2] }
        return { r: 40 * this.infectionLevel, g: 50, b: 30 }
    }
}