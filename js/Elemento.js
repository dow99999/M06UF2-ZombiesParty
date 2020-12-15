var Elemento = function (x, y, img, muestra, id) {
  var posx = x;
  var posy = y;
  var ar_img = img;
  var destapat = muestra;
  var identificador = id;

  this.getPosX = function () { return posx; }

  this.getPosY = function () { return posy; }

  this.getFrame = function () { return ar_img; }

  this.setDestapat = function (f_destapat) { destapat = f_destapat; } //TODO busqueda de la parte que se puede destapar
  this.getDestapat = function () { return destapat; }

  this.getId = function () { return identificador; }
};