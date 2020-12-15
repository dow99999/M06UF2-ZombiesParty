var Recompensa = function (x, y, img, muestra, id) {
  Elemento.apply(this, arguments);
}

Recompensa.prototype = Object.create(Elemento.prototype); //se copia el prototipo del padre (metodos, variables..)
Recompensa.prototype.constructor = Recompensa; //redirigimos el constructor del padre al hijo

