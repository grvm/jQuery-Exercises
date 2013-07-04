function User(name,age){
  this.name = name;
  this.age = parseInt(age);

  this.compare = function(user){
    if(this.age > user.age){
      return(this.name+' is older than '+user.name)
    }else if(this.age < user.age){
      return(user.name+' is older than '+this.name)
    }else{
      return(user.name+' and '+this.name+' are of the same age.')
    }
  }
}