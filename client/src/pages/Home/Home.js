import React from "react"
import "./Home.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = ({
        socket,
        isConnected
    }) => {

    const [name, setName] = useState("");
    const [nameDisabled, setNameDisabled] = useState(true);

    const [lobby, setLobby] = useState("");
    const [lobbyDisabled, setLobbyDisabled] = useState(true);

    const [joinMode, setJoinMode] = useState(false);

    const navigate = useNavigate();

    function handleName(e) {

        setNameDisabled(e.target.value === "");

        setName(e.target.value);

    }

    function handleLobbyCode(e) {

        setLobbyDisabled(e.target.value.length !== 4);

        setLobby(e.target.value.toUpperCase());

    }

    function joinGame(e) {

        e.preventDefault();

        // Tells server to join game
        if (isConnected) {
            socket.emit("player-join", name, lobby);

            // Response from server once lobby joined
            socket.on("player-create", (response) => {

                if (response === "no lobby") {
                    console.log("lobby doesn't exit");
                } else if (response === "player exists") {
                    console.log("player already exists");
                } else {
                    // Navigate to new lobby by passing state
                    navigate("/lobby", {state: {lobbyCode: lobby, playerName: name,
                            isHost: false, currentMembers: response}});
                }

            })

            return () => {
                socket.off("player-create");
            }

        }

    }

    function createGame(e) {

        e.preventDefault();

        // Tells server to create game
        if (isConnected) {
            socket.emit("host-join", name)

            // Response from server once lobby is created
            socket.on("host-create", (code) => {

                // Navigate to new lobby by passing state
                navigate("/lobby", {state: {lobbyCode: code, playerName: name,
                        isHost: true, currentMembers: [name]}});

            })

            return () => {
                socket.off("host-create");
            }

        }
    }

    return(
        <div className="home-box">
            <div className="home-header-text">
                <h1>Title</h1>
            </div>
            {!joinMode ?
                <div className="game-buttons-box set-name">
                    <input
                        type="text"
                        className="text-control game-buttons"
                        id="name-box"
                        value={name}
                        onChange={(e) => handleName(e)}
                        aria-describedby="nameText"
                        placeholder="Enter Name"
                        maxLength="12"
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                    />
                    <button className="game-buttons join-game-button"
                            onClick={(e) => setJoinMode(true)}
                            disabled={nameDisabled}
                    >Join Game
                    </button>
                    <button className="game-buttons create-game-button"
                            onClick={(e) => createGame(e)}
                            disabled={nameDisabled}
                    >Create Game
                    </button>
                </div>
                :
                <div className="game-buttons-box join-game">
                    <input
                        type="text"
                        className="text-control game-buttons"
                        id="lobby-code-box"
                        value={lobby}
                        onChange={(e) => handleLobbyCode(e)}
                        aria-describedby="lobbyCodeText"
                        placeholder="Enter Code"
                        maxLength="4"
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                    />
                    <button className="game-buttons join-game-button"
                            onClick={(e) => joinGame(e)}
                            disabled={lobbyDisabled}
                    >Join Game
                    </button>
                    <button className="game-buttons back-button"
                            onClick={(e) => setJoinMode(false)}
                    >Go Back
                    </button>
                </div>
            }
        </div>
    )

}

export default Home;