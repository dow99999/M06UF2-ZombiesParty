var Elemento = function(x, y, img, muestra, id){
  var posx = x;
  var poxy = y;
  var ar_img = img;
  var destapat = muestra;
  var identificador = id;

  var getPosX = function(index){ return this.posx[index]; }
  var getPosY = function(index){ return this.posy[index]; }
  var getFrame = function(index){ return this.img[index]; }
  var getDestapat = function(){ return this.muestra; }
  var getId = function(){ return this.identificador; }
};