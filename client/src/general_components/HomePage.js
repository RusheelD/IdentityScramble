import React, { useState } from "react";
import { useHistory } from "react-router";
import axiosConfig from "../configs/axiosconfigs";
import whiteLogo from "../images/white_logo_3.png";
import blackFooter from "../images/dark.png";
import styled from "styled-components";

const HomePage = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  let generateLobbyCode = () => {
    let code = "";
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 1; i <= 5; i++) {
      code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return code;
  };

  let enterLobbyCode = (e) => {
    const newCode = e.target.value.toUpperCase();
    setCode(newCode);

    if (newCode.length == 5) {
      axiosConfig
        .post(`/${newCode}/user`, {
          name: name,
        })
        .then((res) => res.json)
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          const location = {
            pathname: `${newCode}/player`,
            state: {
              name: name,
              lobby: newCode,
            },
          };

          history.push(location);
        });
    }
  };

  let createLobby = (e) => {
    e.preventDefault();
    const code = generateLobbyCode();

    axiosConfig
      .post(`/${code}/user`, {
        name: name,
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        const location = {
          pathname: `${code}/host`,
          state: {
            name: name,
            lobby: code,
          },
        };
        history.push(location);
      });
  };

  const sectionStyle = {
    backgroundImage: `url(${blackFooter})`,
    width: 440,
    marginBottom: 20,
  };

  return (
    <div class="position-relative">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm pt-lg-10 float-none text-center mt-lg-3">

          <form>
            <div class="form-group w-80 text-center m-auto float-none mb-4">
              <input
                type="text"
                class="form-control fs-4"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                id="example"
                aria-describedby="emailHelp"
                placeholder="ENTER THE CODE"
              />
            </div>
            <div class="form-group w-80 text-center m-auto float-none mb-4">
              <input
                type="text"
                class="form-control fs-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="example2"
                aria-describedby="emailHelp"
                placeholder="ENTER YOUR NAME"
              />
            </div>
            <div className="pt-4 mt-3 ">
              <button
                class="text-center btn btn-primary w-50 fs-2"
                onClick={(e) => createLobby(e)}
              >
                PLAY
              </button>
            </div>
            {/*<img
              src={whiteLogo}
              alt="..."
              class="img m-auto float-none mb-3"
              width="150"
  /> */}

          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  );
};

export default HomePage;
