/**
 * TODO
 * add square search not just circle search
 * add arbitrary shape search
 * object destructure and optional inputs to ask
 * 
 * 
 * 
 */

export default class Quadtree { 
    constructor({ position ={x : 0, y : 0}, size ={width : width, height : height}, capacity = 10 } = {}) {
        this.position = position
        this.size = size
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
            item.x > this.position.x && item.x < this.position.x + this.size.width &&
            item.y > this.position.y && item.y < this.position.y + this.size.height)
    }

    intersects(range) {
        const dx = abs(range.x - (this.position.x + this.size.width / 2)),
            dy = abs(range.y - (this.position.y + this.size.height / 2)),
            dcorner = sqrt(pow(this.size.width / 2, 2) + pow(this.size.height / 2, 2))

        // no possible interection
        if (dx > range.r + this.size.width / 2 || dy > range.r + this.size.height / 2) return false

        // corner exclusion
        if (dist(range.x, range.y, this.position.x + this.size.width / 2, this.position.y + this.size.height / 2) > dcorner + range.r) return false

        return true
    }

    subdivide() {
        const w = this.size.width / 2,
            h = this.size.height / 2
        this.children.push(new Quadtree({ x: this.position.x, y: this.position.y, sizex: w, sizey: h, capacity:this.capacity}));
        this.children.push(new Quadtree({ x: this.position.x + w, y: this.position.y, sizex: w, sizey: h, capacity:this.capacity }));
        this.children.push(new Quadtree({ x: this.position.x, y: this.position.y + h, sizex: w, sizey: h, capacity:this.capacity }));
        this.children.push(new Quadtree({ x: this.position.x + w, y: this.position.y + h, sizex: w, sizey: h, capacity:this.capacity }));
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
        rect(this.position.x + 1, this.position.y + 1, this.size.width - 1, this.size.height - 1);
        if (this.hasSplit) this.children.forEach(child => child.show())
    }
}

class Quadtree3 { //permatree switch items
    //each frame dont  rebuild whole tree, 
    //ask each node if items are still contained  this is n requests, 
    //if so move on to next item 
    //else ask siblings then parent then parents siblings etc. or just reinsert at root
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

remove(item) {
this.items.findIndex

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

class Quadtree2 { 
    constructor({ x = 0, y = 0, sizex = width, sizey = height, capacity = 10 } = {}) {
        this.x = x;
        this.y = y;
        this.sizex = sizex;
        this.sizey = sizey;
        this.elts = [];
        this.children = [];
        this.capacity = capacity;
        this.hasSplit = false;
    }

    isFull() {
        return this.elts.length >= this.capacity
    }

    contains(elt) {
        return (
            elt.x > this.x && elt.x < this.x + this.sizex &&
            elt.y > this.y && elt.y < this.y + this.sizey)
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

    insert(elt) {
        if (!this.contains(elt)) return
        if (this.hasSplit) {
            this.give(elt)
            return
        }
        if (this.isFull()) {
            this.subdivide();
            this.give(elt);
        } else this.elts.push(elt)
    }

    ask(area, itemsArr) {
        if (this.intersects(area)) {
            this.elts.forEach(elt => {
                if (dist(elt.x, elt.y, area.x, area.y) < area.r) itemsArr.push(elt)
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

class QT2Node { 
    constructor({ x = 0, y = 0, sibling = null} = {}) {
        this.x = x;
        this.y = y;
        this.elt
        this.child;
        this.sibling = sibling
        this.hasSplit = false;
    }

    contains(elt) {
        return (
            elt.x > this.x && elt.x < this.x + this.sizex &&
            elt.y > this.y && elt.y < this.y + this.sizey)
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
        this.child= new QT2Node({ x: this.x, y: this.y, sibling:
                    new QT2Node({ x: this.x + w, y: this.y, sibling:
                    new QT2Node({ x: this.x, y: this.y + h, sibling:
                    new QT2Node({ x: this.x + w, y: this.y + h})})})});
        this.hasSplit = true
    }

    give(item) {
        this.children.forEach(child => child.insert(item))
    }

    insert(elt) {
        const box = [ this.x + something,this.y+somethingelse]
        if (!this.contains(elt)) return
        if (this.hasSplit) {
            this.give(elt)
            return
        }
        if (this.isFull()) {
            this.subdivide();
            this.give(elt);
        } else this.elts.push(elt)
    }

    ask(area, itemsArr) {
        if (this.intersects(area)) {
            this.elts.forEach(elt => {
                if (dist(elt.x, elt.y, area.x, area.y) < area.r) itemsArr.push(elt)
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

class QTNode2{
    constructor({elt = [],
        ID = 0}={}){
        this.elt = elt
        this.ID = ID               
    }
    add(){}
    remove(){}

}