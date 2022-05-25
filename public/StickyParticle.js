/**
 * TODO::
 * decide color mapping to collision count
 * 
 * 
 * 
 */
class StickyParticle extends QTParticle {
    constructor({
        ...options
    } = {}) {
        const {
            x = random(0, width),
                y = random(0, height),
                o = random(0, PI),
                v = 1,
                radius = 10,
                r = radius,
                cols = [
                    [75, 20, 50, ],
                    [150, 20, 50],
                    [210, 20, 50],
                    [255, 20, 50]
                ],
                qtIndex = 0,
                shouldShow = true,
                shouldMove = true
        } = options
        super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols, shouldShow: shouldShow, shouldMove: shouldMove, r: r, qtIndex: qtIndex, })
        this.collisionCount = 0
    }

    nextStep() {
        this.updateNeighbors()
        const collided = this.updateCollisionCount()
        return { deltaV: 0, deltaO: (!collided ? 0:PI), color: this.correctColor() }

        return { deltaV: 0, deltaO: 0, color: this.correctColor() }
    }

    updateCollisionCount() {
        this.collisionCount += this.neighbors.length - 1
        if (this.collisionCount >= this.cols.length) {
            this.shouldMove = false
        }
        return this.neighborsCount > 1
    }

    correctColor() {
        if (!this.shouldMove) return { r: this.cols[0][0], g: this.cols[0][1], b: this.cols[0][2] }
        return { r: this.cols[(this.collisionCount + 1) % this.cols.length][0], g: this.cols[(this.collisionCount + 1) % this.cols.length][1], b: this.cols[(this.collisionCount + 1) % this.cols.length][2] }
    }

}