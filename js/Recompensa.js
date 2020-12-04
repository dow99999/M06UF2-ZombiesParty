var Recompensa = function(name){
    var nom = name;
    //getters/setters van aqui siempre

    this.getNom = function(){
      return nom;
    }
  }

Recompensa.prototype = Object.create(Elemento.prototype); //se copia el prototipo del padre (metodos, variables..)
Recompensa.prototype.constructor = Recompensa; //redirigimos el constructor del padre al hijo
