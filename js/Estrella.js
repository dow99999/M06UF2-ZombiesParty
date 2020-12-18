var Estrella = function(x, y, img, muestra, id){
  img = "<img class='mob star-show' alt='star' src='./resources/star.png'>"
  Elemento.apply(this, arguments);
};

Estrella.prototype = Object.create(Elemento.prototype); //se copia el prototipo del padre (metodos, variables..)
Estrella.prototype.constructor = Estrella; //redirigimos el constructor del padre al hijo

/**
 * Procedimiento que aplica los beneficios de haber clicado una estrella dentro de tablero
 * @param {Tauler} tauler 
 */
Estrella.prototype.interactuar = function(tauler){
  if(!this.areAllVisible()){
    tauler.puntuacio += 200;
    tauler.estrelles++;
    this.setDestapat([true]);
  }
}

Estrella.prototype.moviment = function(x,y,clase){
  document.getElementById(x + "," + y).innerHTML = this.getFrame(true);
}