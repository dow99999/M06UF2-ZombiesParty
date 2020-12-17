var DoblePunts = function (x, y, img, muestra, id) {
  Recompensa.apply(this, arguments);
}
DoblePunts.prototype = Object.create(Recompensa.prototype); //se copia el prototipo del padre (metodos, variables..)
DoblePunts.prototype.constructor = DoblePunts; //redirigimos el constructor del padre al hijo

DoblePunts.prototype.interactuar = function(posx, posy, tauler){
  let index = this.getPosIndex(posx, posy);

  if(index != null){
    this.setDestapat(true, index);
    if(this.areAllVisible() && !this.isCollected()){
      tauler.puntuacio *= 2;
      this.collect();
    }
  }
}