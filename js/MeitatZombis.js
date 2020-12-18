var MeitatZombis = function (x, y, img, muestra, id) {
  img = "<img class='meitat-zombies "+ clase +"' alt='vidaExtra' src='./resources/meitatZombie.gif'>";
  Recompensa.apply(this, arguments);
}

MeitatZombis.prototype = Object.create(Recompensa.prototype); //se copia el prototipo del padre (metodos, variables..)
MeitatZombis.prototype.constructor = MeitatZombis; //redirigimos el constructor del padre al hijo

MeitatZombis.prototype.interactuar = function(posx, posy, tauler){
  let index = this.getPosIndex(posx, posy);

  if(index != null){
    this.setDestapat(true, index);
    if(this.areAllVisible() && !this.isCollected()){
      tauler.halfZombies();
      this.collect();
    }
  }
}

MeitatZombis.prototype.moviment = function(x,y,clase){
  document.getElementById(x + "," + y).innerHTML = this.getFrame(true);
}