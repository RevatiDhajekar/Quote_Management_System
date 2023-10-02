const express = require('express');
const config = require('config');
const mysql = require('mysql');

const appForusers = express.Router();
var connection = mysql.createConnection(
    {
        host     : config.get("host"),
        user     : config.get("user"),
        password : config.get("password"),
        database : config.get("database")
    });

    //GET
    appForusers.get("/", (request, response)=>
    {
        var sql = "select * from users";
        connection.query(sql, (error, result)=>
        {
            if(error == null)
            {
                var dataReceived = JSON.stringify(result);
                response.setHeader("Content-Type", "application/json");
                response.send(dataReceived);
            }
            else
            {
                response.setHeader("Content-Type", "application/json");
                response.send(error);
            }
        })
    })

    //POST
    appForusers.post("/", (request, response)=>
    {
        var sql = `INSERT INTO users (first_name, last_name, email, password, mobile) 
                    values ('${request.body.first_name}','${request.body.last_name}',
                                '${request.body.email}', '${request.body.password}', '${request.body.mobile}')`;
        connection.query(sql, (error, result)=>
        {
            if(error == null)
            {
                var dataReceived = JSON.stringify(result);
                response.setHeader("Content-Type", "application/json");
                response.send(dataReceived);
            }
            else
            {
                response.setHeader("Content-Type", "application/json");
                response.send(error);
            }
        })
    })

        //PUT
        appForusers.put("/:user_id", (request, response)=>
        {
            
            var sql = `UPDATE users set first_name = '${request.body.first_name}', last_name = '${request.body.last_name}' , 
                                email = '${request.body.email}', password = '${request.body.password}', mobile = '${request.body.mobile}'
                                where user_id = ${request.params.user_id}`;
            connection.query(sql, (error, result)=>
            {
                if(error == null)
                {
                    var dataReceived = JSON.stringify(result);
                    response.setHeader("Content-Type", "application/json");
                    response.send(dataReceived);
                }
                else
                {
                    response.setHeader("Content-Type", "application/json");
                    response.send(error);
                }
            })
        })
    

     
    module.exports = appForusers;