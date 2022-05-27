/**
 * TODO
 * add square search not just circle search
 * add arbitrary shape search
 * object destructure and optional inputs to ask
 * 
 * 
 * 
 */

class Quadtree { 
    constructor({ x = 0, y = 0, sizex = width, sizey = height, capacity = 10 } = {}) {
        this.x = x;
        this.y = y;
        this.sizex = sizex;
        this.sizey = sizey;
        this.items = [];
        this.children = [];
        this.capacity = capacity;
        this.hasSplit = false;
    }

    isFull() {
        return this.items.length >= this.capacity
    }

    contains(item) {
        return (
            item.x > this.x && item.x < this.x + this.sizex &&
            item.y > this.y && item.y < this.y + this.sizey)
    }

    intersects(range) {
        const dx = abs(range.x - (this.x + this.sizex / 2)),
            dy = abs(range.y - (this.y + this.sizey / 2)),
            dcorner = sqrt(pow(this.sizex / 2, 2) + pow(this.sizey / 2, 2))

        // no possible interection
        if (dx > range.r + this.sizex / 2 || dy > range.r + this.sizey / 2) return false

        // corner exclusion
        if (dist(range.x, range.y, this.x + this.sizex / 2, this.y + this.sizey / 2) > dcorner + range.r) return false

        return true
    }

    subdivide() {
        const w = this.sizex / 2,
            h = this.sizey / 2
        this.children.push(new Quadtree({ x: this.x, y: this.y, sizex: w, sizey: h, capacity:this.capacity}));
        this.children.push(new Quadtree({ x: this.x + w, y: this.y, sizex: w, sizey: h, capacity:this.capacity }));
        this.children.push(new Quadtree({ x: this.x, y: this.y + h, sizex: w, sizey: h, capacity:this.capacity }));
        this.children.push(new Quadtree({ x: this.x + w, y: this.y + h, sizex: w, sizey: h, capacity:this.capacity }));
        this.hasSplit = true
    }

    give(item) {
        this.children.forEach(child => child.insert(item))
    }

    insert(item) {
        if (!this.contains(item)) return
        if (this.hasSplit) {
            this.give(item)
            return
        }
        if (this.isFull()) {
            this.subdivide();
            this.give(item);
        } else this.items.push(item)
    }

    ask(area, itemsArr) {
        if (this.intersects(area)) {
            this.items.forEach(item => {
                if (dist(item.x, item.y, area.x, area.y) < area.r) itemsArr.push(item)
            })
            if (this.hasSplit) this.children.forEach(child => child.ask(area, itemsArr))
        }
        return itemsArr;
    }

    show() {
        rect(this.x + 1, this.y + 1, this.sizex - 1, this.sizey - 1);
        if (this.hasSplit) this.children.forEach(child => child.show())
    }
}