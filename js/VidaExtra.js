var VidaExtra = function(name){
    var nom = name;
    //getters/setters van aqui siempre

    this.getNom = function(){
      return nom;
    }
  }

VidaExtra.prototype = Object.create(Recompensa.prototype); //se copia el prototipo del padre (metodos, variables..)
VidaExtra.prototype.constructor = VidaExtra; //redirigimos el constructor del padre al hijo
