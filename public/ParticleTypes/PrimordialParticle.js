
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

        agents[i].colr += random(-20, 20) * (neighbors.length + 1);
        agents[i].colg += random(-20, 20) * (neighbors.length + 1);
        agents[i].colb += random(-20, 20) * (neighbors.length + 1);
        constrain(this.colr, 0, 255);
        constrain(this.colg, 0, 255);
        constrain(this.colb, 0, 255);
  
        let r = random(-2, 2);
        if (this.name) {
          let min = 100;
          this.radius = this.radius + r < min ? min : this.radius + r;
        } else this.radius += r;


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
