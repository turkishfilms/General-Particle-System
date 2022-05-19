/**
 * TODO
 * All particles have same orientation find out why //SOLVED: Basic Particle had cos(o) for both y and x




 */

class PrimordialParticle extends BasicParticle {
    constructor({
        x = random(0, width),
        y = random(0, height),
        o = random(0, PI),
        v = 0.67 * 2,
        radius = 3,
        r = 5 * 3,
        a = PI * 1,
        b = radians(17 * 1),
        cols = [
            [255, 255, 0],
            [255, 0, 255],
            [0, 0, 255],
            [0, 255, 0],
        ],
        thresholds = [35, 30, 20, 0],
        qt = 0
    } = {}) {
        super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols })
        this.x = x
        this.y = y
        this.o = o // orientation
        this.v = v // velocity
        this.r = r // how far agent can see
        this.a = a // turning characteristic
        this.b = b // neighborly influence on a
        this.radius = radius // size of agent
        this.neighbors = []
        this.cols = cols // cols
        this.thresholds = thresholds.sort().reverse()
        this.qt = qt
        // --RULES--
        //     yellow when => 35 neighbors
        //     magenta when => 20 and < 35
        //     blue when => 15 and < 20
        //     green when < 15 neighbors
    }

    nextStep() {
        this.neighbors = [];
        //  see whos near put them in neighbors array
        this.updateNeighbors();
        // split neighbors into right and left  
        const { leftNeighbors, rightNeighbors } = this.splitNeighbors()
        // which way to turn
        const B = this.steer(leftNeighbors.length, rightNeighbors.length) //problem could be here

        return { deltaO: this.a + B, deltaV: 0 , color: this.correctColor()}
    }

    updateNeighbors() {
        this.neighbors = this.findNeighbors()
    }

    findNeighbors() {
        return system.qts[this.qt].ask(this, this.neighbors)
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

    steer(amtLeft, amtRight) {
        return amtLeft >= amtRight ? -(this.b * this.neighbors.length) : this.b * this.neighbors.length;
    }

    correctColor() {
        for (let i = 0; i < this.thresholds.length; i++) {
            if (this.neighbors.length  >= this.thresholds[i]) return {
                r: this.cols[i % this.cols.length][0],
                g: this.cols[i % this.cols.length][1],
                b: this.cols[i % this.cols.length][2]
            }
        }
    }

    isOutOfBounds(box) {
        return (this.x + this.radius >= box.maxX) ||
            (this.x + this.radius <= box.minX) ||
            (this.y + this.radius >= box.maxY) ||
            (this.y + this.radius <= box.minY)
    }
}