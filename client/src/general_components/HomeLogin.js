import React, { useState } from "react";
import { useHistory } from "react-router";
import axiosConfig from "../configs/axiosconfigs";

const HomePage = () => {
  const [code, setCode] = useState("");
  const [isHosting, updateIsHosting] = useState(true);
  const [name, setName] = useState("");
  const [isCodeValid, setValidCode] = useState(false);
  const history = useHistory();

  let generateLobbyCode = () => {
    let code = "";
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 1; i <= 4; i++) {
      code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return code;
  };

  let convertCodeToUpperCase = (e) => {
    const upperCaseCode = e ? e.toUpperCase() : "";
    setCode(upperCaseCode);
    setValidCode(upperCaseCode.length == 4);
    updateIsHosting(upperCaseCode.length == 0);
  }

  let enterOrHostLobby = (e) => {
    e.preventDefault();

    let lobbyCode = isHosting ? generateLobbyCode() : code;
    axiosConfig
      .post(`/${lobbyCode}/user`, {
        name: name,
        role: isHosting ? "host" : "player"
      }).then(() => {
        const location = {
          pathname: `${lobbyCode}/host`,
          state: {
            name: name,
            lobby: lobbyCode,
          },
        };
        history.push(location);
      });
  };

  return (
    <div class="row d-flex justify-content-center">
      <div class="col-sm mt-lg-5 d-flex justify-content-center"></div>
      <div class="col-sm pt-lg-5 float-none text-center mt-lg-3 ">

        <h1 class=" fs-1 font-monospace text-danger mb-5 pb-5"> Identity Scramble </h1>
        <form>
          <div class="form-group w-80 text-light text-center m-auto float-none mb-4">
          </div>
          <div class="form-group w-80 text-center m-auto float-none mb-4">
            <input
              type="text"
              class="form-control fs-5 fw-bold"
              value={code}
              onChange={(e) => convertCodeToUpperCase(e.target.value)}
              id="example"
              aria-describedby="emailHelp"
              placeholder="ENTER THE CODE"
            />
          </div>
          <div class="form-group w-80 text-center m-auto float-none mb-4">
            <input
              type="text"
              class="form-control fs-5 fw-bold"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="example2"
              aria-describedby="emailHelp"
              placeholder="ENTER YOUR NAME"
            />
          </div>
          <div className="pt-4 mt-3 ">
            <button
              class="text-center btn btn-secondary w-50 fw-bold fs-5 border border-light "
              onClick={(e) => enterOrHostLobby(e)}
              disabled={(name.length == 0) || (!isHosting && !isCodeValid)}
            >
              {isHosting ? "HOST" : "PLAY"}
            </button>
          </div>
          {/*<img
              src={whiteLogo}
              alt="..."
              class="img m-auto float-none mb-3"
              width="150"
  /> */}

        </form>
      </div >
      <div class="col-sm"></div>
    </div >
  );
};

export default HomePage;
