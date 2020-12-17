var VidaExtra = function (x, y, img, muestra, id) {
  Recompensa.apply(this, arguments);
}

VidaExtra.prototype = Object.create(Recompensa.prototype); //se copia el prototipo del padre (metodos, variables..)
VidaExtra.prototype.constructor = VidaExtra; //redirigimos el constructor del padre al hijo

VidaExtra.prototype.interactua = function(posx, posy, tauler){ //por algun motivo si se llama interactuar no va pero si se llama interactua si
  let index = this.getPosIndex(posx, posy);
  console.log(index);
  if(index != null){
    this.setDestapat(true, index);
    if(this.areAllVisible() && !this.isCollected()){
      tauler.vida++;
      this.collect();
    }
  }
}