const express = require('express');
const config = require('config');

const loginRoutes = require('./routes/login');
const usersRoutes = require('./routes/users');
const quotesRoutes = require('./routes/quotes');
const favQuotesRoutes = require('./routes/favQuotes');


const app = express();

app.use((request , response , next)=>
{
    response.setHeader('Access-Control-Allow-Origin', "*"); //GET
    response.setHeader('Access-Control-Allow-Headers',"*");  //PUT
    response.setHeader('Access-Control-Allow-Methods', "*")  //DELETE
    next();
})

app.use(express.json()); 
app.use('/login' , loginRoutes);
app.use('/users' , usersRoutes);
app.use('/quotes' , quotesRoutes);
app.use('/favquotes' , favQuotesRoutes);

const portNo = config.get("PORT");
app.listen(portNo, ()=>
{
    console.log("Server is listening at " + portNo)
});