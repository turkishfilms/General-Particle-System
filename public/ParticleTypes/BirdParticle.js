class Boid extends QTParticle.js{
constructor({sepWeight = 0.5, aliWeight = 0.5, cohWeight = 0.5, separationRadius = 3, alignmentRadius = 3, ...options}={}){
    const {x,y,o,v=4,r,cols=[[255,255,255]],shouldShow,shouldMove,r,qtIndex} = options
    super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols, shouldShow: shouldShow, shouldMove: shouldMove, r: r, qtIndex: qtIndex, })
    this.sepWeight = sepWeight
    this.aliWeight = aliWeight
    this.cohWeight = cohWeight
    this.separationRadius = separationRadius
    this.alignmentRadius = alignmentRadius
    this.cohesionRadius = r
}


nextStep(){
    this.updateNeighbors()
    const {dV,dO}=this.flock(this.neighbors)

    return{deltaV:dV,deltaO:dO,color:correctColor()}
}

flock(n){
const dSep = this.separation(),
dAli = this.alignment(),
dCoh = this.cohesion()
    return{dV:(this.v * -1) + dSep.dV * sepWeight + dAli.dV * aliWeight + dCoh.dV * cohWeight, dO:(this.o * -1) + dSep.dO * this.sepWeight + dAli.dO * this.aliWeight + dCoh.dO * this.cohWeight }
}

separation(){
    const sepNeighbors = findNeighbors(separationRadius)
    let d = {v:0,o:0}
    sepNeighbors.forEach(n => {
        if(n == this) return
        d.v += 1 / distanceTo(n)
        d.o += (findAngleToNeighbor(n)+PI)
    })
    return {dV: d.v / sepNeighbors.length, dO: d.o / sepNeighbors.length}
}

alignment(){ //align orientation
    const aliNeighbors = findNeighbors(alignmentRadius)
    let aliNSum = 0
    for (let i = 0; i < aliNeighbors.length; i++) {aliNsum += aliNeighbors[i].o} 
    let aliNAvg = [aliNsum/aliNeighbors.length]
    return {dO:aliNAvg,dV:0}

}

cohesion(){ //go to avg pos of neighvbors
    const cohNeighbors = this.neighbors
    let cohNSum = [0,0]
    for (let i = 0; i < cohNeighbors.length; i++) {
        cohNsum[0] += cohNeighbors[i].x
        cohNsum[1] += cohNeighbors[i].y
    } 
    const cohNAvg = {x:cohNsum[0]/cohNeighbors.length, y:ohNsum[1]/cohNeighbors.length}
    return {dO:findAngleToNeighbor(cohNAvg),dV:1/distanceToNeighbor(cohNAvg)}
}

correctColor(){
    return {r:this.cols[0][0],g:this.cols[0][1],b:this.cols[0][2]}
}

}





































