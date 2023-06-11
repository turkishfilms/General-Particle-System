class SpeedParticle extends QTParticle {
    constructor({
        thresholds = [10, 7, 3, 1],
        speedIncrement = 0.01,
        ...options
    } = {}) {
        const {
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
                shouldShow = true,
                shouldMove = true,
                r = radius,
                qtIndex = 0,
        } = options
        super({
            x: x,
            y: y,
            o: o,
            v: v,
            radius: radius,
            cols: cols,
            shouldShow: shouldShow,
            shouldMove: shouldMove,
            r: r,
            qtIndex: qtIndex,
        })
        this.thresholds = thresholds.sort((a, b) => a - b).reverse()
        this.speedIncrement = speedIncrement
        this.box = this.initBox()
    }

    nextStep() {
        this.updateNeighbors()
        const collisions = this.neighborsCount - 1
        const color = this.correctColor()
        return {
            deltaO: ((collisions > 0 || this.isOutOfBounds(box)) ? PI : 0),
            deltaV: (this.speedIncrement * collisions),
            color: color
        }
    }

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

    correctColor() {
        if (this.isFirst()) console.log(this.thresholds.length, this.cols.length)
        for (let i = 0; i < this.thresholds.length; i++) {
            if (this.v >= this.thresholds[i]) return {
                r: this.cols[i % this.cols.length][0],
                g: this.cols[i % this.cols.length][1],
                b: this.cols[i % this.cols.length][2]
            }
        }
    }

}