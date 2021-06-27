import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import LoginContext from "../contexts/LoginContext";
import { authenticate } from "../services/Auth";

function Login() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const { afterAuth } = useContext(LoginContext);
    const history = useHistory();

    function onSubmit(evt) {
        evt.preventDefault();
        authenticate({ username: name, password })
            .then(body => {
                const { jwt_token } = body;
                console.log(jwt_token);
                afterAuth(jwt_token);
                history.push("/");
            }).catch(err => alert(err));
    }

    return (<form onSubmit={onSubmit}>
        <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control"
                value={name} onChange={evt => setName(evt.target.value)} />
        </div>
        <div className="form-group mb-2">
            <label>Password</label>
            <input type="password" className="form-control"
                value={password} onChange={evt => setPassword(evt.target.value)} />
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary me-2">Submit</button>
            <Link to="/" className="btn btn-secondary">Cancel</Link>
        </div>
    </form>);
}

export default Login;