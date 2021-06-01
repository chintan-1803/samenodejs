// What is the diffrence between GET and POST methods ??
//https://www.youtube.com/watch?v=oykl1Ih9pMg  -- Deployment of NodeJs application in ubuntu OS
// How to define acess control policy in node js server
//https://rapidapi.com/blog/react-api-authentication-authorization/
//https://material-ui.com/components/data-grid/filtering/
//https://codeforgeek.com/refresh-token-jwt-nodejs-authentication/
//https://medium.com/m/global-identity?redirectUrl=https%3A%2F%2Flevelup.gitconnected.com%2Fhow-to-kill-server-when-seeing-eaddrinuse-address-already-in-use-16c4c4d7fe5d
//https://developers.google.com/gmail/api/quickstart/nodejs

const express = require("express");
const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
const app = express();
const config = require("./config.json");
const { verifyToken } = require("./tokenChecker.js");
var cors = require("cors");
const port = 8000;
const tokenList = {};

app.use(cors());
app.use(bodyParser.json({ extended: true }));

app.use(function (req, res, next) {
  const excludeurl = ["/login/", "/token/"];
  let data = verifyToken(req, res);

  const { path } = req;

  // console.log(path);
  // console.log(!excludeurl.includes(path));

  if (!data.ddata && !excludeurl.includes(path)) {
    let rmsg = {};
    //console.log(data.message);
    rmsg["Message"] = data.message;
    rmsg["IsSuccess"] = false;
    rmsg["code"] = `JWTExpired`;
    res.send(rmsg);
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send({ loginStatus: true });
});

app.get("/grammarVideos", (req, res) => {
  res.send([
    "EnglishGrammar.jpg",
    "EnglishGrammar.jpg",
    "EnglishGrammar.jpg",
    "EnglishGrammar.jpg",
    "EnglishGrammar.jpg",
    "EnglishGrammar.jpg",
    "EnglishGrammar.jpg",
    "EnglishGrammar.jpg",
  ]);
});

app.get("/ieltsEssays", (req, res) => {
  res.send([
	{name:"Essay1.jpg",id:"tZI0nrmHM3g"},
	{name:"Essay2.jpg",id:"TRCDjJ7Gbn0"},
	{name:"Essay3.jpg",id:"p_7X4gblCPk"},
	{name:"Essay4.png",id:"R-LrEkSmZrk"},
	{name:"Essay5.jpg",id:"4vUDUAYtYXw"},
	{name:"Essay6.jpg",id:"EIpmlFpzwXU"},
	{name:"Essay7.jpg",id:"H3L_uNJTjV8"},
	{name:"Essay8.jpg",id:"5dt2TdJCwts"},
	{name:"Essay9.jpg",id:"-GS1UT3zBEA"},
	{name:"Essay10.jpg",id:"pkmTxrpG9rk"},
	{name:"Essay11.jpg",id:"lV38B65VaN4"},
  ]);
});

app.get("/ieltsSpeaking", (req, res) => {
  res.send([
    "IELTSSpeaking.png",
    "IELTSSpeaking.png",
    "IELTSSpeaking.png",
    "IELTSSpeaking.png",
    "IELTSSpeaking.png",
    "IELTSSpeaking.png",
    "IELTSSpeaking.png",
    "IELTSSpeaking.png",
  ]);
});

app.get("/ieltsVocabulary", (req, res) => {
  res.send([
    "English Vocabulary_02012021.PNG",
    "English Vocabulary_02012021.PNG",
    "English Vocabulary_02012021.PNG",
    "English Vocabulary_02012021.PNG",
    "English Vocabulary_02012021.PNG",
    "English Vocabulary_02012021.PNG",
    "English Vocabulary_02012021.PNG",
    "English Vocabulary_02012021.PNG",
  ]);
});

app.get("/loginStatus2", (req, res) => {
  res.send({ loginStatus: false });
});

app.post("/login/*", (req, res) => {
  //const postData = req.body;

  const user = {
    username: req.body.username,
    password: req.body.password,
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

app.post("/token/*", (req, res) => {
  const postData = req.body;
  //console.log("hi token");
  if (postData.refreshToken && postData.refreshToken in tokenList) {
    const user = {
      email: postData.email,
      name: postData.name,
    };

    const token = jwt.sign(user, config.secret, {
      expiresIn: config.tokenLife,
    });

    const response = { token: token };
    tokenList[postData.refreshToken].token = token;

    res.status(200).json(response);
  } else {
    res.status(404).send("Invalid request");
  }
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
