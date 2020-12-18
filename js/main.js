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

var index = 1;
var posicioSeleccionada = "";
var clase ="";

var waitingFunction;
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
      tauler.updateTaulerMatrix();
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
    tauler.updateTaulerMatrix();
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

    tauler.updateTaulerMatrix();
  }
  //console.log(tauler.objects);
}

//Inicializar los listeners de cada caja en el tauler  
function initEventListener(tauler){
  document.getElementById("gameDisplay").innerHTML = tauler.printHTML();
  let elements = document.getElementsByClassName("mob");
  for(let i = 0; i < elements.length; i++){
    elements[i].classList.add(clase);
  }

  elements = document.getElementsByClassName("board");
  for(let i = 0; i < elements.length; i++){
    console.log(elements[i]);
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
      let aux = "<div class='flex-column center " + clase + "'>";
      
      for(let y = 0; y < this.h; y++){
        aux += "<div class='flex-row'>";
        for(let x = 0; x < this.w; x++){
          //console.log(this.mapa[y][x]);
          aux += "<div id='" + x +"," + y +"' class='flex-column center board " + clase + "'>" + ((this.mapa[y][x] != "g" && this.mapa[y][x] != "G") ? this.mapa[y][x].getFrame() : (this.mapa[y][x] == "g") ? "<img class='grass "+ clase +"' src='./resources/grass.png' alt='grass'>" : "<img class='grass "+ clase +"' src='./resources/grass.png' alt='grass'>")  + "</div>";
        }
        aux += "</div>";
      }

      aux += "</div>";

      return aux;      
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

  console.log(tauler.print() + "\n vidas: " + tauler.vida + "\n puntos: " + tauler.puntuacio + " \n estrellas: " + tauler.estrelles + "/" + tauler.elements.estrellas);

  document.getElementById("puntuacio").innerHTML = tauler.puntuacio;

  let final = false;
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
      } else
      if(tauler.mapa[posY][posX] instanceof Estrella) {
        tauler.mapa[posY][posX].interactuar(tauler);
        document.getElementById(posX + "," + posY).classList.add("destapat");
        tauler.mapa[posY][posX].moviment(posX,posY, clase);
        document.getElementById(posX + "," + posY).childNodes[0].classList.add(clase);
      } else
      if(tauler.mapa[posY][posX] instanceof MeitatZombis) {
        tauler.mapa[posY][posX].interactuar(posX, posY, tauler);
        document.getElementById(posX + "," + posY).classList.add("destapat");
        tauler.mapa[posY][posX].moviment(posX, posY, clase);
        document.getElementById(posX + "," + posY).childNodes[0].classList.add(decidirClase("calavera",clase));
        //actualitzarElement(posX,posY, tauler);
      } else
      if(tauler.mapa[posY][posX] instanceof VidaExtra) {
        tauler.mapa[posY][posX].interactua(posX, posY, tauler); //por algun motivo si se llama interactuar no va pero si se llama interactua si
        document.getElementById(posX + "," + posY).classList.add("destapat");
        tauler.mapa[posY][posX].moviment(posX, posY, clase);
        document.getElementById(posX + "," + posY).childNodes[0].classList.add(decidirClase("doblePuntuacio",clase));
        //actualitzarElement(posX,posY, tauler);
      } else
      if(tauler.mapa[posY][posX] instanceof DoblePunts) {
        tauler.mapa[posY][posX].interactuar(posX, posY, tauler);
        document.getElementById(posX + "," + posY).classList.add("destapat");
        tauler.mapa[posY][posX].moviment(posX, posY, clase);

        document.getElementById(posX + "," + posY).childNodes[0].classList.add(clase);
        //actualitzarElement(posX,posY, tauler);
      } else {
        document.getElementById(posX + "," + posY).classList.add("grass-destapat");
        tauler.matriu[posY][posX] = GESP_D;
        tauler.puntuacio += 50;
        //tauler.mapa[posY][posX].setDestapat([true]);
      }
      actualitzarVides(tauler.vida);
      actualitzarPuntuacio(tauler.puntuacio);
      //if(tauler.vida == 0) final = true;
      posicioSeleccionada = "";
      tauler.updateTaulerMatrix();
      console.log(tauler.print() + "\n vidas: " + tauler.vida + "\n puntos: " + tauler.puntuacio + " \n estrellas: " + tauler.estrelles + "/" + tauler.elements.estrellas);
    }

    if(final) {
      posicioSeleccionada = "";
      reiniciarPartida();
      clearInterval(jocIniciat);
      //clearInterval(waitingFunction);
    };
  }, 50);
  
}

function decidirClase(tipo, clase){
  let base = "";
  base = clase + "-" + tipo;
  console.log(base);  
  return base;
}

/* reiniciar partida */
function reiniciarPartida(){
  document.getElementById("submit").innerHTML = "EMPEZAR";
  document.getElementById("abandonar").style.display = "none";
  document.getElementById("gameDisplay").innerHTML = "<img class='demon' src='./resources/demon/demon-idle.gif' alt='waiting'>";
  //waitingFunction = setInterval(esperantAlUsuari, 1000);
  document.getElementById("confSize").style.display = "flex";
  document.getElementById("gameControls").style.display = "none";
  document.getElementById("inputSize").value = "";
  afeguirText("errortxt", "Partida reiniciada.");
  actualitzarVides(3);
  actualitzarPuntuacio(0);
  index = 1;
}
/* Actualiza la puntuacion*/
function actualitzarPuntuacio(punt){
  document.getElementById("puntuacio").innerHTML = punt;
}

/* Actualitza las vidas que se muestran en funcion de la vida maxima y la actual */
function actualitzarVides(current){
  document.getElementById("vida").innerHTML = "";
  let vidas = "";
  let boost = 0;
  if(VIDA_MAX < current){
    boost = current - VIDA_MAX;
  }

  for(let i = 0; i < ( (VIDA_MAX + boost) - current); i++){
    vidas = "<img id='vida"+ i +"' alt='corazon-roto' src='./resources/heart/broken-heart.gif'>";
    document.getElementById("vida").innerHTML = document.getElementById("vida").innerHTML + vidas; 
    setTimeout(function(){
      console.log(i);
      console.log(document.getElementById("vida" + i));
      document.getElementById("vida" + i).src = "./resources/heart/heart-4.png";
    },300);
  }
  
  for(let i = 0; i < current; i++){
    vidas = "<img alt='corazon' src='./resources/heart/heart.png'>";
    document.getElementById("vida").innerHTML += vidas;
    console.log(document.getElementById("vida").innerHTML);
  }
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
  console.log(posY + "-" + posX);
  posicioSeleccionada = (posX-1) + "," + (posY-1);
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
      console.log("hello");
    }
  });

  window.document.getElementById("inputX").addEventListener("keyup", function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      if(document.getElementById("inputX").value != null && document.getElementById("inputY").value != null)document.getElementById("submit").click();
      console.log("hello");
    }
  });

  window.document.getElementById("inputY").addEventListener("keyup", function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      if(document.getElementById("inputX").value != null && document.getElementById("inputY").value != null)document.getElementById("submit").click();
      console.log("hello");
    }
  });

  window.document.getElementById("submit").addEventListener('click', function(){
    let size = document.getElementById("inputSize").value;
    let x = document.getElementById("inputX").value;
    let y = document.getElementById("inputY").value;
    
    if(verificarNumero(size, (5 * index))) dictionary[index](x, y);
    else afeguirText("errortxt","El numero no és correcto. Introduce otro valor");
  });
  window.document.getElementById("inputX").addEventListener('input', function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      document.getElementById("inputX").click();
    }
    verificarNumero(event.target.value, 0) ? afeguirText("coordX", event.target.value) : afeguirText("coordX", "0");
  });
  window.document.getElementById("inputY").addEventListener('input', function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      document.getElementById("inputX").click();
    }
    verificarNumero(event.target.value, 0) ? afeguirText("coordY", event.target.value) : afeguirText("coordY", "0");
  });
  window.document.getElementById("creditos").addEventListener('click', loadCredits);
}

/* afegueix un texte a una ID donada per parametre */
function afeguirText(id, value){ 
  if(document.getElementById(id)!=null)
    document.getElementById(id).innerHTML =  value; 
}

/* verifica que el numero del input sigui un Number torna un boolean true si ho es*/
function verificarNumero(value, min){
  if(!Number.isInteger(Number.parseInt(value[value.length - 1])) || Number.parseInt(value) > 20 || Number.parseInt(value) < min) value = value.slice(0,-1);
  return Number.isInteger(Number.parseInt(value[value.length - 1]));
}

/* carga las cookies o las crea */
function loadStorage(){
  document.getElementById("cookies").innerHTML = "";
  let htmlCode = "";
  let codes = "ganadas,perdidas,abandonadas";
  for(let i = 5; i < 21; i++){
    htmlCode = "<div class='cookie-container flex-column center'><span id='cookie[" + i + "," + i +"]' class='test'>["+ i + "," + i + "]</span></div>";
    document.getElementById("cookies").innerHTML = document.getElementById("cookies").innerHTML + htmlCode;
    document.getElementById("cookie[" +i + "," + i + "]").addEventListener("click", loadCookie);
    for(let z = 0; z < codes.split(",").length; z++){
      if(localStorage.getItem(i) == null) localStorage.setItem(i + "=" + codes.split(",")[z], 0);
    }
  }

  for(let i = 5; i < 21; i++){
    document.getElementById("cookie[" +i + "," + i + "]").addEventListener("click", loadCookie);
  }
  
}

/* guarda la cookie correspondiente */
function updateCookie(x){
  let currentGame = document.getElementById("size").value;
  localStorage.setItem(currentGame + "=" + x, localStorage.getItem(currentGame + "=" + x)++);
}

function loadCredits(){
  let htmlCode = "<div id='backToBase' class='flex-row flex-start credit-header'><img src='./resources/back-arrow.png' alt='back'><div id='header-cookie' class='flex-column center f-w'><span class='test' >CREDITOS</span></div></div>";
  htmlCode += "<span class='test' >GAME DIRECTOR & LEVEL DESIGNER</span>";
  htmlCode += "<span class='test'>Diego Muñoz & Oriol Fornos</span>";
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
  let codes = "ganadas,perdidas,abandonadas";
  let htmlCode = "<div id='backToBase' class='flex-row'><img src='./resources/back-arrow.png' alt='back'><div id='header-cookie' class='flex-column center f-w'><span class='test' >ESTADISTICAS DE ["+ event.target.id.split(",")[0].split("[")[1] + "," + event.target.id.split(",")[0].split("[")[1] + "]</span></div></div>";
  for(let i = 0; i < codes.split(",").length; i++){
    console.log(codes.split(",")[i]);
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