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
  tauler.elements.zombies = ((total * 25) / 100);
  tauler.elements.estrellas = taulerh;
  tauler.elements.doblePunts = Math.floor(((total * 25) / 100)/3);
  tauler.elements.meitatZombies = Math.floor((((total * 25) / 100)/3)/2);
  tauler.elements.vidaExtra = Math.floor((((total * 25) / 100)/3)/3);

  for(let y = 0; y < taulerh; y++){
    tauler.matriu[y] = new Array();
    for(let x = 0; x < taulerw; x++){
      tauler.matriu[y][x] = GESP_T;
    }
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
      doblePunts:0,
      meitatZombies:0,
      vidaExtra:0
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


