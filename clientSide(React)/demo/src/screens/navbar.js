import { Link } from "react-router-dom";

function Navbar() {
    return ( <nav className="navbar navbar-default" role="navigation">
    <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
    </div>

    <div className="collapse navbar-collapse navbar-ex1-collapse">
        <ul className="nav navbar-nav">
            <li className="active"><Link to="/home">Home</Link></li>
            <li className="active"><Link to="/myquotes">My Quotes</Link></li>
            <li className="active"><Link to="/profile">Profile</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
            <li ><Link to="/logout" style={{color:'red'}} >Log out</Link></li>
        </ul>
    </div>
</nav> );
}

export default Navbar;