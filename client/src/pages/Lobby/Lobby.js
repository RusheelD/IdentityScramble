import React from "react"
import "./Lobby.css";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const Lobby = ({
        socket,
        isConnected,
    }) => {

    const { lobbyCode, playerName, isHost, currentMembers} = useLocation().state;

    const [members, setMembers] = useState(currentMembers);

    useEffect(() => {

        socket.on('update-players', (players) => {
            setMembers(players);
        })

        return () => {
            socket.off('update-players');
        }

    }, [])

    return(
        <div className="lobby-box">
            <div className="lobby-header-text">
                <h4 className="lobby-text-line">Lobby Code:</h4>
                <h2 className="lobby-text-line">{lobbyCode}</h2>
            </div>
            {isHost &&
                <div className="start-buttons-box">
                    <button className="game-buttons start-game-button">Start Game</button>
                </div>
            }
            <div className="lobby-bottom-text footer">
                <h4 className="lobby-text-line">Players</h4>
                <div className="members-text-box">
                    {members.map((member, index) => (
                        <h6 className={member === playerName ? "current-text-line" : "members-text-line"}>{member}</h6>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Lobby;