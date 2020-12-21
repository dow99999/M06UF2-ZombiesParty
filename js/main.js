const GESP_T = 'g';
const ZOMBIE_T = 'z';
const ESTRELLA_T = 'e';
const DOBLAR_T = 'd';
const MITAD_T = 'm';
const VIDA_T = 'v';

const GESP_D = 'G';
const ZOMBIE_D = 'Z';
const ESTRELLA_D = 'E';
const DOBLAR_D = 'D';
const MITAD_D = 'M';
const VIDA_D = 'V';

const VIDA_MAX = 3;
const NUMBERS = "1234567890";

var index = 1;
var posicioSeleccionada = "";
var clase ="";

var waitingFunction = "";
var phase = 1;


function isInside(x, y, max_x, max_y){
  return ((x < max_x && x >= 0) && (y < max_y && y >= 0));
}

/**
 * Procedimiento que inicializa el tablero
 * @param {int} taulerh alto del tablero
 * @param {int} taulerw ancho del tablero
 * @param {Object} tauler tablero 
 */
function initTauler(taulerh, taulerw, tauler){
        
  if(taulerh < 16 && taulerh > 7) clase = "normal";
  if(taulerh >= 16) clase = "min";
  if(taulerh <= 7) clase = "max";
  let total = (taulerh * taulerw);
  tauler.elements.zombies = total / 4;
  tauler.elements.estrellas = Number.parseInt(taulerh);
  
  tauler.elements.recompensas = total / 4;
  //minimo 1 de cada tipo
  tauler.elements.doblePunts = 1;
  tauler.elements.meitatZombies = 1;
  tauler.elements.vidaExtra = 1;

  let countRecompensas = tauler.elements.doblePunts + tauler.elements.meitatZombies*2 + tauler.elements.vidaExtra*3;
  
  //aumentar contadores recompensas en funcion del total de las recompensas

  while(countRecompensas < tauler.elements.recompensas){
    switch(Math.floor(Math.random() * 3)){
      case 0:
        tauler.elements.doblePunts++;
        break;
      case 1:
        tauler.elements.meitatZombies++;
        break;
      case 2:
        tauler.elements.vidaExtra++;
        break;
    }
    countRecompensas = tauler.elements.doblePunts + tauler.elements.meitatZombies*2 + tauler.elements.vidaExtra*3;
  }

  //llenar matriz de hierba

  tauler.rellenarHierba();
  //TODO generar objetos dentro de la matriz segun los elementos de la tabla vida extra
  //TODO meter lo de abajo en funciones
  tauler.genVidaExtra();
  tauler.genMeitatZombies();
  //TODO generar objetos dentro de la matriz segun los elementos de la tabla meitatZombies
  tauler.generarTipo("zombies");
  tauler.generarTipo("estrellas");
  tauler.generarTipo("doblePunts");

  initEventListener(tauler);
  }


// generar entidades de una casilla 


//Inicializar los listeners de cada caja en el tauler  
function initEventListener(tauler){
  document.getElementById("gameDisplay").innerHTML = tauler.printHTML();
  let elements = document.getElementsByClassName("mob");
  for(let i = 0; i < elements.length; i++){
    elements[i].classList.add(clase);
  }

  elements = document.getElementsByClassName("board");
  for(let i = 0; i < elements.length; i++){
    //console.log(elements[i]);
    elements[i].addEventListener("click", function(event){
      let x = event.currentTarget.id.split(",")[0];
      let y = event.currentTarget.id.split(",")[1]
      cercarObj(Number.parseInt(x) + 1,Number.parseInt(y)+1);
    });
  }
}

function joc(){
  let tauler = {
    h: document.getElementById("inputSize").value,
    w: document.getElementById("inputSize").value,
    vida: VIDA_MAX,
    estrelles: 0,
    puntuacio: 0,
    matriu: [],
    elements:{
      zombies: 0,
      estrellas:0,
      recompensas:0,
      doblePunts:0,
      meitatZombies:0,
      vidaExtra:0
    },
    objects:{
      zombies: [],
      estrellas: [],
      doblePunts: [],
      meitatZombies: [],
      vidaExtra: [],
    },
    mapa:[],
    print: function(){
      let aux = "";
      
      for(let y = 0; y < this.h; y++){
        for(let x = 0; x < this.w; x++){
          aux += this.matriu[y][x] + " ";
        }
        aux += "\n";
      }

      return aux;
    },
    printHTML:function(){

      let aux = "<div id='result' class='flex-column center'><h1 id='result-text' class='text'></h1></div>";
      aux += "<div class='flex-column center'>";
      for(let y = 0; y < this.h; y++){
        aux += "<div class='flex-row'>";
        for(let x = 0; x < this.w; x++){
          //console.log(this.mapa[y][x]);

          aux += "<div id='" + x +"," + y +"' class='flex-column center board " + clase + "'>" + ((this.mapa[y][x] != "g" && this.mapa[y][x] != "G") ? this.mapa[y][x].getFrame() : (this.mapa[y][x] == "g") ? "<img class='grass "+ clase +"' src='./resources/grass.png' alt='grass'>" : "<img class='grass "+ clase +"' src='./resources/grass.png' alt='grass'>")  + "</div>";
        }
        aux += "</div>";
      }

      aux += "</div>";
      waitingFunction = "";
      return aux;      
    },
    printDestapat:function(posY, posX){
      let aux = "<div class='flex-column center " + clase + "'>";
      
      for(let y = 0; y < this.h; y++){
        aux += "<div class='flex-row'>";
        for(let x = 0; x < this.w; x++){
          if(this.mapa[y][x] != "g" && this.mapa[y][x] != "G") console.log(this.mapa[y][x].getImg());
          aux += "<div id='" + x +"," + y +"' class='flex-column center board ";
          aux += clase ;
          aux += "'>" + ((this.mapa[y][x] != "g" && this.mapa[y][x] != "G") ? ((this.mapa[y][x] instanceof Estrella && y == posY && x == posX) ? this.mapa[y][x].getFrame() : (this.mapa[y][x] instanceof Zombi) ? "<img class='"+ clase +"-zombie' src='./resources/ghost/ghost-idle.gif'>" : "<img class='"+ clase +"-marker marker' src='./resources/question-marker.png' alt='hidden'>"): "<img class='grass "+ clase +"' src='./resources/grass.png' alt='grass'>");
          aux += "</div>";
        }
        aux += "</div>";
      }

      aux += "</div>";
      return aux;      
    },
    rellenarHierba:function(){
      for(let y = 0; y < this.h; y++){
        this.matriu[y] = new Array();
        this.mapa[y] = new Array(); 
        for(let x = 0; x < this.w; x++){
          this.matriu[y][x] = GESP_T;
          this.mapa[y][x] = GESP_T;
        }
      }
    },
    genVidaExtra:function(){
      for(let i = 0; i < this.elements.vidaExtra; i++){
        let aux_x;
        let aux_y;
        let vertical = (Math.random() * 2 < 1);
        let cabe = false;

        do {
          aux_x = Math.floor(Math.random() * this.w);
          aux_y = Math.floor(Math.random() * this.h);

          if(vertical){
            if(isInside(aux_x, aux_y - 1, this.w, this.h) && isInside(aux_x, aux_y + 1, this.w, this.h))
              cabe = this.matriu[aux_y - 1][aux_x] == GESP_T && this.matriu[aux_y][aux_x] == GESP_T && this.matriu[aux_y + 1][aux_x] == GESP_T;
          } else {
            if(isInside(aux_x - 1, aux_y, this.w, this.h) && isInside(aux_x + 1, aux_y, this.w, this.h))
              cabe = this.matriu[aux_y][aux_x - 1] == GESP_T && this.matriu[aux_y][aux_x] == GESP_T && this.matriu[aux_y][aux_x + 1] == GESP_T;
          }
          
        } while(!cabe);

          this.objects.vidaExtra.push(
            new VidaExtra(
              vertical ? [aux_x, aux_x, aux_x] : [aux_x - 1, aux_x, aux_x + 1],
              vertical ? [aux_y - 1, aux_y, aux_y + 1] : [aux_y, aux_y, aux_y],
              null,
              [false, false, false],
              VIDA_T
            )
          );
          this.updateTaulerMatrix();
      }
    },
    genMeitatZombies:function(){
      for(let i = 0; i < this.elements.meitatZombies; i++){

        let aux_x;
        let aux_y;
        let vertical = (Math.random() * 2 < 1);
        let cabe = false;
    
        do {
          aux_x = Math.floor(Math.random() * this.w);
          aux_y = Math.floor(Math.random() * this.h);
    
          if(vertical){
            if(isInside(aux_x, aux_y - 1, this.w, this.h))
              cabe = this.matriu[aux_y - 1][aux_x] == GESP_T && this.matriu[aux_y][aux_x] == GESP_T;
          } else {
            if(isInside(aux_x - 1, aux_y, this.w, this.h))
              cabe = this.matriu[aux_y][aux_x - 1] == GESP_T && this.matriu[aux_y][aux_x] == GESP_T;
          }
          
        } while(!cabe);
    
        this.objects.meitatZombies.push( 
          new MeitatZombis(
            vertical ? [aux_x, aux_x] : [aux_x - 1, aux_x],
            vertical ? [aux_y - 1, aux_y] : [aux_y, aux_y],
            null,
            [false, false],
            MITAD_T
          )
        );
        this.updateTaulerMatrix();
      }
    },
    generarTipo: function(tipo){
      for(let i = 0; i < this.elements[tipo]; i++){
    
        let aux_x;
        let aux_y;
        let cabe = false;
    
        do {
          aux_x = Math.floor(Math.random() * this.w);
          aux_y = Math.floor(Math.random() * this.h);
          
          cabe = tauler.matriu[aux_y][aux_x] == GESP_T;
          
        } while(!cabe);
        let novaEntitat;
        switch(tipo){
          case "zombies":
            novaEntitat = new Zombi([aux_x], [aux_y], null, [false], ZOMBIE_T);  
          break;
          case "estrellas":
            novaEntitat = new Estrella([aux_x], [aux_y], null, [false], ESTRELLA_T);
          break;
          case "doblePunts":
            novaEntitat = new DoblePunts([aux_x], [aux_y], null, [false], DOBLAR_T);
          break;
        }
        this.objects[tipo].push( 
          novaEntitat
        );
    
        this.updateTaulerMatrix();
      }
    },
    halfZombies: function(){
      let aux_index = [];

      for(let i = 0; i < this.elements.zombies; i++){
        if(!this.objects.zombies[i].areAllVisible())
          aux_index.push(i);
      }

      let deleted = 0;
      for(let i = Math.floor(aux_index.length/2); i < aux_index.length; i++){
        let auxx = (this.objects.zombies[aux_index[i]-deleted].getPosX())[0];
        let auxy = (this.objects.zombies[aux_index[i]-deleted].getPosY())[0];
        this.matriu[auxy][auxx] = GESP_T;
        this.mapa[auxy][auxx] = GESP_T;
        this.objects.zombies.splice(aux_index[i]-deleted, 1);
        this.elements.zombies--;
        deleted++;
      }

      this.updateTaulerMatrix();
    },
    updateTaulerMatrix: function(){
      for(let obj in this.objects){
        //console.log("o: " + obj);
        for(let entity in this.objects[obj]){
          
          //console.log("e: " + tauler.objects[obj][entity].getPosX()[0]);
          for(let i = 0; i < this.objects[obj][entity].getPosX().length; i++){
            
            //console.log(tauler.objects[obj][entity].getId());
            let posY = this.objects[obj][entity].getPosY()[i];
            let posX = this.objects[obj][entity].getPosX()[i];
            this.mapa[posY][posX] = this.objects[obj][entity]; 
            this.matriu[posY][posX] =
                (this.objects[obj][entity].getDestapat()[i]) ? this.objects[obj][entity].getId().toUpperCase() : this.objects[obj][entity].getId();
          }
        }
      }
    }

  };

  initTauler(tauler.h, tauler.w, tauler);
  actualitzarVides(tauler.vida);
  actualitzarEstrelles(tauler.estrelles,tauler.elements.estrellas);

  console.log(tauler.print() + "\n vidas: " + tauler.vida + "\n puntos: " + tauler.puntuacio + " \n estrellas: " + tauler.estrelles + "/" + tauler.elements.estrellas);

  document.getElementById("puntuacio").innerHTML = tauler.puntuacio;
  let final = false;
  let first = true;
  posicioSeleccionada = "";
  let jocIniciat = setInterval(function(){

    if(posicioSeleccionada == "abandonar") final = true;
    
    //console.log(tauler.print() + "\n vidas: " + tauler.vida + "\n puntos: " + tauler.puntuacio + " \n estrellas: " + tauler.estrelles);

    if(posicioSeleccionada != "" && !final){
      //console.log(posicioSeleccionada);
      let posX = posicioSeleccionada.split(",")[0];
      let posY = posicioSeleccionada.split(",")[1];
      //console.log(tauler.mapa[posY][posX].getDestapat());
      /*TODO hay que poner mas funciones y eso de momento estoy probando a ver que tal se verian las animaciones, el reset de las vidas esta off asi que nunca mueres,
       * para volver a activarlo solo quita el comentario de abajo */
      if(tauler.mapa[posY][posX] instanceof Zombi) {
        tauler.mapa[posY][posX].interactuar(tauler);
        document.getElementById(posX + "," + posY).classList.add("destapat");
        tauler.mapa[posY][posX].moviment(posX,posY, clase);
        afeguirText("errortxt", "Un Fantasma te ha golpeado! Acabas de perder una vida, una pena eh?");
      } else
      if(tauler.mapa[posY][posX] instanceof Estrella) {
        tauler.mapa[posY][posX].interactuar(tauler);
        if(first){
          document.getElementById("gameDisplay").innerHTML = tauler.printDestapat(posY, posX);
          tauler.mapa[posY][posX].moviment(posX,posY, clase);
          document.getElementById(posX + "," + posY).classList.add("destapat");
          document.getElementById(posX + "," + posY).childNodes[0].classList.add(decidirClase("cristal",clase));  
          waitingFunction = setTimeout(function(){
            document.getElementById("gameDisplay").innerHTML = tauler.printHTML();
            initEventListener(tauler);
            tauler.mapa[posY][posX].moviment(posX,posY, clase);
            document.getElementById(posX + "," + posY).classList.add("destapat");
            document.getElementById(posX + "," + posY).childNodes[0].classList.add(decidirClase("cristal",clase));  
          }, 2000);
        } else {
          tauler.mapa[posY][posX].moviment(posX,posY, clase);
          document.getElementById(posX + "," + posY).classList.add("destapat");
          document.getElementById(posX + "," + posY).childNodes[0].classList.add(decidirClase("cristal",clase));
        } 
        afeguirText("errortxt", "Acabas de descubir un cristal! Enorabuena! Ahora seras rico, no?");
      } else
      if(tauler.mapa[posY][posX] instanceof MeitatZombis) {
        tauler.mapa[posY][posX].interactuar(posX, posY, tauler);
        document.getElementById(posX + "," + posY).classList.add("destapat");
        tauler.mapa[posY][posX].moviment(posX, posY, clase);
        document.getElementById(posX + "," + posY).childNodes[0].classList.add(decidirClase("calavera",clase));
        afeguirText("errortxt", "Busca las Calaveras! Te permitiran arriesgarte menos.");
      } else
      if(tauler.mapa[posY][posX] instanceof VidaExtra) {
        tauler.mapa[posY][posX].interactua(posX, posY, tauler); //por algun motivo si se llama interactuar no va pero si se llama interactua si
        document.getElementById(posX + "," + posY).classList.add("destapat");
        tauler.mapa[posY][posX].moviment(posX, posY, clase);
        document.getElementById(posX + "," + posY).childNodes[0].classList.add(decidirClase("vidaExtra",clase));
        afeguirText("errortxt", "Estas pociones no hacen milagros, pero te haran un gran favor.");
      } else
      if(tauler.mapa[posY][posX] instanceof DoblePunts) {
        tauler.mapa[posY][posX].interactuar(posX, posY, tauler);
        document.getElementById(posX + "," + posY).classList.add("destapat");
        tauler.mapa[posY][posX].moviment(posX, posY, clase);

        document.getElementById(posX + "," + posY).childNodes[0].classList.add(decidirClase("doblePuntos",clase));
        afeguirText("errortxt", "La poción de Shan Gri La! Se dice que duplica el poder de tus cristales.");
      } else {
        console.log(posX + " - " + posY);
        document.getElementById(posX + "," + posY).classList.add("grass-destapat");
        tauler.matriu[posY][posX] = GESP_D;
        tauler.puntuacio += 50;
        afeguirText("errortxt", "Solo es hierba... como no.");
      }
      actualitzarVides(tauler.vida);
      actualitzarPuntuacio(tauler.puntuacio);
      actualitzarEstrelles(tauler.estrelles,tauler.elements.estrellas);
      if(tauler.vida == 0 || tauler.estrelles == tauler.elements.estrellas) final = true;
      posicioSeleccionada = "";
      tauler.updateTaulerMatrix();
      console.log(tauler.print() + "\n vidas: " + tauler.vida + "\n puntos: " + tauler.puntuacio + " \n estrellas: " + tauler.estrelles + "/" + tauler.elements.estrellas);
      first = false;
    }

    if(final) {
      let result = "";
      if(tauler.vida == 0) result = "Perdidas";
      if(tauler.estrelles == tauler.elements.estrellas) result = "Ganadas";
      if(posicioSeleccionada == "abandonar") result = "Abandonadas";
      updateCookie(result, tauler.h);
      updateCookie("Puntuacion más alta", tauler.h, tauler.puntuacio);
      final = false;
      posicioSeleccionada = "";
      switch(result){
        case "Perdidas":
          afeguirText("errortxt","Has perdido la partida... Es muy dificil recoger "+ tauler.elements.estrellas +" cristales eh?");
          afeguirText("result-text", "HAS PERDIDO");
          document.getElementById("result-text").style.color = "#d9534f !important";
          break;
        case "Ganadas":
          afeguirText("errortxt","Increible acontecimiento, pense que no lo lograrias... pero aqui estamos.");
          afeguirText("result-text", "VICTORIA");
          document.getElementById("result-text").style.color = "#5cb85c !important";
          break;
        case "Abandonadas":
          afeguirText("errortxt","Una retirada a tiempo siempre es una victoria.");
          afeguirText("result-text", "ABANDONADA");
          document.getElementById("result-text").style.color = "#b1beae !important";
          break;
      }

      setTimeout(reiniciarPartida, 5000);
      clearInterval(jocIniciat);
    };
  }, 50);
  
}

function tipoElemento(tipo){
  let elemento = "";
  if(tipo instanceof Zombi) elemento = "zombie";
  else if(tipo instanceof Estrella) elemento = "cristal";
  else if(tipo instanceof DoblePunts) elemento = "doblePuntos";
  else if(tipo instanceof VidaExtra) elemento = "vidaExtra";
  else if(tipo instanceof MeitatZombis) elemento = "calavera";

  return elemento;
}

/* guarda la cookie correspondiente */
function updateCookie(x, currentGame, max){
  if(max != null){
    if(max > localStorage.getItem(currentGame + "=" + x)) localStorage.setItem(currentGame + "=" + x, max);
  } else {
    localStorage.setItem(currentGame + "=" + x, Number.parseInt(localStorage.getItem(currentGame + "=" + x)) + 1);
  }

}

/* decide la clase que tiene que usar las imagenes en funcion del tamaño de la matriz */
function decidirClase(tipo, clase){
  let base = "";
  base = clase + "-" + tipo;
  console.log(base);  
  return base;
}

/* reiniciar partida */
function reiniciarPartida(){
  actualitzarEstrelles(0,0);
  document.getElementById("submit").innerHTML = "EMPEZAR";
  document.getElementById("abandonar").style.display = "none";
  document.getElementById("gameDisplay").innerHTML = "<img class='demon' src='./resources/demon/demon-idle.gif' alt='waiting'>";
  document.getElementById("confSize").style.display = "flex";
  document.getElementById("gameControls").style.display = "none";
  document.getElementById("inputSize").value = "";
  afeguirText("errortxt", "Partida reiniciada.");
  actualitzarVides(3);
  actualitzarPuntuacio(0);
  index = 1;
}

/* Actualitzar estrelles */
function actualitzarEstrelles(current, max){
  document.getElementById("estrellas").innerHTML = current + "/" + max;
}

/* Actualiza la puntuacion*/
function actualitzarPuntuacio(punt){
  document.getElementById("puntuacio").innerHTML = punt;
}

/* Actualitza las vidas que se muestran en funcion de la vida maxima y la actual */
function actualitzarVides(current){
  document.getElementById("vida").innerHTML = "";
  let vidas = "";

  for(let i = 0; i < (VIDA_MAX - current); i++){
    vidas += "<img class='broken-heart' alt='corazon-roto' src='./resources/heart/heart-3.png'>";
  }

  if(VIDA_MAX < current) {
    vidas = "";
    //console.log(current);
    //console.log(VIDA_MAX);
    for(let i = VIDA_MAX; i < current; i++){
      vidas += "<img class='golden-heart' alt='corazon' src='./resources/heart/heart.png'>";
    }

    for(let i = 0; i < VIDA_MAX; i++){
      vidas += "<img alt='corazon' src='./resources/heart/heart.png'>";
    }
  } else {
    for(let i = 0; i < current; i++){
      vidas += "<img alt='corazon' src='./resources/heart/heart.png'>";
    }
  }

  document.getElementById("vida").innerHTML += vidas;

  
}

function main(){
  afeguirText("errortxt", "");
  document.getElementById("gameDisplay").classList.add("center");
  document.getElementById("abandonar").style.display = "inline";
  document.getElementById("confSize").style.display = "none";
  document.getElementById("gameControls").style.display = "flex";
  document.getElementById("submit").innerHTML = "INTRODUCIR";
  index = 0;
  joc();
}

/* 
* Busca el objecto en la matriz al que le has hecho click y ejecuta su funcion.
*
*/
function cercarObj(posX,posY){
  if(waitingFunction == "") posicioSeleccionada = (posX-1) + "," + (posY-1);
  console.log(posicioSeleccionada);
}

window.onload = function(){

  loadStorage();

  let dictionary = [];
  dictionary[1] =  main;
  dictionary[0] =  cercarObj;
  actualitzarVides(3);
  window.document.getElementById("abandonar").addEventListener('click', function(){
    posicioSeleccionada = "abandonar";
  });
  
  window.document.getElementById("inputSize").addEventListener("keyup", function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      document.getElementById("submit").click();
    }
  });

  window.document.getElementById("inputX").addEventListener("keyup", function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      if(document.getElementById("inputX").value != null && document.getElementById("inputY").value != null)document.getElementById("submit").click();
    }
  });

  window.document.getElementById("inputY").addEventListener("keyup", function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      if(document.getElementById("inputX").value != null && document.getElementById("inputY").value != null)document.getElementById("submit").click();
    }
  });

  window.document.getElementById("mostrarLeyenda").addEventListener('click', function(){
    if(document.getElementById("leyenda").style.opacity == 0) mostrarLeyenda(true);
    else mostrarLeyenda(false);
  });

  window.document.getElementById("submit").addEventListener('click', function(){
    let size = document.getElementById("inputSize").value;
    let x = document.getElementById("inputX").value;
    let y = document.getElementById("inputY").value;
    let suma = 0;
    if(index == 0){
      suma = 1;
      size = (x < y) ? x : y;
    }
    if(verificarNumero(size, ((5 * index) + suma), "inputSize")) dictionary[index](x, y);
    else afeguirText("errortxt","El numero no és correcto. Introduce otro valor");
  });
  window.document.getElementById("inputSize").addEventListener('input', function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      document.getElementById("submit").click();
    }
    verificarNumero(event.target.value, 5, event.target.id);
  });
  window.document.getElementById("inputX").addEventListener('input', function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      document.getElementById("inputX").click();
    }
    verificarNumero(event.target.value, 1, event.target.id) ? afeguirText("coordX", event.target.value) : afeguirText("coordX", "0");
  });
  window.document.getElementById("inputY").addEventListener('input', function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      document.getElementById("inputX").click();
    }
    verificarNumero(event.target.value, 1, event.target.id) ? afeguirText("coordY", event.target.value) : afeguirText("coordY", "0");
  });
  window.document.getElementById("creditos").addEventListener('click', loadCredits);
}

/* mostra o amaga la llegenda en funcio de si esta amagada o no */

function mostrarLeyenda(x){
  let opacity = "0";
  if(x) {
    document.getElementById("mostrarLeyenda").src = "./resources/close-icon.png";
    opacity = "1";
  }
  else {
    document.getElementById("mostrarLeyenda").src = "./resources/question-icon.png";
    opacity = "0";
  };

  //console.log(opacity)


  document.getElementById("leyenda").style.opacity = opacity;
}

/* afegueix un texte a una ID donada per parametre */
function afeguirText(id, value){ 
  if(document.getElementById(id)!=null)
    document.getElementById(id).innerHTML =  value; 
}

/* verifica que el numero del input sigui un Number torna un boolean true si ho es*/
function verificarNumero(value, min, id){
  let res = "";
  let val = value.split("");
  for(let i = 0; i < val.length; i++){
    res += (NUMBERS.includes(val[i])) ? val[i] : "";
  }
  if(Number.parseInt(res) > 20) {
    res = (Number.parseInt(res) > 20) ? res.slice(0,-1) : res;
  }
  document.getElementById(id).value = res;
  return (Number.isInteger(Number.parseInt(value[value.length - 1])) && !(Number.parseInt(value) < min));
}

/* carga las cookies o las crea */
function loadStorage(){
  document.getElementById("cookies").innerHTML = "";
  let htmlCode = "";
  let codes = "Ganadas,Perdidas,Abandonadas,Puntuacion más alta";
  for(let i = 5; i < 21; i++){
    htmlCode = "<div class='cookie-container flex-column center'><span id='cookie[" + i + "," + i +"]' class='test'>["+ i + "," + i + "]</span></div>";
    document.getElementById("cookies").innerHTML = document.getElementById("cookies").innerHTML + htmlCode;
    document.getElementById("cookie[" +i + "," + i + "]").addEventListener("click", loadCookie);
    for(let z = 0; z < codes.split(",").length; z++){
      if(localStorage.getItem(i + "=" + codes.split(",")[z]) == null) localStorage.setItem(i + "=" + codes.split(",")[z], 0);
    }
  }

  for(let i = 5; i < 21; i++){
    document.getElementById("cookie[" +i + "," + i + "]").addEventListener("click", loadCookie);
  }
  
}


/* carga los creditos en las estadisticas */
function loadCredits(){
  setUpUnfold();
  let htmlCode = "<div class='flex-row flex-start credit-header'><img id='backToBase' src='./resources/back-arrow.png' alt='back'><div id='header-cookie' class='flex-column center f-w'><span class='test m-right' >CREDITOS</span></div></div>";
  htmlCode += "<span class='test creditos-texto' >GAME DIRECTOR & LEVEL DESIGNER</span>";
  htmlCode += "<span class='test creditos-texto'>Diego Muñoz & Oriol Fornos</span>";
  document.getElementById("cookies").innerHTML = htmlCode;
  document.getElementById("backToBase").classList.add();
  document.getElementById("backToBase").addEventListener("click", function(){
    setUpCookies();
    loadStorage();
  });
}

/* carga la cookie seleccionada */
function loadCookie(event){
  setUpUnfold();
  let codes = "Ganadas,Perdidas,Abandonadas,Puntuacion más alta";
  let htmlCode = "<div class='flex-row'><img id='backToBase' src='./resources/back-arrow.png' alt='back'><div id='header-cookie' class='flex-column center f-w'><span class='test' >ESTADISTICAS DE ["+ event.target.id.split(",")[0].split("[")[1] + "," + event.target.id.split(",")[0].split("[")[1] + "]</span></div></div>";
  for(let i = 0; i < codes.split(",").length; i++){
    //console.log(codes.split(",")[i]);
    htmlCode += "<div class='cookie-unfold m-top flex-column center'><span class='test flex-colum center'>" + codes.split(",")[i] + " = " + localStorage.getItem(event.target.id.split(",")[0].split("[")[1] + "=" + codes.split(",")[i]) + "</span></div>";
  }
  document.getElementById("cookies").innerHTML = htmlCode;
  document.getElementById("backToBase").addEventListener("click", function(){
    setUpCookies();
    loadStorage();
  });
}

/* cosas del css para que no quede tan feo arriba, quita algunas clases para que se vea mejor */
function setUpUnfold(){
  document.getElementById("cookies").classList.remove("flex-row");
  document.getElementById("cookies").classList.remove("center");
  document.getElementById("cookies").classList.remove("space-evenly");
  document.getElementById("cookies").classList.add("flex-column");
}

/*lo mismo */
function setUpCookies(){
  document.getElementById("cookies").classList.add("flex-row");
  document.getElementById("cookies").classList.add("center");
  document.getElementById("cookies").classList.add("space-evenly");
  document.getElementById("cookies").classList.remove("flex-column");
}