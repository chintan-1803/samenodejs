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
    { name: "Essays/Essay1.jpg", id: "tZI0nrmHM3g" },
    { name: "Essays/Essay2.jpg", id: "TRCDjJ7Gbn0" },
    { name: "Essays/Essay3.jpg", id: "p_7X4gblCPk" },
    { name: "Essays/Essay4.png", id: "R-LrEkSmZrk" },
    { name: "Essays/Essay5.jpg", id: "4vUDUAYtYXw" },
    { name: "Essays/Essay6.jpg", id: "EIpmlFpzwXU" },
    { name: "Essays/Essay7.jpg", id: "H3L_uNJTjV8" },
    { name: "Essays/Essay8.jpg", id: "5dt2TdJCwts" },
    { name: "Essays/Essay9.jpg", id: "-GS1UT3zBEA" },
    { name: "Essays/Essay10.jpg", id: "pkmTxrpG9rk" },
    { name: "Essays/Essay11.jpg", id: "lV38B65VaN4" },
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
    { name: "Vocabulary/Vocab1.PNG", id: "7olFOIFZOIU" },
    { name: "Vocabulary/Vocab2.PNG", id: "-a58Jm7A2Lk" },
    { name: "Vocabulary/Vocab3.PNG", id: "UNDzoc1i7qg" },
    { name: "Vocabulary/Vocab4.PNG", id: "V45ElKva8ag" },
    { name: "Vocabulary/Vocab5.PNG", id: "zwwBpRo5gMc" },
    { name: "Vocabulary/Vocab6.PNG", id: "jfGM8qUL7UQ" },
    { name: "Vocabulary/Vocab7.PNG", id: "zF_f7xskxyQ" },
    { name: "Vocabulary/Vocab8.PNG", id: "t5bqU_xHaKM" },
    { name: "Vocabulary/Vocab9.PNG", id: "PPGzMeNVvJ4" },
    { name: "Vocabulary/Vocab10.PNG", id: "YpYu06WxbMI" },
    { name: "Vocabulary/Vocab11.PNG", id: "CZGwNsTnYwU" },
    { name: "Vocabulary/Vocab12.PNG", id: "2zgTCfLfPxI" },
    { name: "Vocabulary/Vocab13.PNG", id: "mZOGaB1fFbM" },
    { name: "Vocabulary/Vocab14.PNG", id: "EGsVnGID5bk" },
    { name: "Vocabulary/Vocab15.png", id: "zRFJrtxk9U4" },
    { name: "Vocabulary/Vocab16.png", id: "E4pA0cvj8MM" },
    { name: "Vocabulary/Vocab17.PNG", id: "WLRJC6O3QDk" },
    { name: "Vocabulary/Vocab18.PNG", id: "iXaOyNZg9i4" },
    { name: "Vocabulary/Vocab19.PNG", id: "qieWlYk9Mic" },
    { name: "Vocabulary/Vocab20.PNG", id: "GWfLn4E_Wnw" },
    { name: "Vocabulary/Vocab21.PNG", id: "9nT00f0HkzU" },
    { name: "Vocabulary/Vocab22.PNG", id: "2XMPHQ4U2ZY" },
    { name: "Vocabulary/Vocab23.PNG", id: "wnK1Av3RqKQ" },
    { name: "Vocabulary/Vocab24.PNG", id: "Rk0lB1ITnkM" },
    { name: "Vocabulary/Vocab25.PNG", id: "_5x_t-xw5vs" },
    { name: "Vocabulary/Vocab26.PNG", id: "aEMJN-LHqkQ" },
    { name: "Vocabulary/Vocab27.PNG", id: "2Ljl9zQCicU" },
    { name: "Vocabulary/Vocab28.PNG", id: "dxky1qLgUcc" },
    { name: "Vocabulary/Vocab29.png", id: "1ndCOZLhPkA" },
    { name: "Vocabulary/Vocab30.PNG", id: "dazyPzELwZs" },
    { name: "Vocabulary/Vocab31.PNG", id: "bNsa-TnixcE" },
    { name: "Vocabulary/Vocab32.PNG", id: "5-2iW3ShNMY" },
    { name: "Vocabulary/Vocab33.PNG", id: "xXp29FTOKG4" },
    { name: "Vocabulary/Vocab34.PNG", id: "JJox-x97oZs" },
    { name: "Vocabulary/Vocab35.PNG", id: "w2h9qGuXd48" },
    { name: "Vocabulary/Vocab36.PNG", id: "cv6xm1R_BKc" },
    { name: "Vocabulary/Vocab37.PNG", id: "s6C0ZrXSdE8" },
    { name: "Vocabulary/Vocab38.PNG", id: "HAO03fuN97s" },
    { name: "Vocabulary/Vocab39.PNG", id: "5NBbniytKnQ" },
    { name: "Vocabulary/Vocab40.PNG", id: "KnZ-LyvQt_E" },
    { name: "Vocabulary/Vocab41.PNG", id: "TRAXBaYhMys" },
    { name: "Vocabulary/Vocab42.png", id: "rWr1G15VRD4" },
    { name: "Vocabulary/Vocab43.png", id: "fUBHJDy9Dh8" },
    { name: "Vocabulary/Vocab44.PNG", id: "vxbOR8knA-k" },
    { name: "Vocabulary/Vocab45.PNG", id: "ecaYl-eJZxY" },
    { name: "Vocabulary/Vocab46.PNG", id: "kaCK8GrDWzc" },
    { name: "Vocabulary/Vocab47.PNG", id: "Ne4pJS4YQfg" },
    { name: "Vocabulary/Vocab48.PNG", id: "-lEuF3phpNY" },
    { name: "Vocabulary/Vocab49.PNG", id: "rBlTxEOkTnc" },
    { name: "Vocabulary/Vocab50.PNG", id: "XY3wVU8xqlk" },
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
