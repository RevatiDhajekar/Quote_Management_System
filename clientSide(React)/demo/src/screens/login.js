import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Register from "./register";

function Login() {
    console.log("inside login");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message , setMessage] = useState("");
  const history = useHistory();

  useEffect(()=>
  {
      if(message != "")
      {
          setTimeout(() => {
              setMessage("");
          }, 3000);
      }
  }, [message]);

  const OnTextChange= (args)=>
    {
        var copyOfCredentials = {...credentials};
        copyOfCredentials[args.target.name] = args.target.value;
        setCredentials(copyOfCredentials);
    }

    const SignIn =()=>
    {
        //debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>
        {
            if(helper.readyState == 4 && helper.status == 200)
            {
                var resposeReceived = JSON.parse(helper.responseText);
                console.log(resposeReceived);
                
                if(resposeReceived.isValid == 'true')
                {
                    sessionStorage.setItem("email" , credentials.email);
                    sessionStorage.setItem("isLoggedIn" ,'true');
                    sessionStorage.setItem("user_id", resposeReceived.user_id );
                    
                    history.push("/dashboard");
                }
                else
                {
                    setMessage("Invalid credentials");
                    setCredentials({email : "", password : ""});
                }
            }
           
        }
        helper.open("POST", "http://127.0.0.1:9999/login");
        // helper.open("POST", "http://127.0.0.1:9999/quotes");
        helper.setRequestHeader("Content-Type", "application/json");
        var credentialsInString = JSON.stringify(credentials);
        var credentialsEncoded = window.btoa(credentialsInString);
        var details  = {"credentials" : credentialsEncoded};
        helper.send(JSON.stringify(details));

        // myQuotes();
    }

    // const myQuotes =()=>
    // {
    //     debugger;
    //     var helper = new XMLHttpRequest();
    //     helper.onreadystatechange = ()=>
    //     {
    //         if(helper.readyState == 4 && helper.status == 200)
    //         {
    //             var resposeReceived = JSON.parse(helper.responseText);
    //             // if(resposeReceived.isValid == 'true')
    //             // {
    //             //     sessionStorage.setItem("email" , credentials.email);
    //             //     sessionStorage.setItem("isLoggedIn" ,'true');
    //             //     history.push("/dashboard");
    //             // }
    //             // else
    //             // {
    //             //     setMessage("Invalid credentials");
    //             //     setCredentials({email : "", password : ""});
    //             // }
    //         }
           
    //     }
    //     helper.open("POST", "http://127.0.0.1:9999/quotes");
    //     helper.setRequestHeader("Content-Type", "application/json");
    //     var credentialsInString = JSON.stringify(credentials);
    //     var credentialsEncoded = window.btoa(credentialsInString);
    //     var details  = {"credentials" : credentialsEncoded};
    //     helper.send(JSON.stringify(details));
    // }


          return (<>
                     <center>
                     <h2 style={{marginTop:80, fontWeight: "bold", fontStyle:'italic'}}>Login Here</h2>
                    <div style={{height:300 , width : 400}}>
                    <br />
                        <table className="table table-bordered table-hover loginTable" >
                        <tbody>
                            <tr>
                            <td>Email</td>
                            <td>
                                <input
                                type="text"
                                placeholder="Enter Email"
                                value={credentials.username}
                                name="email"
                                onChange={OnTextChange}/>
                            </td>
                            </tr>
                            <tr>
                            <td>Password</td>
                            <td>
                                <input
                                type="password"
                                placeholder="Enter Password"
                                value={credentials.password}
                                name="password"
                                onChange={OnTextChange}/>
                            </td>
                           </tr>
                            <tr>
                                <td colSpan={"2"}>
                                <center>
                                Dont have Account?
                                <Link to="/register" >register here</Link>
                                </center>
                                </td>
                            </tr>
                            <tr>
                            <td colSpan={"2"}>
                               <center>
                               <button onClick={SignIn} className="btn btn-success" >
                                Log In
                                </button>
                               </center>
                             
                                {message}
                            </td>
                            </tr>
                            
                        </tbody>
                        </table>
                    </div>
                    </center>
                    </>
                    
                );
}

export default Login;
