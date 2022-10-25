const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT | 5600;
const env = require("dotenv");
const monk = require("monk");

env.config();

//Connect to monk database
const localDataBase = `localhost/database`;
let db = monk(process.env.MONGODB_DATABASE || localDataBase);
console.log("Connected to " + db._connectionURI);

//Middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());
db.addMiddleware(require("monk-middleware-wrap-non-dollar-update"));

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //support encoded bodies

//insert user into a lobby's database collection
app.post("/:lobby/user", (req, res) => {
  const name = req.body.name;
  const role = req.body.role;
  const room = db.get(req.params.lobby);

  room
    .insert({ name: name, role: role, points: 0 })
    .then((doc) => res.json(doc))
    .then(() => console.log(`${name} successfuly joined ${req.params.lobby}`))
});

//get all users
app.get("/:lobby/users", (req, res) => {
  const room = db.get(req.params.lobby);
  room
    .find({})
    .then((users) => res.json(users))
    .catch((err) => console.log(err.message));
});

//conductor has begun recording
app.put("/:lobby/beginRecording", (req, res) => {
  const room = db.get(req.params.lobby);
  room
    .findOneAndUpdate(
      { name: req.body.name },
      { $set: { recordingState: "in progress" } },
      {}
    )
    .then((doc) => res.json(doc))
    .catch((err) => console.log("hi" + err.message));
});

//get recording state (in progress or ended)
app.get("/:lobby/getRecordingState", (req, res) => {
  const room = db.get(req.params.lobby);
  room
    .find({})
    .then((users) => res.json(users[0].recordingState))
    .catch((err) => console.log(err.message));
});

//conductor has ended recording
app.put("/:lobby/endRecording", (req, res) => {
  const room = db.get(req.params.lobby);
  room
    .findOneAndUpdate(
      { name: req.body.name },
      { $set: { recordingState: "ended" } },
      {}
    )
    .then((doc) => res.json(doc))
    .catch((err) => console.log("hi" + err.message));
});

//update users wave file
app.put("/:lobby/user/audio", (req, res) => {
  const room = db.get(req.params.lobby);
  room
    .findOneAndUpdate(
      { name: req.body.name },
      { $set: { mp3: req.body.audioFile } },
      {}
    )
    .then((doc) => res.json(doc))
    .catch((err) => console.log("hi" + err.message));
});

//get users wave file
app.get("/:lobby/:user/getAudio", (req, res) => {
  const room = db.get(req.params.lobby);
  room
    .findOne({ name: `${req.params.user}` })
    .then((doc) => res.json(doc))
    .catch((err) => console.log(err.message));
});

//share embedded link with users
app.put("/:lobby/embeddedLink", (req, res) => {
  const room = db.get(req.params.lobby);
  room
    .findOneAndUpdate(
      { name: req.body.name },
      { $set: { embeddedLink: req.body.embeddedLink } },
      {}
    )
    .then((doc) => res.json(doc))
    .catch((err) => console.log("hi" + err.message));
});

//get embedded link
app.get("/:lobby/embeddedLink", (req, res) => {
  const room = db.get(req.params.lobby);
  room
    .find({})
    .then((users) => res.json(users[0].embeddedLink))
    .catch((err) => console.log(err.message));
});

//get all user info, including files
app.get("/:lobby/userInfo", (req, res) => {
  const room = db.get(req.params.lobby);
  room
    .find({})
    .then((users) => res.json(users))
    .catch((err) => console.log(err.message));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./build")));
}

app.listen(port, (err) => {
  console.log(`Connected to port ${port}`);
});

//app.get("/*", (req, res) => {
 // res.sendFile(path.join(path.join(__dirname, "./build/index.html")));
//});

//ping app every 20 min to keep the server from sleeping
//require("heroku-self-ping").default("https://mu-sync.herokuapp.com/");
