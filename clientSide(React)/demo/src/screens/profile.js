import Navbar from "./navbar";
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';


function Profile() 
{

  const [user, setUser] = useState({first_name:"", last_name:"", email:"", password:"", mobile :""});
  const [message, setMessage] = useState("");

    useEffect(()=>{

    }, [user]);

    useEffect(()=>{
        setTimeout(()=>{
            setMessage("")
        }, 3000);
    }, [message]);

    const onTextChange =(args)=>{
        var copyOfUser = {...user};
        copyOfUser[args.target.name] = args.target.value;
        setUser(copyOfUser);
    }

  const save=()=>{
    var userId = sessionStorage.getItem("user_id");
    var helper = new XMLHttpRequest();
    helper.onreadystatechange =()=>{
        if(helper.readyState ==4 && helper.status == 200){
            var responseReceived = JSON.parse(helper.responseText);
            if(responseReceived.affectedRows >0 && responseReceived.affectedRows != undefined)
            {
                console.log(user);
                setUser({first_name:"", last_name:"", email:"", password:"", mobile:"" });
                setMessage("updated successfully! :)");
                
            }
            else
            {
                setMessage("Something Went Wrong! :(");
            }
        }
    }
    helper.open("PUT", "http://127.0.0.1:9999/users/" + userId);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(user));
  }

  return (<>
              <Navbar></Navbar>
              <h2 style={{textAlign:'center', fontWeight:'bold', fontStyle:'italic'}}>My Profile</h2>
                <center>
                <table className="table table-responsive border : 1" style={{marginTop:60,  height: 300, width: 200}}>
                        <tr><td>
                                <input name='first_name' value={user.first_name} type='text' placeholder=' Enter first name' onChange={onTextChange}/>
                        </td></tr>
                        <tr><td>
                                <input name='last_name' value={user.last_name} type='text' placeholder=' Enter last name'onChange={onTextChange}/>
                        </td></tr>
                        <tr><td>
                                <input name='email' value={user.email} type='email' placeholder='  Enter email'onChange={onTextChange}/>
                        </td></tr>
                        <tr><td>
                                <input name='password' value={user.password} type='password' placeholder=' Enter password' onChange={onTextChange}/>
                        </td></tr>
                        <tr><td>
                                <input name='mobile' value={user.mobile}  placeholder=' Enter mobile' onChange={onTextChange}/>
                        </td></tr>  
                        <tr>
                            <td><button style={{marginLeft:50}} className='btn btn-info' onClick={save}>Update</button></td>
                        </tr>
                        <br></br>
                        <br></br>
                        <center style={{color: 'green', fontWeight:'bold'}}> <h4>{message}</h4></center>
                    </table>
                </center>
            </>
        );
}

export default Profile;