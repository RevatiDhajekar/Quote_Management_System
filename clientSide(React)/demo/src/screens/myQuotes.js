import Navbar from "./navbar";
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import AddNewQuote from "./addNewQuote";

function MyQuotes()
 {
    const [quotes , setQuotes] = useState([]);
    const [quote , setQuote] = useState({text: "", author: ""});


    useEffect(()=>
    {
       select();
    },[]);

    useEffect(()=>
    {
      // console.log("in update....");
    },[quotes , quote]);

    const select= ()=>
    {
       // debugger;
        var userId = sessionStorage.getItem("user_id");
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () =>{
            if(helper.readyState == 4 && helper.status == 200)
            {
                var result = JSON.parse(helper.responseText);
                console.log(result);
                setQuotes(result);
                console.log(quotes);
            }
        }
        helper.open("GET", "http://127.0.0.1:9999/quotes/" + userId);
        helper.send();
    }

    // const addQuote=()=>{
    //         return <AddNewQuote></AddNewQuote>;
    // }

  return (
    <>
    <Navbar></Navbar>

   <h2 style={{textAlign:'center' , fontWeight:'bolder', fontStyle:'italic'}}>My Quotes</h2>
   <div  style={{float:'right', marginRight : 30}}>
        &nbsp;
        <Link to="allQuotes">All</Link>
        &nbsp;&nbsp;&nbsp;
       {/* <button className='btn btn-warning' >Favourites</button> */}
       <Link to="/favquotes">Favorites</Link>

       <br/><br/> <br/> 
       {/* <button className='btn btn-primary' onClick={addQuote}>Add Quote</button> */}

       <Link to="/addnewquote">Add Quote</Link>
   </div>

   <br/><br/> <br/> <br/><br/> <br/>
   <table className='table table-bordered'>
       <tbody>
           {
               
               quotes.map((quote)=>
               {
                   
                 return(
                   <tr>
                   <td>
                       {quote.text}
                   </td>
                   <td>
                       {quote.author}
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

export default MyQuotes;
