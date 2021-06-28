import { useState, useEffect, useContext } from "react";
import { findById, add, update } from "../services/Agents";
import { useHistory, useParams } from "react-router";
import LoginContext from "../contexts/LoginContext";
import { emptyAgent } from "./data";
import './AgentForm.css';

function AgentForm() {

    const [agent, setAgent] = useState(emptyAgent);

    const history = useHistory();
    
    const { username } = useContext(LoginContext);

    if (!username) {
        history.push("/");
    }

    const { agentId } = useParams();
    console.log(agentId);

    useEffect(() => {
        if (agentId) {
        findById(agentId).then((data) => {
            setAgent(data);
        });
        }
    }, [history, agentId]);

    const onChange = evt => {
        const nextAgent = { ...agent };
        nextAgent[evt.target.name] = evt.target.value;
        setAgent(nextAgent);
    };

    const onSubmit = evt => {
        evt.preventDefault();
        if (agent.agentId > 0) {
            update(agent)
                .then(() => history.push("/"))
                .catch(() => history.push("/failure"));
        } else {
            add(agent)
                .then(() => history.push("/"))
                .catch(() => history.push("/failure"));
        }
    };

    const cancel = evt => {
        evt.preventDefault();
        history.push("/");
    };

    return (
        
        <form onSubmit={onSubmit}>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">AGENT FORM</h1>
                        <hr />
                    </div>
                </div>
            </div>

            <h2 agentId="formHeader">{`${(agent.agentId > 0 ? "Edit" : "Add")} an agent`}</h2>
            <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input type="text" className="form-control" agentId="firstName" name="firstName" required
                    value={agent.firstName} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="middleName">Middle Name</label>
                <input type="text" className="form-control" agentId="middleName" name="middleName" 
                    value={agent.middleName} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" agentId="lastName" name="lastName" required
                    value={agent.lastName} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="dob">Date Of Birth</label>
                <input type="date" min="1900-06-21" max="2009-06-21" className="form-control" agentId="dob" name="dob" required
                    value={agent.dob} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="heightInInches">Height in Inches</label>
                <input type="number" min="36" max="96" className="form-control" agentId="heightInInches" name="heightInInches" required
                    value={agent.heightInInches} onChange={onChange} />
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-primary me-2">Save</button>
                <button className="btn btn-secondary" onClick={cancel}>Cancel</button>
            </div>
        </form>
    );
}

export default AgentForm;