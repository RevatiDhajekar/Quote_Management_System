
import Login from "./screens/login";
import {Route} from 'react-router-dom';

function ProtectedRoutes(props)
{ 
      //  debugger;
    var isLoggedIn = false;

    var isuserLoggedIn = window.sessionStorage.getItem("isLoggedIn");
    if(isuserLoggedIn!=null && isuserLoggedIn =='true')
    {
      isLoggedIn = true;
    }
    else
    {
       isLoggedIn = false;
    }
 

    if(isLoggedIn)
    {
        return <Route exact path={props.path} 
                      component={props.component}/>
    }
    else
    {
        return <Login ></Login>   
    }
}

export default ProtectedRoutes;