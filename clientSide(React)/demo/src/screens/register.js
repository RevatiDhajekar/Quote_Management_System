import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';


function Register()
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

    const register= ()=>
    {
        // debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange =()=>{
            if(helper.readyState ==4 && helper.status == 200){
                var responseReceived = JSON.parse(helper.responseText);
                if(responseReceived.affectedRows >0 && responseReceived.affectedRows != undefined)
                {
                    console.log(user);
                    setUser({first_name:"", last_name:"", email:"", password:"", mobile:"" });
                    setMessage("Registered successfully! :)");
                    
                }
                else
                {
                    setMessage("Something Went Wrong! :(");
                }
            }
        }
        helper.open("POST", "http://127.0.0.1:9999/users");
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(user));
    }



    return (
        <>
        <center><h2 style={{marginTop:80, fontWeight: "bold", fontStyle:'italic'}}>Register Here</h2></center>
       <center>
        <form>
       <table className="table table-responsive table-bordered table-hover" style={{marginTop:50,  height: 300, width: 200, border:10}}>
            <tr><td>
                    <input name='first_name' value={user.first_name} type='text' required placeholder=' Enter first name' onChange={onTextChange}/>
            </td></tr>
            <tr><td>
                    <input name='last_name' value={user.last_name} type='text' required placeholder=' Enter last name'onChange={onTextChange}/>
            </td></tr>
            <tr><td>
                    <input name='email' value={user.email} type='email' required placeholder='  Enter email'onChange={onTextChange}/>
            </td></tr>
            <tr><td>
                    <input name='password' value={user.password} type='password' required placeholder=' Enter password' onChange={onTextChange}/>
            </td></tr>
            <tr><td>
                    <input name='mobile' value={user.mobile} required placeholder=' Enter mobile' onChange={onTextChange}/>
            </td></tr>
            {/* <tr><td>
                    <input name='rePass' placeholder=' Re-enter password'/>
            </td></tr> */}
            <tr><td>
                    Already have account? 
                    <Link to="/login">  login here</Link>
            </td></tr>
            <tr>
                <td><button className='btn btn-info' onClick={register}>Register</button></td>
            </tr>
            {message}
        </table>
        </form>
       </center>
        </>
     );
}

export default Register;