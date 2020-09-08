const express = require('express');
const envConfig = require('dotenv').config();
const Ably = require('ably');
var cors = require('cors');


const app = express();
app.use(cors());
const realtime = Ably.Realtime({
    key: process.env.ABLY_API_KEY,
  });

  app.use(express.static('/voting-app/build'));
  app.get('/', (request, response) => {
    response.sendFile(__dirname + '/voting-app/public/index.html');
  });

  // app.get('/auth', (request, response) => {
  //   // assign each front-end client a unique clientId
  //   const tokenParams = {};
  //   realtime.auth.createTokenRequest(tokenParams, function (err, tokenRequest) {
  //     if (err) {
  //       response
  //         .status(500)
  //         .send('Error requesting token: ' + JSON.stringify(err));
  //     } else {
  //       // return the token request to the front-end client
  //       response.setHeader('Content-Type', 'application/json');
  //       response.send(JSON.stringify(tokenRequest));
  //     }
  //   });
  // });

  app.get('/publish', (request, response) => {
    // assign each front-end client a unique clientId
    const tokenParams = {
      'capability': '{"*":["publish"]}' 
    };
    realtime.auth.createTokenRequest(tokenParams, function (err, tokenRequest) {
      if (err) {
        response
          .status(500)
          .send('Error requesting token: ' + JSON.stringify(err));
      } else {
        // return the token request to the front-end client
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify(tokenRequest));
      }
    });
  });
  app.get('/subscribe', (request, response) => {
    // assign each front-end client a unique clientId
    const tokenParams = {
      'capability': '{"*":["subscribe"]}' 
    };
    realtime.auth.createTokenRequest(tokenParams, function (err, tokenRequest) {
      if (err) {
        response
          .status(500)
          .send('Error requesting token: ' + JSON.stringify(err));
      } else {
        // return the token request to the front-end client
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify(tokenRequest));
      }
    });
  });


const listener = app.listen(process.env.PORT,()=>{
    console.log('App is listening on port ' + listener.address().port);
})