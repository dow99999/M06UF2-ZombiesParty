var Estrellas = function(name){
    var nom = name;
    //getters/setters van aqui siempre

    this.getNom = function(){
      return nom;
    }
  }

Estrellas.prototype = Object.create(Recompensa.prototype); //se copia el prototipo del padre (metodos, variables..)
Estrellas.prototype.constructor = Estrellas; //redirigimos el constructor del padre al hijo
