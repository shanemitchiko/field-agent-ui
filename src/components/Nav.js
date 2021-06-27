import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "../contexts/LoginContext";

function Nav() {

    const { username, logout } = useContext(LoginContext);
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push("/");
    }

    return (
        <>
            <nav id="navigation" className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <a className="navbar-brand">
                        FIELD AGENTS
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">HOME</Link>
                            </li>
                            <li>
                                <Link to="/register" className="btn btn-warning">Register</Link>
                            </li>
                            <li className="nav-item">
                                {username ? <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
                                : <Link to="/login" className="btn btn-light">Login</Link>}
                            </li>
                            <li className="nav-item">
                                <Link to="/agents" className={`nav-link${(username ? "" : " disabled")}`}>VIEW AGENTS</Link> 
                            </li>
                            <li className="nav-item">
                                <Link to="/add" className={`nav-link${(username ? "" : " disabled")}`}>ADD AGENT</Link>
                            </li>

                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a>
                                    < Link to="/add" className={`nav-link${(username ? "" : " disabled")}`}>ADD AGENT</Link>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>



            {/* 
        <div className="row align-items-center">
            <div className="col d-flex justify-content-center mb-1">
                <Link to="/" className="btn btn-primary me-1">Home</Link>
                <Link to="/add" className={`btn btn-primary me-1${(username ? "" : " disabled")}`}>Add</Link>
                <Link to="/about" className="btn btn-primary me-1">About</Link>
                {username ? <button className="btn btn-dark" onClick={logout}>Logout</button>
                    : <Link to="/login" className="btn btn-light">Login</Link>}
            </div>
        </div> */}

        </>
    );
}

export default Nav;