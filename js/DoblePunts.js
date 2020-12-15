var DoblePunts = function (x, y, img, muestra, id) {
  Recompensa.apply(this, arguments);
}
DoblePunts.prototype = Object.create(Recompensa.prototype); //se copia el prototipo del padre (metodos, variables..)
DoblePunts.prototype.constructor = DoblePunts; //redirigimos el constructor del padre al hijo
