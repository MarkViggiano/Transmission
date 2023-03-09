let Entity = require("./Entity.js");

class Player extends Entity {
  constructor(x, y, world, width, height, speed, name) {
    super(x, y, world, width, height, speed, name);
  }
}

module.exports = Player;
