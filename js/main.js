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

var index = 0;

/**
 * Procedimiento que inicializa la matriz del tablero con espacios 'vacios'
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

  for(let y = 0; y < taulerh; y++){
    tauler.matriu[y] = new Array();
    for(let x = 0; x < taulerw; x++){
      tauler.matriu[y][x] = GESP_T;
    }
  }

  console.log(tauler.elements);

  //TODO generar objetos dentro de la matriz segun los elementos de la tabla
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
        cabe = tauler.matriu[aux_y - 1][aux_x] == GESP_T && tauler.matriu[aux_y][aux_x] == GESP_T && tauler.matriu[aux_y + 1][aux_x] == GESP_T;
      } else {
        cabe = tauler.matriu[aux_y][aux_x - 1] == GESP_T && tauler.matriu[aux_y][aux_x] == GESP_T && tauler.matriu[aux_y][aux_x + 1] == GESP_T;
      }
      
    } while(!cabe);

    tauler.objects.vidaExtra = new VidaExtra(); //TODO meter las posiciones

  }

  for(let i = 0; i < tauler.elements.meitatZombies; i++){

    let aux_x;
    let aux_y;
    let vertical = (Math.random() * 2 < 1);
    let cabe = false;

    do {
      aux_x = Math.floor(Math.random() * taulerw);
      aux_y = Math.floor(Math.random() * taulerh);

      if(vertical){
        cabe = tauler.matriu[aux_y - 1][aux_x] == GESP_T && tauler.matriu[aux_y][aux_x] == GESP_T;
      } else {
        cabe = tauler.matriu[aux_y][aux_x - 1] == GESP_T && tauler.matriu[aux_y][aux_x] == GESP_T;
      }
      
    } while(!cabe);

    tauler.objects.meitatZombies = new MeitatZombis(); //TODO meter las posiciones

  }

  for(let i = 0; i < tauler.elements.vidaExtra; i++){

  }


  document.getElementById("gameDisplay").innerHTML = tauler.printHTML();

  let elements = document.getElementsByClassName("board");
  for(let i = 0; i < elements.length; i++){
    elements[i].addEventListener("click", function(event){
      let x = event.target.id.split(",")[0];
      let y = event.target.id.split(",")[1]
      introduirPos(x,y);
    });
  }
}

function joc(){
  let tauler = {
    h: document.getElementById("inputY").value,
    w: document.getElementById("inputX").value,
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
      vidaExtra: []
    },
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
      let aux = "<div class='flex-column center'>";
      
      for(let y = 0; y < this.h; y++){
        aux += "<div class='flex-row'>";
        for(let x = 0; x < this.w; x++){
          aux += "<div id='" + x +"," + y +"' class='board'>" + this.matriu[y][x] + "</div>";
        }
        aux += "</div>";
      }

      aux += "</div>";

      return aux;      
    }

  };

  initTauler(tauler.h, tauler.w, tauler);
}

function main(){
  document.getElementById("submit").innerHTML = "INTRODUCIR";
  index = 1;
  joc();
}

function introduirPos(x,y){
  alert(x +" - " + y);
}

/*
* Devuelve un bool si los datos son correctos o no
*/
function esCorrecte(x,y){
  if( (x || y) == null) return false;
  if(!x instanceof Number || !y instanceof Number) return false;
  if((x < 5 || x > 20) || (y < 5 || y > 20) || x != y) return false;
  return true;
}

function errorMissatge(missatge){
  document.getElementById("errortxt").innerHTML = missatge;
}

window.onload = function(){
  var dictionary = [];
  dictionary[0] =  main;
  dictionary[1] =  introduirPos;
  window.document.getElementById("submit").addEventListener('click', function(){
    let x = document.getElementById("inputX").value;
    let y = document.getElementById("inputY").value;
    if(esCorrecte(x,y)) dictionary[index]();
    else errorMissatge("Bro la lias");
  });
}


