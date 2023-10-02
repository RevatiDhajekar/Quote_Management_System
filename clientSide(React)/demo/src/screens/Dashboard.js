import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import AddNewQuote from './addNewQuote';


function Dashboard()
{
    const [quotes , setQuotes] = useState([]);
    const [quote , setQuote] = useState({quote_id : "" , text: "", author: ""});
    // const [favQuote , setfavQuote] = useState({user_id : "", quote_id : ""});
    const [message , setMessage] = useState("");


    useEffect(()=>
    {
       select();
    },[]);

    useEffect(()=>
    {
        if(message != "")
        {
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    }, [message]);
  

    useEffect(()=>
    {
      // console.log("in update....");
    },[quotes , quote]);

    const select= ()=>
    {
       // debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () =>{
            if(helper.readyState == 4 && helper.status == 200)
            {
                var result = JSON.parse(helper.responseText);
                console.log(result);
                setQuotes(result);
                console.log("quotes");
                console.log(quotes);
            }
        }
        helper.open("GET", "http://127.0.0.1:9999/quotes");
        helper.send();
    }


    const addToFav =(quote_id)=>
    {
        console.log(quote_id);
        var userId = sessionStorage.getItem("user_id");
        var helper = new XMLHttpRequest();
        helper.onreadystatechange =()=>{
            if(helper.readyState ==4 && helper.status == 200){
                var responseReceived = JSON.parse(helper.responseText);
                if(responseReceived.affectedRows >0 && responseReceived.affectedRows != undefined)
                {
                   // setfavQuote({user_id : "", quote_id : ""});
                    setMessage("Added to favorites :)");
                }
                else
                {
                    setMessage("Something Went Wrong :(");
                    console.log({message});
                }
            }
        }
        helper.open("POST", "http://127.0.0.1:9999/favquotes/" + userId);
        helper.setRequestHeader("Content-Type", "application/json");
        // helper.send(JSON.stringify(favQuote));
        helper.send(JSON.stringify({quote_id}))
    }

    const removeFromFav =(quote_id)=>
    {
        console.log(quote_id);
        var userId = sessionStorage.getItem("user_id");
        var helper = new XMLHttpRequest();
        helper.onreadystatechange =()=>{
            if(helper.readyState ==4 && helper.status == 200){
                var responseReceived = JSON.parse(helper.responseText);
                if(responseReceived.affectedRows >0 && responseReceived.affectedRows != undefined)
                {
                   // setfavQuote({user_id : "", quote_id : ""});
                   setMessage("Removed from favorites :)");
                }
                else
                {
                    setMessage("Something Went Wrong :(");
                    console.log({message});
                }
            }
        }
        helper.open("DELETE", "http://127.0.0.1:9999/favquotes/" + userId);
        helper.setRequestHeader("Content-Type", "application/json");
        // helper.send(JSON.stringify(favQuote));
        helper.send(JSON.stringify({quote_id}))
    }

    return ( 
       <>
         <Navbar></Navbar>

        <h2 style={{textAlign:'center', fontWeight:'bolder', fontStyle:'italic'}}>Quotes Around The World</h2>
        <br></br>
        <center style={{color: 'green', fontWeight:'bold'}}> <h4>{message}</h4></center>
        
        <div  style={{float:'right', marginRight : 30}}>
       
             &nbsp;
             {/* <button onClick={select} className='btn btn-success' >All</button>&nbsp;&nbsp;&nbsp;&nbsp; */}
             <Link to="allQuotes">All</Link>
             &nbsp; &nbsp; &nbsp; 
             <Link to="/addnewquote">Add Quote</Link>
             &nbsp; &nbsp; &nbsp; 
            <Link to="/favquotes">Favorites</Link>
        </div>
        <br/><br/> <br/>
        <table className='table table-bordered'>
            <tbody>
                {
                    
                    quotes.map((quote)=>
                    {
                       // debugger;
                       
                      return(   
                        <tr>
                        <td>
                            {quote.text}
                        </td>
                        <td>
                            {quote.author}
                        </td>
                        <td>
                            <button className='btn btn-info'  onClick={()=>{addToFav(quote.quote_id)}}>Add to Fav</button>
                        </td>
                        <td>
                            <button className='btn btn-danger' onClick={()=>{removeFromFav(quote.quote_id)}}>Remove from Fav</button>
                        </td>
                        </tr>
                      )
                    })
                  
                }
            </tbody>
        </table>

       </>
    );
}

export default Dashboard;