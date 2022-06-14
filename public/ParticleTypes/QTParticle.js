class QTParticle extends BasicParticle {
    constructor({
        qtIndex = 0,
        neighbors = [],
        r = 15,
        ...options
    } = {}) {
        const { x, y, o, v, radius, cols, shouldShow, shouldMove } = options
        super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols, shouldShow: shouldShow, shouldMove: shouldMove })
        this.r = r
        this.qtIndex = qtIndex
        this.neighbors = neighbors
        this.neighborsCount = 0
        this.qt
    }

    updateNeighbors() {
        this.neighbors = []
        this.neighbors = this.findNeighbors()
        this.neighborsCount = this.neighbors.length
    }

    findNeighbors(radius = this.r) {
        return this.qt.ask({x:this.x,y:this.y, r: radius}, this.neighbors)
    }

    splitNeighbors() {
        const leftNeighbors = [],
            rightNeighbors = []
        this.neighbors.forEach(neighbor => {
            const angleToNeighbor = this.findAngleToNeighbor(neighbor)
            if (angleToNeighbor > PI + this.o || angleToNeighbor < this.o) leftNeighbors.push(neighbor)
            else rightNeighbors.push(neighbor)
            // else if (angleToNeighbor < PI + this.o || angleToNeighbor > this.o) rightNeighbors.push(neighbor)
        })
        return { leftNeighbors, rightNeighbors }
    }

    findAngleToNeighbor(neighbor) {
        return atan2(neighbor.y - this.y, neighbor.x - this.x)
    }

    distanceTo(neighbor) {
        return dist(this.x, neighbor.x, this.y, neighbor.y)
    }

    addQT(qt) {
        this.qt = qt
    }
}