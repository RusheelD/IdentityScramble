import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import ListPlayers from "../medium_components/ListPlayers";
import axiosConfig from "../configs/axiosconfigs";

const Lobby = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { lobby } = state;

  const [choice, setChoice] = useState(0);
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
                <div class="row justify-content-center container-max h-15 w-60">
                  <h1 class="text-info fs-3 p-4">Which animal do you prefer?</h1>
                  <input
                    type="text"
                    disabled="true"
                    class="form-control bg-primary fs-4 w-25 p-4 m-2 text-center text-light font-monospace"
                    value="PANDAS"
                    id="example2"
                    aria-describedby="emailHelp"
                  />
                  <input
                    type="text"
                    disabled="true"
                    onClick={console.log("dadf")}
                    class="form-control fs-4 w-25 p-4 m-2 text-center font-monospace"
                    value="LIONS"
                    id="example2"
                    aria-describedby="emailHelp"
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
