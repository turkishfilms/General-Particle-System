class QTParticle extends BasicParticle {
    constructor({
        qtIndex = 0,
        neighbors = [],
        ...options
    } = {}) {
        super({ x: options.x, y: options.y, o: options.o, v: options.v, radius: options.radius, cols: options.cols, shouldShow: options.shouldShow, shouldMove: options.shouldMove })
        this.x = options.x
        this.y = options.y
        this.o = options.o
        this.v = options.v
        this.r = options.r
        this.radius = options.radius
        this.cols = options.cols
        this.shouldShow = options.shouldShow
        this.shouldMove = options.shouldMove
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

    findNeighbors() {
        return this.qt.ask(this, this.neighbors)
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