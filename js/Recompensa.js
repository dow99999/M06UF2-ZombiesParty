var Recompensa = function (x, y, img, muestra, id) {
  Elemento.apply(this, arguments);
  var collected = muestra[0];

  this.collect = function(){
    collected = true;
  }
  this.isCollected = function(){
    return collected;
  }
}

Recompensa.prototype = Object.create(Elemento.prototype); //se copia el prototipo del padre (metodos, variables..)
Recompensa.prototype.constructor = Recompensa; //redirigimos el constructor del padre al hijo

