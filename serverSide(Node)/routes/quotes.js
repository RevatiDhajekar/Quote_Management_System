const express = require('express');
const config = require('config');
const mysql = require('mysql');

const appForQuotes = express.Router();
var connection = mysql.createConnection(
    {
        host     : config.get("host"),
        user     : config.get("user"),
        password : config.get("password"),
        database : config.get("database")
    });


    // select quotes.text from quotes, users where quotes.user_id = users.user_id;
    appForQuotes.get("/", (request, response)=>
    {
        var sql = `select quotes.quote_id ,quotes.text, quotes.author from quotes, users where quotes.user_id = users.user_id`;
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

    appForQuotes.get("/:user_id", (request, response)=>
    {
        var sql = `select quotes.quote_id , quotes.text, quotes.author from quotes where quotes.user_id = ${request.params.user_id}`;
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
      
    appForQuotes.post("/:user_id", (request, response)=>
    {
        var sql = `insert into quotes(text, author,user_id) values( '${request.body.text}' ,'${request.body.author}' , '${request.params.user_id}')`;
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
    module.exports = appForQuotes;