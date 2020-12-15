var Zombi = function(x, y, img, muestra, id){
  Elemento.apply(this, arguments);
};

Zombi.prototype = Object.create(Elemento.prototype);
Zombi.prototype.constructor = Zombi;