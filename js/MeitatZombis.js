var MeitatZombis = function (x, y, img, muestra, id) {
  Recompensa.apply(this, arguments);
}

MeitatZombis.prototype = Object.create(Recompensa.prototype); //se copia el prototipo del padre (metodos, variables..)
MeitatZombis.prototype.constructor = MeitatZombis; //redirigimos el constructor del padre al hijo
