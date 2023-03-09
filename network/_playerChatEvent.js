module.exports = (server, socket, data) => {
  let id = socket.id;
  let player = server.players.get(id);
  let message = `${player.name} ${data}`
  console.log(message);
  socket.broadcast.emit("PlayerSendChatEvent", socket.id, message);
};
