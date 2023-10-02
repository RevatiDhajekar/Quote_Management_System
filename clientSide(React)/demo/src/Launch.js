import {Link, Switch, Route} from 'react-router-dom';
import Login from './screens/login';
import ProtectedRoutes from './protectedRoutes';
import Dashboard from './screens/Dashboard';
import Home from './screens/home';
import Profile from './screens/profile';
import MyQuotes from './screens/myQuotes';
import NotFound from './notFound';
import Register from './screens/register';
import AddNewQuote from './screens/addNewQuote';
import FavQuotes from './screens/favQuotes';
import AllQuotes from './screens/allQuotes';
import Logout from './screens/logout';

function Launch() 
{
    //debugger;
    console.log("Inside launch");
    return ( 
        <>
        <Switch>
            <Route path="/" exact component={Login}/>
            
            <Route path="/login" exact component={Login}/>

            <ProtectedRoutes path="/dashboard" exact component={Dashboard}/>

            <Route path="/profile" exact component={Profile}/>

            <Route path="/myquotes" exact component={MyQuotes}/>

            <Route path="/home" exact component = {Home}/>

            <Route path="/register" exact component = {Register}/>

            <Route path="/allQuotes" exact component = {AllQuotes}/>

            <Route path="/addnewquote" exact component = {AddNewQuote}/>

            <Route path="/favquotes" exact component = {FavQuotes}/>

            <Route path="/logout" exact component = {Logout}/>

            <Route path="*" exact component = {NotFound}/>

        </Switch>
        </>
     );
}

export default Launch;
