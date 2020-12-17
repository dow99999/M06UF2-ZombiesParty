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
  if(!this.areAllVisible()){ //solo te baja vida si es la primera vez que clicas
    tauler.vida--;

    if(tauler.puntuacio >= 100)
      tauler.puntuacio -= 100;
    else
      tauler.puntuacio = 0;

    this.setDestapat([true]);
  }
};



