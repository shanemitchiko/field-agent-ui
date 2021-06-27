import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { register } from "../services/Auth";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const history = useHistory();

    const onSubmit = evt => {
        evt.preventDefault();
        register({ username, password })
            .then(() => history.push("/login"))
            .catch(err => alert(err));
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Register</h2>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username"
                    value={username} onChange={evt => setUsername(evt.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"
                    value={password} onChange={evt => setPassword(evt.target.value)} />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary me-2">Submit</button>
                <Link to="/" className="btn btn-secondary">Cancel</Link>
            </div>
        </form>
    );
}

export default Register;