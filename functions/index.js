const functions = require("firebase-functions");
require('dotenv').config();
const express = require("express");
const app = express();
const port = 3000;
const requestIp = require('request-ip')
const admin = require('firebase-admin');
admin.initializeApp();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

app.listen(3000, function () {
  console.log(`Listening on port ${port}`)
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/whoami", function (req, res) {
  const ip = requestIp.getClientIp(req);
  const language = req.header("accept-language")
  const software = req.header("user-agent")

  res.json({ipaddress: ip, language: language, software: software})
})
