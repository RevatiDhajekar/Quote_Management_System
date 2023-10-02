import Navbar from "./navbar";
import { useEffect, useState } from 'react';

function AddNewQuote() {
    const [quote , setQuote] = useState({text: "", author: ""});
    const [message , setMessage] = useState("");

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
      
    },[quote]);

    const onTextChange =(args)=>{
        var copyOfQuote = {...quote};
        copyOfQuote[args.target.name] = args.target.value;
        setQuote(copyOfQuote);
    }

    const addQuote =()=>
    {
        
        var userId = sessionStorage.getItem("user_id");
        var helper = new XMLHttpRequest();
        helper.onreadystatechange =()=>{
            if(helper.readyState ==4 && helper.status == 200){
                var responseReceived = JSON.parse(helper.responseText);
                if(responseReceived.affectedRows >0 && responseReceived.affectedRows != undefined)
                {
                    setQuote({text:"", author:"" });
                    setMessage("Quote Added successfully! :)");
                    console.log(quote);
                }
                else
                {
                    setMessage("Something Went Wrong! :(");
                }
            }
        }
        helper.open("POST", "http://127.0.0.1:9999/quotes/" + userId);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(quote));
    }


    return ( <>
                <Navbar></Navbar>
                <h2 style={{textAlign:'center', fontWeight:'bolder', fontStyle:'italic'}}>Add New Quote</h2>
                <center>
                    <div>
                        <input name="author"  value={quote.author} type="text" placeholder="Author" 
                            onChange={onTextChange} style={{marginTop : 50}}></input>
                        <br/><br/><br/> 
                        <textarea name="text" value={quote.text} placeholder="Quote" onChange={onTextChange}></textarea>
                    </div>
                    <button className="btn btn-success" onClick={addQuote} >Add</button>
                    <br/>
                    {message}
                </center>
            </>

     );
}

export default AddNewQuote;