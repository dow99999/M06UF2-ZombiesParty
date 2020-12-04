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
    h: 5,
    w: 5,
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
    }
  };

  initTauler(tauler.h, tauler.w, tauler);
}

function main(){
  joc();
}

window.onload = function(){
  main();
}
