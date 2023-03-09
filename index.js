const express = require("express");
require('events').EventEmitter.defaultMaxListeners = 0;
const Player = require("./entity/Player.js");
const playerJoinEvent = require("./network/_playerJoinEvent.js");
const playerChatEvent = require("./network/_playerChatEvent.js");
const playerDisconnectEvent = require("./network/_playerDisconnectEvent.js");
const generateRoomId = require("./utils/_generateRoomId.js");
const ProgramState = require("./utils/_programState.js");
const STATE = ProgramState.DEVELOPMENT;

class Server {
  constructor() {
    this.app = express();
    this.http = require("http").Server(this.app);
    this.port = process.env.PORT || 8080;
    this.ioServer = require("socket.io")(this.http);
    this.players = new Map();
  }

  registerAppDetails() {
    //Insecure but the inputs are sql sanitized and we just return raw json...
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      next();
    });

    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    this.app.get("/", (req, res) => res.send("ok"));
  }

  registerSocketServer() {

    this.ioServer.on("connection", (socket) => {
      console.log(`[CONNECT] ${socket.id} :: ${generateRoomId()}`);
      socket.on("PlayerJoinEvent", (data) => playerJoinEvent(this, socket, data));
      socket.on("PlayerChatEvent", (data) => playerChatEvent(this, socket, data));
      socket.on("disconnect", () => playerDisconnectEvent(this, socket, null));
    })
  }

  async start() {
    this.registerAppDetails();
    this.http.listen(this.port, () => {
      console.log(`App is listening on port: ${this.port}`);
      this.registerSocketServer();
    })
  }

}

module.exports = Server;
