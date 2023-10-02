const express = require('express');
const config = require('config');
const mysql = require('mysql');
const atob = require('atob');

const appForLogin = express.Router();

var connection = mysql.createConnection(
    {
        host     : config.get("host"),
        user     : config.get("user"),
        password : config.get("password"),
        database : config.get("database")
    }
)

//GET
appForLogin.post("/" , (request , response)=>
{
    console.log("Login credentials received from Client ")

    var decoded =  atob(request.body.credentials);
    console.log(decoded);

    var credentials = JSON.parse(decoded);
    console.log(credentials);

    var sql = `select password, user_id from users where email = '${credentials.email}'`;
    connection.query(sql , (error , result)=>
    {
        if(error == null)
        {
            //var dataReceived = JSON.stringify(result);
            console.log("data from users database:"+result[0].password);
            var userId = result[0].user_id;
            if(result[0].password == credentials.password)
            {
                response.setHeader("Content-Type","application/json");
                var reply = {"isValid": "true",
                                "user_id": userId}

                response.send(JSON.stringify(reply));
                // console.log(pass);
                // console.log(userId);
            }
            else
            {

                response.setHeader("Content-Type","application/json");
                var reply = {"isValid": "false"}
                response.send(JSON.stringify(reply));
            }
           
        }
        else
        {
            response.setHeader("Content-Type", "application/json");
            response.send(error);
        }
    })
})


module.exports = appForLogin;