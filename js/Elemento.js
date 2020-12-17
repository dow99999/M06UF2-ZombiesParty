var Elemento = function (x, y, img, muestra, id) {
  var posx = x;
  var posy = y;
  var ar_img = img;
  var destapat = muestra;
  var identificador = id;

  this.getPosX = function () { return posx; }

  this.getPosY = function () { return posy; }

  this.setDestapat = function (f_destapat) { destapat = f_destapat; } //TODO busqueda de la parte que se puede destapar
  this.getDestapat = function () { return destapat; }

  this.getId = function () { return identificador; }

  this.getFrame = function () {
    let check = true;
    for(let i = 0; i < this.getDestapat().length;i++){
      if(check) check = this.getDestapat()[i];
    }

    if(check) return ar_img;
    else return "<img class='grass' src='./resources/grass.png' alt='grass'>";
  }
};

/* "<img class='grass' src='./resources/grass.png' alt='grass'>" */

Elemento.prototype.getImg = function(){
  if(this.getDestapat()) return this.ar_img;
  else return "";
};