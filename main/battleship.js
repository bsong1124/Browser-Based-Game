console.log("js loaded");
// Example Class
class Player {
  contructor(name) {
    this.name = name; //player or computer

    this.grid = {
      // grid creation here
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
