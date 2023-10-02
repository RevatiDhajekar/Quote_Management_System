import { useHistory } from "react-router-dom";
import Login from "./login";

function Logout() 
{
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("user_id");


    const history = useHistory();
    history.push("/login");
    // return ( <>
    //         <Login></Login>

    //         </> );
}

export default Logout;