class BasicParticle {
    constructor({
        x = random(0, width),
        y = random(0, height),
        o = random(0, TWO_PI),
        v = 0.67 * 3,
        radius = 5 * 3,
        cols = [
            [255, 255, 0],
            [255, 0, 255],
            [0, 0, 255],
            [0, 255, 0]
        ],
        qt
    } = {}) {
        this.x = x
        this.y = y
        this.o = o
        this.v = v
        this.radius = radius
        this.cols = cols
        this.shouldShow = true
        this.shouldMove = true
        this.showDefault = true
        this.qt = qt
    }

    step() {
        const options = this.nextStep()
        if (this.shouldMove) this.move(options)
        if (this.shouldShow) this.show(options.color || { r: this.cols[0][0], g: this.cols[0][1], b: this.cols[0][2] })
    }

    nextStep() {
        return { deltaV: 0, deltaO: 0 }
    }

    show(col) {
        fill(col.r, col.g, col.b)
        ellipse(this.x, this.y, this.radius)
    }

    move(options) {
        this.o = (this.o + options.deltaO + TWO_PI) % TWO_PI
        this.x = (((this.v + options.deltaV) * cos(this.o)) + this.x + width) % width
        this.y = (((this.v + options.deltaV) * sin(this.o)) + this.y + height) % height
    }
}