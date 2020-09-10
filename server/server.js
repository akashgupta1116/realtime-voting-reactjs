const express = require("express");
const envConfig = require("dotenv").config();
const Ably = require("ably");
const cors = require("cors");

const app = express();
app.use(cors());
const realtime = Ably.Realtime({
  key: process.env.ABLY_API_KEY,
});

app.use(express.static("/voting-app/build"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/voting-app/public/index.html");
});

app.get("/publish", (request, response) => {
  // assign each front-end client a unique clientId
  const tokenParams = {
    capability: '{"*":["publish"]}',
  };
  realTimeAuth(tokenParams, response);
});

app.get("/subscribe", (request, response) => {
  // assign each front-end client a unique clientId
  const tokenParams = {
    capability: '{"*":["subscribe"]}',
  };
  realTimeAuth(tokenParams, response);
});

const realTimeAuth = (tokenParams, response) => {
  realtime.auth.createTokenRequest(tokenParams, function (err, tokenRequest) {
    if (err) {
      response
        .status(500)
        .send("Error requesting token: " + JSON.stringify(err));
    } else {
      // return the token request to the front-end client
      response.json(tokenRequest);
    }
  });
};

const listener = app.listen(process.env.PORT, () => {
  console.log("App is listening on port " + listener.address().port);
});
