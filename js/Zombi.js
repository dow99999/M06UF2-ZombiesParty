var Zombi = function(x, y, img, muestra, id){
  img = ["<img class='mob " + clase +"' src='./resources/ghost/ghost-appears.gif' alt='ghost'>", "<img clase='" + clase +"' src='./resources/ghost/ghost-shriek.gif' alt='ghost'>", "<img src='./resources/ghost/ghost-idle.gif' alt='ghost'>"];
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

Zombi.prototype.moviment = function(x,y, clase){
  document.getElementById(x + "," + y).innerHTML = "";
  let frame = this.getFrame(true);

  setTimeout(function(){
    console.log("primera");
    document.getElementById(x + "," + y).innerHTML = frame[0];
    
    document.getElementById(x + "," + y).childNodes[0].classList.add(decidirClase("zombie",clase));
  },100);

  setTimeout(function(){
    console.log("segunda");
    document.getElementById(x + "," + y).innerHTML = frame[1];
    document.getElementById(x + "," + y).childNodes[0].classList.add(decidirClase("zombie",clase));
  },1100);

  setTimeout(function(){
    console.log("Tercera");
    document.getElementById(x +"," + y).innerHTML = frame[2];
    document.getElementById(x + "," + y).childNodes[0].classList.add(decidirClase("zombie",clase));
  },3100);
}



