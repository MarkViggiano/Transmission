const ConnectionStatus = require("./_connectionStatus.js");
const Player = require("../entity/Player.js");

module.exports = (server, socket, data) => {
  console.log(`${data.name} has joined with id: ${socket.id}`);
  server.players.set(socket.id, new Player(data.x, data.y, null, data.width, data.height, data.speed, data.name));
  socket.emit("PlayerConnectionResponse", ConnectionStatus.GOOD, "testing")
};
