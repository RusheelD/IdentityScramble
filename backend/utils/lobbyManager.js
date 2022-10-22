var {Lobby} = require('./lobby');
var {Player} = require('./player');
var socketIO = require('socket.io');

class LobbyManager {

    constructor(socket) {
        this.lobbies = {};
        this.socket = socket;
        this.setupBasicSocket();
    }

    generateLobby(hostID) {

        let code = this.generateCode();
        while (code in this.lobbies) {
            code = this.generateCode();
        }

        let lobby = new Lobby(code, new Player(hostID));
        this.lobbies[code] = lobby;

        return code;

    }

    generateCode() {

        let code = "";
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 1; i <= 4; i++) {
            code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }

        return code;

    }

    setupBasicSocket() {

        // Client connects to socket
        this.socket.on('connection', (socket) => {

            // Host connects
            socket.on('host-join', (hostID) => {

                let code = this.generateLobby(hostID);

                // Add host to room
                socket.join(code);

                // Notify host about the new lobby
                socket.emit('host-create', code);

            });

            // Player connected
            socket.on('player-join', (playerID, code) => {

                if (code in this.lobbies) {

                    let lobby = this.lobbies[code];

                    if (playerID in lobby.members) {

                        // Notify client that player already exists
                        socket.emit('player-create', 'player exists');

                    } else {

                        lobby.addPlayer(new Player(playerID));

                        socket.join(code);

                        this.socket.to(code).emit('update-players', lobby.membersList);

                        // Notify client of success
                        socket.emit('player-create', lobby.membersList);

                    }

                } else {

                    // Notify client that the lobby doesn't exist
                    socket.emit('player-create', 'no lobby');

                }

            });

            // Client disconnects from socket

            socket.on('disconnect', () => {

                console.log('disconnected from server');

            })

        });

    }

}

module.exports = {LobbyManager};