import { useState, useEffect } from "react";
import { emptyAgent } from "./data";
import './AgentForm.css';


// const messages = document.getElementById("messages");
// function err(msg) {
//     messages.className ="alert alert-danger"
//     messages.innerText = msg;
// }

function AgentForm({ currentAgent = emptyAgent, saveAgent }) {

    const [agent, setAgent] = useState({ ...currentAgent });


    const onChange = evt => {
        const nextAgent = { ...agent };
        nextAgent[evt.target.name] = evt.target.value;
        setAgent(nextAgent);
    };

    const onSubmit = evt => {
        evt.preventDefault();

        //validations
        // const firstName = document.getElementById("firstName").value.trim();
        // if (firstName.length === 0) {
        //     err("First name is required");
        //     return;
        // }

        // const lastName = document.getElementById("lastName").value.trim();
        // if (lastName.length === 0) {
        //     err("Last name is required");
        //     return;
        // }

        // const dob = document.getElementById("dob")
        // if (dob > "2009-06-21"){
        //     err("Agents younger than 12 years old are not allowed")
        //     return;
        // }

        // const heightInInches = document.getElementById("heightInInches")
        // if (heightInInches < 36 || heightInInches > 96) {
        //     err("Qualified height must be between 36 and 96 inches")
        //     return;
        // }


        saveAgent(agent);
    };

    const cancel = evt => {
        evt.preventDefault();
        saveAgent(null);
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

            <h2 id="formHeader">{`${(agent.agentId > 0 ? "Edit" : "Add")} an agent`}</h2>
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