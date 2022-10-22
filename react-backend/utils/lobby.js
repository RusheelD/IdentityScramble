var player = require('./player');

class Lobby {

    constructor(lobbyID, host) {
        this.lobbyID = lobbyID;
        this.host = host;
        this.members = {};
        this.membersList = [];
        this.addPlayer(host);
    }

    addPlayer(player) {
        this.members[player.playerID] = player;
        this.membersList.push(player.playerID);
    }

}

module.exports = {Lobby};