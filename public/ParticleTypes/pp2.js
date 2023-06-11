/**
 * TODO
 * All particles have same orientation find out why //SOLVED: Basic Particle had cos(o) for both y and x




 */

class PrimordialParticle2 extends QTParticle {
    constructor({
        a = PI * 1,
        b = radians(17 * 1),
        thresholds = [35, 20, 15, 0],
        options = {
            x,
            y,
            o,
            v: 0.67 * 2,
            radius: 3,
            cols: [
                [255, 255, 0],
                [255, 0, 255],
                [0, 0, 255],
                [0, 255, 0],
            ],
            r,
            qtIndex,
            shouldMove,
            shouldShow,
        }
    } = {}) {

        super(options)

        this.a = a // turning characteristic
        this.b = b // neighborly influence on a
        this.thresholds = thresholds.sort((a, b) => b - a)
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
        const B = this.steer(leftNeighbors.length, rightNeighbors.length)

        return { deltaO: this.a + B, deltaV: 0, color: this.correctColor() }
    }

    steer(amtLeft, amtRight) {
        return amtLeft >= amtRight ? -(this.b * this.neighbors.length) : this.b * this.neighbors.length;
    }

    correctColor() {
        for (let i = 0; i < this.thresholds.length; i++) {
            if (this.neighborsCount >= this.thresholds[i]) {
                return {
                    r: this.cols[i][0],
                    g: this.cols[i][1],
                    b: this.cols[i][2]
                }
            }
        }
    }
}




/**
 * TODO
 * All particles have same orientation find out why //SOLVED: Basic Particle had cos(o) for both y and x




 */

class PrimordialParticle extends QTParticle {
    constructor({
        a = PI * 1,
        b = radians(17 * 1),
        thresholds = [35, 20, 15, 0],
        ...options
    } = {}) {
        const {
            x,
            y,
            o,
            v = 0.67 * 2,
            radius = 3,
            cols = [
                [255, 255, 0],
                [255, 0, 255],
                [0, 0, 255],
                [0, 255, 0],
            ],
            r,
            qtIndex,
            shouldMove,
            shouldShow,
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

        this.a = a // turning characteristic
        this.b = b // neighborly influence on a
        this.thresholds = thresholds.sort((a, b) => b - a)
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
        const B = this.steer(leftNeighbors.length, rightNeighbors.length)

        return { deltaO: this.a + B, deltaV: 0, color: this.correctColor() }
    }

    steer(amtLeft, amtRight) {
        return amtLeft >= amtRight ? -(this.b * this.neighbors.length) : this.b * this.neighbors.length;
    }

    correctColor() {
        for (let i = 0; i < this.thresholds.length; i++) {
            if (this.neighborsCount >= this.thresholds[i]) {
                return {
                    r: this.cols[i][0],
                    g: this.cols[i][1],
                    b: this.cols[i][2]
                }
            }
        }
    }
}



/**
 * BasicParticle Class - Represents a basic particle.
 */
class BasicParticle {
    /**
     * Constructs a new BasicParticle instance.
     * @param {Object} [options] - The options object.
     * @param {number} [options.x=random(0, width)] - The x position.
     * @param {number} [options.y=random(0, height)] - The y position.
     * @param {number} [options.o=random(0, TWO_PI)] - The orientation.
     * @param {number} [options.v=2] - The velocity.
     * @param {number} [options.radius=15] - The radius.
     * @param {Array<Array<number>>} [options.cols=[[255, 255, 0], [255, 0, 255], [0, 0, 255], [0, 255, 0]]] - The colors.
     * @param {boolean} [options.shouldShow=true] - Whether to show the particle.
     * @param {boolean} [options.shouldMove=true] - Whether the particle should move.
     */
    constructor({
        x = random(0, width),
        y = random(0, height),
        o = random(0, TWO_PI),
        v = 2,
        radius = 15,
        cols = [
            [255, 255, 0],
            [255, 0, 255],
            [0, 0, 255],
            [0, 255, 0]
        ],
        shouldShow = true,
        shouldMove = true,
    } = {}) {
        this.x = x
        this.y = y
        this.o = o
        this.v = v
        this.radius = radius
        this.cols = cols
        this.shouldShow = shouldShow
        this.shouldMove = shouldMove
    }

    /**
     * Performs one step of the particle's movement and drawing.
     */
    step() {
        const options = this.nextStep()
        if (this.shouldMove) this.move(options)
        if (this.shouldShow) this.show(options.color || { r: this.cols[0][0], g: this.cols[0][1], b: this.cols[0][2] })
    }

    /**
     * Determines the next step of the particle's movement.
     * @return {Object} - The changes in velocity and orientation for the next step.
     */
    nextStep() {
        return { deltaV: 0, deltaO: 0 }
    }

    /**
     * Draws the particle on the canvas.
     * @param {Object} col - The color to fill the particle.
     * @param {number} col.r - The red component of the color.
     * @param {number} col.g - The green component of the color.
     * @param {number} col.b - The blue component of the color.
     */
    show(col) {
        fill(col.r, col.g, col.b)
        ellipse(this.x, this.y, this.radius)
    }

    /**
     * Moves the particle.
     * @param {Object} options - The changes in velocity and orientation.
     * @param {number} options.deltaV - The change in velocity.
     * @param {number} options.deltaO - The change in orientation.
     */
    move(options) {
        this.o = (this.o + options.deltaO + TWO_PI) % TWO_PI
        this.v += options.deltaV
        this.x = (((this.v) * cos(this.o)) + this.x + width) % width
        this.y = (((this.v) * sin(this.o)) + this.y + height) % height
    }
}


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

