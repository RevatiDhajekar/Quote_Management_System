import Navbar from "./navbar";
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import AddNewQuote from "./addNewQuote";

function AllQuotes()
 {
    const [quotes , setQuotes] = useState([]);
    const [quote , setQuote] = useState({text: "", author: ""});


    useEffect(()=>
    {
       select();
    },[]);

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
                console.log(quotes);
            }
        }
        helper.open("GET", "http://127.0.0.1:9999/quotes");
        helper.send();
    }

  return (
    <>
    <Navbar></Navbar>

    <h2 style={{textAlign:'center', fontWeight:'bolder', fontStyle:'italic'}}>All Quotes</h2>
   <div  style={{float:'right', marginRight : 30}}>
        &nbsp;
        <Link to="allQuotes">All</Link>
        &nbsp;&nbsp;&nbsp;
       <Link to="/favquotes">Favorites</Link>

       <br/><br/> <br/>        
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

export default AllQuotes;
