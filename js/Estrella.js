var Estrella = function(){
  
};

Estrella.prototype = Object.create(Elemento.prototype); //se copia el prototipo del padre (metodos, variables..)
Estrella.prototype.constructor = Estrella; //redirigimos el constructor del padre al hijo