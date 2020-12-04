var MeitatZombis = function(name){
    var nom = name;
    //getters/setters van aqui siempre

    this.getNom = function(){
      return nom;
    }
  }

MeitatZombis.prototype = Object.create(Recompensa.prototype); //se copia el prototipo del padre (metodos, variables..)
MeitatZombis.prototype.constructor = MeitatZombis; //redirigimos el constructor del padre al hijo
