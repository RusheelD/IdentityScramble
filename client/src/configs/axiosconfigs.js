import axios from "axios";

const instance = axios.create({
  //baseURL: "https://mu-sync.herokuapp.com/",
  baseURL: "http://localhost:5600/",
});

export default instance;
