function VehicleConstructor(name,wheel_cnt,passenger_cnt,speed){
  if(!(this instanceof VehicleConstructor)){
    return new VehicleConstructor(name,wheel_cnt,passenger_cnt,speed);
  }
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //for creating VIN
  this.distance_traveled = 0;
  this.name = name;
  this.wheel_cnt = wheel_cnt;
  this.passenger_cnt = passenger_cnt;
  this.speed = speed;
  this.vin = createVin();

  function createVin(){
    var vin = "";
    for(var i=0; i<17; i++){
      vin += chars[Math.floor(Math.random()*36)];
    }
    return vin;
  }
}

VehicleConstructor.prototype.updateDistanceTraveled = function(){
  this.distance_traveled += this.speed;
}
VehicleConstructor.prototype.makeNoise = function(){
  console.log("beep beep");
}
VehicleConstructor.prototype.move = function(){
  this.updateDistanceTraveled();
  this.makeNoise();
  return this;
}
VehicleConstructor.prototype.checkMiles = function(){
  console.log("Distance traveled: "+this.distance_traveled);
}

var bike = new VehicleConstructor("bike",2,0,3);
bike.makeNoise = function(){
  console.log("ring ring!");
}
bike.move().checkMiles();

var sedan = new VehicleConstructor("Sedan",4,0,10);
sedan.makeNoise = function(){
  console.log("Honk Honk!");
}
sedan.move().checkMiles();

var bus = new VehicleConstructor("Bus",8,0,7);
bus.pickUpPassengers = function(add_passengers){
  this.passenger_cnt += add_passengers;
  return this;
}
bus.move().checkMiles();
