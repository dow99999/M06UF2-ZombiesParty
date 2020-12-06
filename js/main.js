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
  for(let y = 0; y < taulerh; y++){
    tauler.matriu[y] = new Array();
    for(let x = 0; x < taulerw; x++){
      tauler.matriu[y][x] = GESP_T;
    }
  }
}

function joc(){
  let tauler = {
    h: document.getElementById("inputY").value,
    w: document.getElementById("inputX").value,
    matriu: [],
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
          aux += "<div id='" + x +"," + y +"'>" + this.matriu[y][x] + "</div>";
        }
        aux += "</div>";
      }

      aux += "</div>";

      return aux;      
    }

  };

  initTauler(tauler.h, tauler.w, tauler);
  document.getElementById("gameDisplay").innerHTML = tauler.printHTML();
}

function main(){
  document.getElementById("submit").innerHTML = "INTRODUIR";
  index = 1;
  joc();
}

function introduirPos(){
  alert("uwu");
}

window.onload = function(){
  var dictionary = [];
  dictionary[0] =  main;
  dictionary[1] =  introduirPos;
  window.document.getElementById("submit").addEventListener('click', function(){
    dictionary[index]();//esta feo bro, a la proxima suspendido
  });
}


