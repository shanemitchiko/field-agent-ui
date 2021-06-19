import { useState, useEffect } from "react";
import { emptyAgent } from "./data";

function AgentForm({currentAgent = emptyAgent, saveAgent}) {

    const [agent, setAgent] = useState({...currentAgent});

    const onChange = evt => {
        const nextAgent = { ...agent };
        nextAgent[evt.target.name] = evt.target.value;
        setAgent(nextAgent);
    };

    const onSubmit = evt => {
        evt.preventDefault();
        saveAgent(agent);
    };

    const cancel = evt => {
        evt.preventDefault();
        saveAgent(null);
    };

    return (
        <form onSubmit={onSubmit}>
        <h2>{`${(agent.id > 0 ? "Edit" : "Add")} an agent`}</h2>
        <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input type="text" className="form-control" id="firstName" name="firstName"
                value={agent.firstName} onChange={onChange} />
        </div>
        <div className="form-group">
            <label htmlFor="middleName">Middle Name</label>
            <input type="text" className="form-control" id="middleName" name="middleName"
                value={agent.middleName} onChange={onChange} />
        </div>
        <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" id="lastName" name="lastName"
                value={agent.lastName} onChange={onChange} />
        </div>
        <div className="form-group">
            <label htmlFor="dob">Date Of Birth</label>
            <input type="text" className="form-control" id="dob" name="dob"
                value={agent.dob} onChange={onChange} />
        </div>
        <div className="form-group">
            <label htmlFor="heightInInches">Height in Inches</label>
            <input type="text" className="form-control" id="heightInInches" name="heightInInches"
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