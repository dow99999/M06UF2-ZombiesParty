var Elemento = function(x, y, img, muestra, id){
  var posx = x;
  var poxy = y;
  var ar_img = img;
  var destapat = muestra;
  var identificador = id;

  this.getPosX = function(index){ return this.posx[index]; }

  this.getPosY = function(index){ return this.posy[index]; }
  
  this.getFrame = function(index){ return this.img[index]; }
  
  this.setDestapat = function(f_destapat){ this.destapat = f_destapat; } //TODO busqueda de la parte que se puede destapar
  this.getDestapat = function(){ return this.muestra; }
  
  this.getId = function(){ return this.identificador; }
};