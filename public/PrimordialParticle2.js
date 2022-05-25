/**
 * TODO
 * All particles have same orientation find out why //SOLVED: Basic Particle had cos(o) for both y and x




 */

class PrimordialParticle2 extends QTParticle {
    constructor({
        a = PI * 1,
        b = radians(17 * 1),
        thresholds = [35, 20, 15, 0],
        ...options
    } = {}) {
        const {
            x = random(0, width),
                y = random(0, height),
                o = random(0, PI),
                v = 0.67 * 2,
                radius = 3,
                r = 5 * 3,
                cols = [
                    [255, 255, 0],
                    [255, 0, 255],
                    [0, 0, 255],
                    [0, 100, 0],
                ],
                qtIndex = 0,
                shouldMove = true,
                shouldShow = true,
        } = options
        super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols, shouldShow: shouldShow, shouldMove: shouldMove, r: r, qtIndex: qtIndex,})
       
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

    isOutOfBounds(box) {
        return (this.x + this.radius >= box.maxX) ||
            (this.x + this.radius <= box.minX) ||
            (this.y + this.radius >= box.maxY) ||
            (this.y + this.radius <= box.minY)
    }
}