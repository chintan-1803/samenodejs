//https://www.youtube.com/watch?v=oykl1Ih9pMg  -- Deployment f NodeJs application in ubuntu OS
// How to define acess control policy in node js server
//https://rapidapi.com/blog/react-api-authentication-authorization/
//https://material-ui.com/components/data-grid/filtering/
//https://codeforgeek.com/refresh-token-jwt-nodejs-authentication/
//https://medium.com/m/global-identity?redirectUrl=https%3A%2F%2Flevelup.gitconnected.com%2Fhow-to-kill-server-when-seeing-eaddrinuse-address-already-in-use-16c4c4d7fe5d
//https://developers.google.com/gmail/api/quickstart/nodejs

const express = require("express");
const jwt = require("jsonwebtoken");
//var bodyParser = require("body-parser");
const app = express();
const config = require("./config.json");
var cors = require("cors");
const port = 8000;
const tokenList = {};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ loginStatus: true });
});

app.get("/loginStatus2", (req, res) => {
  res.send({ loginStatus: false });
});

app.post("/login", (req, res) => {
  const postData = req.body;

  const user = {
    email: req.body.email,
    name: req.body.name,
  };

  const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife });
  const refreshtoken = jwt.sign(user, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenLife,
  });

  const response = {
    status: "Logged in",
    token: token,
    refreshToken: refreshtoken,
  };
  tokenList[refreshtoken] = response;
  res.status(200).json(response);
});

app.get("/SQLConnection", (req, res) => {
  var sql = require("mssql");
  // config for your database
  var config = {
    user: "sa3",
    password: "mypc98247#",
    server: "localhost",
    database: "Sample",
  };

  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("SELECT * from Tbl_Employee", function (err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.send(recordset);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
