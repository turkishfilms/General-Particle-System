

/**
 * BasicParticle Class - Represents a basic particle.
 */
export default class BasicParticle {
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
        if(this.weirdShow) this.weirdShow()
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
