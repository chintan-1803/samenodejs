
//https://www.youtube.com/watch?v=oykl1Ih9pMg  -- Deployment f NodeJs application in ubuntu OS
// How to define acess control policy in node js server
//https://rapidapi.com/blog/react-api-authentication-authorization/
//https://material-ui.com/components/data-grid/filtering/
//https://codeforgeek.com/refresh-token-jwt-nodejs-authentication/
//https://medium.com/m/global-identity?redirectUrl=https%3A%2F%2Flevelup.gitconnected.com%2Fhow-to-kill-server-when-seeing-eaddrinuse-address-already-in-use-16c4c4d7fe5d
//https://developers.google.com/gmail/api/quickstart/nodejs

const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();
var cors = require('cors')
const port = 8000;

app.use(cors())

app.get('/loginStatus1', (req, res) => {
    res.send(
      {'loginStatus':true}
    );
});

app.get('/loginStatus2', (req, res) => {
    res.send(
        {'loginStatus':false}
        );
});
app.get('/', (req, res) => {
    var sql = require("mssql");
    // config for your database
    var config = {
        user: 'sa3',
        password: 'mypc98247#',
        server: 'localhost', 
        database: 'Sample' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * from Tbl_Employee', function (err, recordset) {
            
            if (err) console.log(err);
            // send records as a response
            res.send(recordset);
            
        });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});