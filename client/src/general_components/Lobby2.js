import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import ListPlayers from "../medium_components/ListPlayers";
import axiosConfig from "../configs/axiosconfigs";

const Lobby = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { lobby } = state;

  const [question, setQuestion] = useState("");

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
    <div class="w-100 container-max vh-100 d-flex flex-column flex-grow-1">
      <div class="vh-100">
        <div className="text-center">
          <h5 className="text-white pt-5">Lobby Code:</h5>
          <h1 className="text-white mb-5">{id}</h1>
          <div className="container bg-danger"></div>
          <div className="fixed-bottom mb-5">
            <ListPlayers />
          </div>
          <div className=".align-middle pt-5 vh-100">
            <div className=".align-middle pt-5 vh-100">
              <div className="align-middle pt-5 input-group-lg vh-100">
                <div class="row d-flex justify-content-center container-full h-15 input-group-lg">

                  <textarea
                    type="text"
                    class="form-control fs-4 w-50 h-1000 font-monospace"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    id="example2"
                    aria-describedby="emailHelp"
                    placeholder="WHAT IS ONE OF YOUR FAVORITE _________?"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
