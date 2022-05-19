class SpeedParticle extends BasicParticle {
    constructor({
        x = 100,
        y = 100,
        o = 3.14,
        v = 1,
        radius = 5,
        cols = [
            [255, 255, 255],
            [0, 0, 0]
        ],
        a = 6
    } = {}) {
        super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols })
        this.a = a
    }

    isOutOfBounds(box) {
        return (this.x + this.radius >= box.maxX) ||
            (this.x + this.radius <= box.minX) ||
            (this.y + this.radius >= box.maxY) ||
            (this.y + this.radius <= box.minY)
    }

    hasCollided() {
        const n = qt.ask(this)
        return n.length
    }

    updateO() { //return dif between current o and desired o
        return (hasCollided() || isOutOfBounds()) ? PI : 0
    }

    updateV() {
        const n = hasCollided()
        return n ? a * n : 0
    }
}