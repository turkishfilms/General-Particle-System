class CrazyParticle extends QTParticle {
    constructor({
      a = PI / 16,
      b = radians(17 * 1),
      thresholds = [35, 20, 15, 0],
      ...options
    } = {}) {
      const {
        x,
        y,
        o,
        v = 0.67 * 2,
        radius = random(5, 50),
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
      } = options;
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
      });
  
      this.a = a; // turning characteristic
      this.b = b; // neighborly influence on a
      this.thresholds = thresholds.sort((a, b) => b - a);
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
      const { leftNeighbors, rightNeighbors } = this.splitNeighbors();
      // which way to turn
      const B = this.steer(leftNeighbors.length, rightNeighbors.length);
  
      this.radius = min(max(this.radius + random(-2, 2), 3), 100);
      return {
        deltaO: this.a + B,
        deltaV: 0,
        color: this.correctColor(this.neighbors.length),
      };
    }
  
    steer(amtLeft, amtRight) {
      return amtLeft >= amtRight
        ? -(this.b * this.neighbors.length)
        : this.b * this.neighbors.length;
    }
  
    correctColor(numNeighbors) {
      return {
        r: min(
          max((this.color.r += random(-20, 20) * (numNeighbors + 1)), 0),
          255
        ),
        g: min(
          max((this.color.r += random(-20, 20) * (numNeighbors + 1)), 0),
          255
        ),
        b: min(
          max((this.color.r += random(-20, 20) * (numNeighbors + 1)), 0),
          255
        ),
      };
    }
  }
  