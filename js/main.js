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

var index = 0;
var posicioSeleccionada = "";

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

  for(let y = 0; y < taulerh; y++){
    tauler.matriu[y] = new Array();
    tauler.mapa[y] = new Array(); 
    for(let x = 0; x < taulerw; x++){
      tauler.matriu[y][x] = GESP_T;
      tauler.mapa[y][x] = GESP_T;
    }
  }

  //console.log(tauler.elements);

  //TODO generar objetos dentro de la matriz segun los elementos de la tabla vida extra
  //TODO meter lo de abajo en funciones

  for(let i = 0; i < tauler.elements.vidaExtra; i++){
    let aux_x;
    let aux_y;
    let vertical = (Math.random() * 2 < 1);
    let cabe = false;

    do {
      aux_x = Math.floor(Math.random() * taulerw);
      aux_y = Math.floor(Math.random() * taulerh);

      if(vertical){
        if(isInside(aux_x, aux_y - 1, taulerw, taulerh) && isInside(aux_x, aux_y + 1, taulerw, taulerh))
          cabe = tauler.matriu[aux_y - 1][aux_x] == GESP_T && tauler.matriu[aux_y][aux_x] == GESP_T && tauler.matriu[aux_y + 1][aux_x] == GESP_T;
      } else {
        if(isInside(aux_x - 1, aux_y, taulerw, taulerh) && isInside(aux_x + 1, aux_y, taulerw, taulerh))
          cabe = tauler.matriu[aux_y][aux_x - 1] == GESP_T && tauler.matriu[aux_y][aux_x] == GESP_T && tauler.matriu[aux_y][aux_x + 1] == GESP_T;
      }
      
    } while(!cabe);

      tauler.objects.vidaExtra.push(
        new VidaExtra(
          vertical ? [aux_x, aux_x, aux_x] : [aux_x - 1, aux_x, aux_x + 1],
          vertical ? [aux_y - 1, aux_y, aux_y + 1] : [aux_y, aux_y, aux_y],
          null,
          [false, false, false],
          VIDA_T
        )
      );
      updateTaulerMatrix(tauler);
  }

//TODO generar objetos dentro de la matriz segun los elementos de la tabla meitatZombies

  for(let i = 0; i < tauler.elements.meitatZombies; i++){

    let aux_x;
    let aux_y;
    let vertical = (Math.random() * 2 < 1);
    let cabe = false;

    do {
      aux_x = Math.floor(Math.random() * taulerw);
      aux_y = Math.floor(Math.random() * taulerh);

      if(vertical){
        if(isInside(aux_x, aux_y - 1, taulerw, taulerh))
          cabe = tauler.matriu[aux_y - 1][aux_x] == GESP_T && tauler.matriu[aux_y][aux_x] == GESP_T;
      } else {
        if(isInside(aux_x - 1, aux_y, taulerw, taulerh))
          cabe = tauler.matriu[aux_y][aux_x - 1] == GESP_T && tauler.matriu[aux_y][aux_x] == GESP_T;
      }
      
    } while(!cabe);

    tauler.objects.meitatZombies.push( 
      new MeitatZombis(
        vertical ? [aux_x, aux_x] : [aux_x - 1, aux_x],
        vertical ? [aux_y - 1, aux_y] : [aux_y, aux_y],
        null,
        [false, false],
        MITAD_T
      )
    );
    updateTaulerMatrix(tauler);
  }

//  for(let i = 0; i < tauler.elements.vidaExtra; i++){
//
//  }

  generarTipo("zombies",tauler);
  generarTipo("estrellas", tauler);
  generarTipo("doblePunts", tauler);

  initEventListener(tauler);

  }


// generar entidades de una casilla 
function generarTipo(tipo, tauler){
  for(let i = 0; i < tauler.elements[tipo]; i++){

    let aux_x;
    let aux_y;
    let cabe = false;

    do {
      aux_x = Math.floor(Math.random() * tauler.w);
      aux_y = Math.floor(Math.random() * tauler.h);
      
      cabe = tauler.matriu[aux_y][aux_x] == GESP_T;
      
    } while(!cabe);
    
    //x, y, img, muestra, id
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

    //console.log(novaEntitat.getPosX() + " - " + novaEntitat.getPosY());
    tauler.objects[tipo].push( 
      novaEntitat
    );

    updateTaulerMatrix(tauler);
  }
  //console.log(tauler.objects);
}


/**
 * Procedimiento que muestra escribe los objetos del tablero dentro de su matriz
 * @param {Tauler} tauler 
 */
function updateTaulerMatrix(tauler){
  for(let obj in tauler.objects){
    //console.log("o: " + obj);
    for(let entity in tauler.objects[obj]){
      
      //console.log("e: " + tauler.objects[obj][entity].getPosX()[0]);
      for(let i = 0; i < tauler.objects[obj][entity].getPosX().length; i++){
        
        //console.log(tauler.objects[obj][entity].getId());
        let posY = tauler.objects[obj][entity].getPosY()[i];
        let posX = tauler.objects[obj][entity].getPosX()[i];
        tauler.mapa[posY][posX] = tauler.objects[obj][entity]; 
        tauler.matriu[posY][posX] =
            (tauler.objects[obj][entity].getDestapat()[i]) ? tauler.objects[obj][entity].getId().toUpperCase() : tauler.objects[obj][entity].getId();
      }
    }
  }
}

//Inicializar los listeners de cada caja en el tauler  
function initEventListener(tauler){
  document.getElementById("gameDisplay").innerHTML = tauler.printHTML();

  let elements = document.getElementsByClassName("board");
  for(let i = 0; i < elements.length; i++){
    console.log(elements[i]);
    elements[i].addEventListener("click", function(event){
      let x = event.currentTarget.id.split(",")[0];
      let y = event.currentTarget.id.split(",")[1]
      cercarObj(x,y);
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
          aux += this.matriu[y][x];
        }
        aux += "\n";
      }

      return aux;
    },
    printHTML:function(){
      let clase ="";
      if(this.h < 16 && this.h > 7) clase = "normal";
      if(this.h >= 16) clase = "min";
      if(this.h <= 7) clase = "max";
      let aux = "<div class='flex-column center" + clase + "'>";
      
      for(let y = 0; y < this.h; y++){
        aux += "<div class='flex-row'>";
        for(let x = 0; x < this.w; x++){
          //console.log(this.mapa[y][x]);
          aux += "<div id='" + x +"," + y +"' class='flex-column center board " + clase + "'>" + ((this.mapa[y][x] != "g" && this.mapa[y][x] != "G") ? this.mapa[y][x].getFrame() : (this.mapa[y][x] == "g") ? "<img class='grass' src='./resources/grass.png' alt='grass'>" : "<img class='grass' src='./resources/grass.png' alt='grass'>")  + "</div>";
        }
        aux += "</div>";
      }

      aux += "</div>";

      return aux;      
    }

  };

  initTauler(tauler.h, tauler.w, tauler);
  actualitzarVides(tauler.vida);
  document.getElementById("puntuacio").innerHTML = tauler.puntuacio;

  let final = false;
  let jocIniciat = setInterval(function(){

    if(posicioSeleccionada == "abandonar") final = true;

    if(posicioSeleccionada != "" && !final){
      //console.log(posicioSeleccionada);
      let posX = posicioSeleccionada.split(",")[0];
      let posY = posicioSeleccionada.split(",")[1];
      //console.log(tauler.mapa[posY][posX].getDestapat());
      /*TODO hay que poner mas funciones y eso de momento estoy probando a ver que tal se verian las animaciones, el reset de las vidas esta off asi que nunca mueres,
       * para volver a activarlo solo quita el comentario de abajo */
      if(tauler.mapa[posY][posX] instanceof Zombi) {
        tauler.mapa[posY][posX].setDestapat([true]);
        console.log(tauler.mapa[posY][posX].getDestapat());
        tauler.mapa[posY][posX].interactuar(tauler);
        document.getElementById(posX + "," + posY).classList.add("destapat");
        actualitzarElement(posX,posY, tauler);
      } else {
        document.getElementById(posX + "," + posY).classList.add("grass-destapat");
      }
      actualitzarVides(tauler.vida);
      //if(tauler.vida == 0) final = true;
      posicioSeleccionada = "";
    } 

    if(final) {
      posicioSeleccionada = "";
      reiniciarPartida();
      clearInterval(jocIniciat);
    };
  }, 50);
  
}

/* reiniciar partida */
function reiniciarPartida(){
  document.getElementById("submit").innerHTML = "EMPEZAR";
  document.getElementById("abandonar").style.display = "none";
  document.getElementById("gameDisplay").innerHTML = "";
  document.getElementById("confSize").style.display = "flex";
  document.getElementById("gameControls").style.display = "none";
  document.getElementById("inputSize").value = "";
  afeguirText("errortxt", "Partida reiniciada.");
  actualitzarVides(3);
  actualitzarPuntuacio(0);
  index = 0;
}

/* pruebas */
function actualitzarElement(x,y,tauler){
  document.getElementById(x + "," + y).innerHTML = "";

  setTimeout(function(){
    console.log("primera");
    document.getElementById(x + "," + y).innerHTML = tauler.mapa[y][x].getFrame()[0];
  },100);

  setTimeout(function(){
    console.log("segunda");
    document.getElementById(x + "," + y).innerHTML = tauler.mapa[y][x].getFrame()[1];
  },1100);

  setTimeout(function(){
    console.log("Tercera");
    document.getElementById(x +"," + y).innerHTML = tauler.mapa[y][x].getFrame()[2];
  },3100);
}

/* Actualiza la puntuacion*/
function actualitzarPuntuacio(punt){
  document.getElementById("puntuacio").innerHTML = punt;
}

/* Actualitza las vidas que se muestran en funcion de la vida maxima y la actual */
function actualitzarVides(current){
  let vidas = "";
  for(let i = 0; i < (VIDA_MAX - current); i++){
    vidas += "<img alt='corazon' src='./resources/heart-black-2.png'>";
  }
  
  for(let i = 0; i < current; i++){
    vidas += "<img alt='corazon' src='./resources/heart.png'>";
  }

  document.getElementById("vida").innerHTML = vidas;
}

function main(){
  afeguirText("errortxt", "");
  document.getElementById("abandonar").style.display = "inline";
  document.getElementById("confSize").style.display = "none";
  document.getElementById("gameControls").style.display = "flex";
  document.getElementById("submit").innerHTML = "INTRODUCIR";
  index = 1;
  joc();
}

/* 
* Busca el objecto en la matriz al que le has hecho click y ejecuta su funcion.
*
*/
function cercarObj(posX,posY){
  console.log(posY + "-" + posX);
  posicioSeleccionada = posX + "," + posY;
}

/*
* Devuelve un bool si los datos son correctos o no, acepta cualquier numero de argumentos
*/
function esCorrecte(){
  for(let i = 0; i < arguments.length; i++){
    if(arguments[i] == null || !arguments[i] instanceof Number || (arguments[i] < 5 || arguments[i] > 20)) return false;
  }
  return true;
}

window.onload = function(){
  let dictionary = [];
  dictionary[0] =  main;
  dictionary[1] =  cercarObj;
  actualitzarVides(3);
  window.document.getElementById("abandonar").addEventListener('click', function(){
    posicioSeleccionada = "abandonar";
  })
  window.document.getElementById("submit").addEventListener('click', function(){
    let size = document.getElementById("inputSize").value;
    if(esCorrecte(size)) dictionary[index]();
    else afeguirText("errortxt","El numero no és correcto. Introduce otro valor");
  });
  window.document.getElementById("inputX").addEventListener('input', function(event){
    verificarNumero(event) ? afeguirText("coordX", event.currenTarget.value) : afeguirText("coordY", "0");
  });
  window.document.getElementById("inputY").addEventListener('input', function(event){
    verificarNumero(event) ? afeguirText("coordY", event.currenTarget.value) : afeguirText("coordY", "0");
  });
}

/* afegueix un texte a una ID donada per parametre */
function afeguirText(id, value){
  document.getElementById(id).innerHTML =  value; 
}

/* verifica que el numero del input sigui un Number torna un boolean true si ho es*/
function verificarNumero(event){
  if(!Number.isInteger(Number.parseInt(event.currentTarget.value[event.currenTarget.value.length - 1])) || Number.parseInt(event.currenTarget.value) > 20) event.currenTarget.value = event.currenTarget.value.slice(0,-1);
  return Number.isInteger(Number.parseInt(event.currentTarget.value[event.currenTarget.value.length - 1]));
}


