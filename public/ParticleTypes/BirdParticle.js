




































class Boid extends QTParticle.js{
constructor({...options}={}){
    const {x,y,o,v=4,r,cols=[[255,255,255]],shouldShow,shouldMove,r,qtIndex} = options
    super({ x: x, y: y, o: o, v: v, radius: radius, cols: cols, shouldShow: shouldShow, shouldMove: shouldMove, r: r, qtIndex: qtIndex, })
}


nextStep(){
    this.updateNeighbors()
    const {dV,dO}=this.flock(this.neighbors)

    return{deltaV:dV,deltaO:dO,color:correctColor()}
}

flock(n){

    return{dv:0,do:0}
}

congregate(){

}

repulsion(){

}

fluidization(){

}

correctColor(){
    return {r:this.cols[0][0],g:this.cols[0][1],b:this.cols[0][2]}
}

}





































