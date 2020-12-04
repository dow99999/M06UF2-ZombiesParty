window.onload = function(){

  //PADRE
  //todo lo que haya aqui se duplica por cada objeto
  var U = function(name){
    var nom = name;
    //getters/setters van aqui siempre

    this.getNom = function(){
      return nom;
    }
  }

  //otros metodos no set/get |-> No se duplica por cada objeto, solo un codigo por clase
  U.prototype.mostrar = function(){
      return "mi nombre es " + this.getNom();
  }

  //HIJO
  var Gos = function(name, patas){
    U.apply(this, arguments); // como -> super(args)
    this.patas = patas;
  }
  //como -> extend
  Gos.prototype = Object.create(U.prototype); //se copia el prototipo del padre (metodos, variables..)
  Gos.prototype.constructor = Gos; //redirigimos el constructor del padre al hijo

  //metodos no get/set
  Gos.prototype.presentarse = function(){
    return this.mostrar() + " y tengo " + this.patas + " patas";
  }


  //NIETO
  var GosZombie = function(name, patas, color){
    Gos.apply(this, arguments);
    this.color = color;
  }
  
  GosZombie.prototype = Object.create(Gos.prototype); //se copia el prototipo del padre (metodos, variables..)
  GosZombie.prototype.constructor = GosZombie; //redirigimos el constructor del padre al hijo

  GosZombie.prototype.parlar = function(){
    return "hoOolAAaa.. soOoy UUunn peeEErroooooo dee coloOor " + this.color;
  }



  let hehe = new GosZombie("Bobo", "3", "verde");

  console.log(hehe.mostrar());
  console.log(hehe.presentarse());
  console.log(hehe.parlar());

}