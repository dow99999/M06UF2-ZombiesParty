var DoblePunts = function(name){
    var nom = name;
    //getters/setters van aqui siempre

    this.getNom = function(){
      return nom;
    }
  }
  DoblePunts.prototype = Object.create(Recompensa.prototype); //se copia el prototipo del padre (metodos, variables..)
  DoblePunts.prototype.constructor = DoblePunts; //redirigimos el constructor del padre al hijo
