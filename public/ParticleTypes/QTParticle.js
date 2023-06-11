
/**
 * QTParticle Class - Represents a quadtree particle.
 * @extends BasicParticle
 */
class QTParticle extends BasicParticle {
    /**
     * Constructs a new QTParticle instance.
     * @param {Object} [options] - The options object.
     * @param {number} [options.qtIndex=0] - The QuadTree index.
     * @param {number} [options.r=15] - The radius.
     * @param {Object} [options.options] - The BasicParticle options object.
     */
    constructor({
        qtIndex = 0,
        r = 15,
        ...options
    } = {}) {
        const { x, y, o, v, radius, cols, shouldShow, shouldMove } = options
        super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols, shouldShow: shouldShow, shouldMove: shouldMove })
        this.r = r
        this.qtIndex = qtIndex
        this.neighbors = []
        this.neighborsCount = 0
        this.qt
    }

    /**
     * Updates the neighbors of the particle.
     */
    updateNeighbors() {
        this.neighbors = []
        this.neighbors = this.findNeighbors()
        this.neighborsCount = this.neighbors.length
    }

    /**
     * Finds the neighbors of the particle.
     * @return {Array} - The array of neighboring particles.
     */
    findNeighbors() {
        return this.qt.ask(this, this.neighbors)
    }

    /**
    * Splits neighbors into two groups, left and right.
    * @return {Object} - The object with leftNeighbors and rightNeighbors arrays.
    */
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

    /**
    * Finds the angle to a neighboring particle.
    * @param {Object} neighbor - The neighboring particle.
    * @return {number} - The angle to the neighbor.
    */
    findAngleToNeighbor(neighbor) {
        return atan2(neighbor.y - this.y, neighbor.x - this.x)
    }

    /**
    * Calculates the distance to a neighboring particle.
    * @param {Object} neighbor - The neighboring particle.
    * @return {number} - The distance to the neighbor.
    */
    distanceTo(neighbor) {
        return dist(this.x, neighbor.x, this.y, neighbor.y)
    }

    /**
    * Adds a QuadTree to the particle.
    * @param {Object} qt - The QuadTree to be added.
    */
    addQT(qt) {
        this.qt = qt
    }
}

