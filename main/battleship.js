console.log("js loaded");
// Example Class
class Player {
  contructor(name) {
    this.name = name; //player or computer

    this.grid = {
      // grid creation here
      xAxis: ['a','b','c','d','e','f','g','h','i'],
      yAxis: [1,2,3,4,5,6,7,8,9]
    };

    this.ships = [
      (submarine = {
        length: 3,
        hitPoints: 3,
      }),
      (cruiser = {
        length: 3,
        hitPoints: 3,
      }),
      (battleship = {
        length: 4,
        hitPoints: 4,
      }),
      (carrier = {
        length: 5,
        hitPoints: 5,
      }),
    ];
  }
}
