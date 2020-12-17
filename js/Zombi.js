var Zombi = function(x, y, img, muestra, id){
  img = ["<img src='./resources/ghost/ghost-appears.gif' alt='ghost'>", "<img src='./resources/ghost/ghost-shriek.gif' alt='ghost'>", "<img src='./resources/ghost/ghost-idle.gif' alt='ghost'>"];
  Elemento.apply(this, arguments);

  /*this.interactuar = function(tauler){
    tauler.vida--;
  }*/
};


Zombi.prototype = Object.create(Elemento.prototype);
Zombi.prototype.constructor = Zombi;


/* Pasa por parametro el tablero para restarle vidas */
Zombi.prototype.interactuar = function(tauler){
  tauler.vida--;
};



