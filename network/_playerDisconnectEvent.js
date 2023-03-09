module.exports = (server, socket, data) => {

  console.log(`[DISCONNECT] ${socket.id}`);

  // TODO: Properly log user disconnecting and remove them from the player cache
  //let id = socket.id;
  //let player = server.players.get(id);
  //console.log(`${player.name} has disconnected with id: ${id}`);
  //server.players.delete(id);
};
