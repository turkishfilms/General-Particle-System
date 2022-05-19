class StickyParticle extends BasicParticle {
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
        this.neighbors = []
        this.a = a
        this.collisionthreshold = 2
        this.nearestNeigbor
    }

    isOutOfBounds(box) {
        return (this.x + this.radius >= box.maxX) ||
            (this.x + this.radius <= box.minX) ||
            (this.y + this.radius >= box.maxY) ||
            (this.y + this.radius <= box.minY)
    }

    updateNeighbors() {
        this.n = qt.find(this)
    }

    findAngleToNeighbor(neighbor) {
        return atan2(this.x, this.y, neighbor.x, neighbor.y)
    }

    distanceTo(neighbor) {
        return dist(this.x, neighbor.x, this.y, neighbor.y)
    }

    hasCollided() {
        const n = findNeighbors()
        for (let i = 0; i < n.length; i++) {
            const e = n[i];
            if (distanceTo(e) < this.r) return { e }
        }
        return false
    }

    updateO() { //return dif between current o and desired o
        const collided = hasCollided()
        if (isOutOfBounds()) return PI
        // return collided == false ? 0 : findAngleToNeighbor(collided) + PI
        if (collided != false) return findAngleToNeighbor(collided) + PI
        return 0
    }

    updateV() {
        if (this.shouldMove == false) return -this.v
    }
}