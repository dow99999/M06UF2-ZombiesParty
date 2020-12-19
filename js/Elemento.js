var Elemento = function (x, y, img, muestra, id) {
  var posx = x;
  var posy = y;
  var ar_img = img;
  var destapat = muestra;
  var identificador = id;

  this.getPosX = function () { return posx; }

  this.getPosY = function () { return posy; }

  this.setDestapat = function (f_destapat, index) { 
    if(arguments.length == 1){
      destapat = f_destapat;
    } else {
      destapat[index] = f_destapat;
    }
   }
  this.getDestapat = function () { return destapat; }

  this.getId = function () { return identificador; }

  this.getFrame = function (destapat) {
    let check = false;
    if(destapat != null) check = destapat;
    if(check) return ar_img;
    else return "<img class='grass " + clase +"' src='./resources/grass.png' alt='grass'>";
  }

  this.getImg = function (){ return this.ar_img; } 

  
};

/* "<img class='grass' src='./resources/grass.png' alt='grass'>" */

/**
 * Funcion para recuperar el indice del recuadro en la posicion 
 * @param {Integer} posx posicion x
 * @param {Integer} posy posicion y
 * @returns el indice si se encuentra o null si no existe 
 */
Elemento.prototype.getPosIndex = function(posx, posy){
  let found = false;
  let i = 0;

  do{
    found = this.getPosX()[i] == posx && this.getPosY()[i] == posy;
    i++;
  } while(!found && i < this.getPosX().length);

  return found ? (i-1) : null;
}

/**
 * Funcion que devuelve si todos los elementos del objeto son visibles
 * @returns True si todos son visibles, False si no lo son
 */
Elemento.prototype.areAllVisible = function(){
  let i = 1;
  let yes = this.getDestapat()[0];

  while(i < this.getDestapat().length && yes){
    yes = this.getDestapat()[i];
    i++;
  }

  return yes;
};