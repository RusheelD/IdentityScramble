import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import ListPlayers from "../medium_components/ListPlayers";
import axiosConfig from "../configs/axiosconfigs";

const Lobby = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { lobby } = state;

  console.log(lobby);

  {/*useEffect(() => {
    const interval = setInterval(() => {
      console.log("testing");

      {/*axiosConfig
        .get(`/${lobby}/embeddedLink`)
        .then((link) => {
          console.log(link.data);
          setEmbeddedLink(link.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 200);

    return () => clearInterval(interval);
  });
  */}

  return (
    <div className="text-center">
      <h5 className="text-white pt-5">Lobby Code:</h5>
      <h1 className="text-white mb-5">{id}</h1>
      <div class="row pt-lg-4"></div>

      <div className="fixed-bottom mb-5">
        <ListPlayers />
      </div>
    </div>
  );
};

export default Lobby;
