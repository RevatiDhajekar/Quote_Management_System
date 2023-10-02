const express = require('express');
const config = require('config');
const mysql = require('mysql');

const appForFavQuotes = express.Router();
var connection = mysql.createConnection(
    {
        host     : config.get("host"),
        user     : config.get("user"),
        password : config.get("password"),
        database : config.get("database")
    });

    //GET
    appForFavQuotes.get("/:user_id", (request, response)=>
    {
        var sql = `select text , author from quotes where quote_id in (select quote_id from favQuotes where user_id = ${request.params.user_id})`;
        
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

    appForFavQuotes.post("/:user_id", (request, response)=>
    {
        var sql = `insert into favQuotes values('${request.params.user_id}' ,'${request.body.quote_id}')`;
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

    appForFavQuotes.delete("/:user_id", (request, response)=>
    {
        var sql = `delete from favQuotes where user_id = '${request.params.user_id}' and quote_id = '${request.body.quote_id}'`;
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

     
    module.exports = appForFavQuotes;