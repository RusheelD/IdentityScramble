import './App.css';
import React from "react";
import io from "socket.io-client";

import { useEffect, useState } from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Lobby from "./pages/Lobby/Lobby";

const socket = io();

function App() {

    const [isConnected, setIsConnected] = useState(socket.connected);
    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        })

        socket.on('disconnect', () => {
            setIsConnected(false);
        })

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        }

    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home
                        socket={socket}
                        isConnected={isConnected}
                    />} />
                    <Route path="/index" element={<Navigate replace to="/" />} />
                    <Route path="/lobby" element={<Lobby
                        socket={socket}
                        isConnected={isConnected}
                    />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
