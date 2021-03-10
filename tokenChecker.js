const jwt = require("jsonwebtoken");
const config = require("./config.json");

const verifyToken = (req, res) => {
  const token = req.headers.authorization;
  //console.log(token);
  let test;
  if (token) {
    try {
      let dtoken = jwt.verify(token, config.secret);
      test = { ddata: dtoken, message: "success" };
      return test;
    } catch (err) {
      test = { ddata: null, message: err.message };
      return test;
    }
  } else {
    test = { ddata: null, message: "No token available" };
    return test;
  }
};

module.exports = { verifyToken };
