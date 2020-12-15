var VidaExtra = function (x, y, img, muestra, id) {
  Recompensa.apply(this, arguments);
}

VidaExtra.prototype = Object.create(Recompensa.prototype); //se copia el prototipo del padre (metodos, variables..)
VidaExtra.prototype.constructor = VidaExtra; //redirigimos el constructor del padre al hijo
