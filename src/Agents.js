import React from 'react';
import { useState, useEffect } from "react";
import AgentForm from "./AgentForm";
import AgentConfirmDelete from "./AgentConfirmDelete";
import "./Agents.css";

const View = {
    AGENTS: 0,
    FORM: 1,
    CONFIRM_DELETE: 2
};

function Agents() {

    const [agents, setAgents] = useState([]);
    const [currentView, setCurrentView] = useState(View.AGENTS)
    const [currentAgent, setCurrentAgent] = useState();

    const fetchAll = () => {
        return fetch("http://localhost:8080/api/agent")
            .then(r => {
                if (r.status === 200) {
                    return r.json();
                }
                throw new Error("fetch all agents wasn't not 200 OK");
            })
            .then(setAgents);
    };

    useEffect(() => {
        fetchAll()
            .catch(err => console.error(err));
    }, [agents]);

    const addClick = () => {
        setCurrentAgent();
        setCurrentView(View.FORM);
    };

    const updateClick = agent => {
        setCurrentAgent(agent);
        setCurrentView(View.FORM);
    };

    const deleteClick = agent => {
        setCurrentAgent(agent);
        setCurrentView(View.CONFIRM_DELETE);
    };




    const saveAgent = agent => {
        if (agent) {
            if (agent.agentId > 0) {
                put(agent);
            } else {
                post(agent);
            }
        }
        setCurrentView(View.AGENTS);
    };

    async function put(agent) {
        const jAgent = {
            "agentId": agent.agentId,
            "firstName": agent.firstName,
            "middleName": agent.middleName,
            "lastName": agent.lastName,
            "dob": agent.dob,
            "heightInInches": agent.heightInInches,
            "agencies": []
        }

        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify(jAgent)
        }


        const response = await fetch(`http://localhost:8080/api/agent/${agent.agentId}`, init);

        if (response.status === 404) {
            console.log("Agent not found.");
        } else if (response.status === 204) {
            setAgents(json => setAgents([...agents, json]))
            console.log("Agent updated!");
        } else {
            console.log(`Agent id ${jAgent.agentId} update failed with status ${response.status}.`);
        }
    };


    async function post(agent) {
        const jAgent = {
            "firstName": agent.firstName,
            "middleName": agent.middleName,
            "lastName": agent.lastName,
            "dob": agent.dob,
            "heightInInches": agent.heightInInches
        }

        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify(jAgent)
        }

        const response = await fetch(`http://localhost:8080/api/agent/`, init);

        if (response.status !== 201) {
            console.log("Failed to save the Agent.");
            return Promise.reject("response is not 200 OK");
        } else {
            setAgents(json => setAgents([...agents, json]))
            console.log("Agent created")
        }
        const json = await response.json();
        console.log(json)
    };




    

    const confirmDelete = (shouldDelete, agentId) => {
        if (shouldDelete) {
            doDelete(agentId)
        }
        setCurrentView(View.AGENTS);
    };




    async function doDelete(agentId) {
        fetch(`http://localhost:8080/api/agent/${agentId}`, { method: "DELETE" })
            .then(r => {
                if (r.status === 204) {
                    setAgents(agents.filter(a => a.agentId !== agentId))
                    console.log("Agent deleted!")
                } else if (r.status === 404) {
                    return Promise.reject("Agent not found");
                } else {
                    return Promise.reject(`Delete failed with status: ${r.status}`);
                }
            })
            .catch(console.error);
    };

    if (currentView === View.FORM) {
        return <AgentForm saveAgent={saveAgent} currentAgent={currentAgent} />;
    } else if (currentView === View.CONFIRM_DELETE) {
        return <AgentConfirmDelete confirm={confirmDelete} currentAgent={currentAgent} />;
    }

    return (
        <>
            <nav id="navigation" className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <a className="navbar-brand" href="index.html">
                        FIELD AGENTS
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/view">
                                    VIEW
                                </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link " onClick={addClick}>
                                    ADD AGENT
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">FIELD-AGENTS</h1>
                        <hr />
                    </div>
                </div>
            </div>










            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th id="th1" scope="col">First Name</th>
                        <th id="th2" scope="col">Middle Name</th>
                        <th id="th3"scope="col">Last Name</th>
                        <th id="th4"scope="col">Date Of Birth</th>
                        <th id="th5"scope="col">Height (in)</th>
                        <th id="th6" scope="col">Update</th>

                    </tr>
                </thead>
                <tbody className="tbody-dark">
                    {agents && agents.map(a => <tr key={a.agentId} >
                        <td headers="th1" className="col text-align-center">{a.firstName}</td>
                        <td headers="th2" className="col text-align-center">{a.middleName}</td>
                        <td headers="th3" className="col text-align-center">{a.lastName}</td>
                        <td headers="th4" className="col text-align-center">{a.dob}</td>
                        <td headers="th5" className="col text-align-center">{a.heightInInches}</td>
                        <td headers="th6" className="col ">
                            <button className="btn btn-danger me-2" onClick={() => deleteClick(a)}>Delete</button>
                            <button className="btn btn-info" onClick={() => updateClick(a)}>Edit</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>















            {/* <div className="row grid-header">
                <div className="col">First Name</div>
                <div className="col">Middle Name</div>
                <div className="col">Last Name</div>
                <div className="col">Date Of Birth</div>
                <div className="col">Height (in)</div>
                <div className="col"></div>
            </div>
            {agents && agents.map(a => <div key={a.id} className="row">
                <div className="col">{a.firstName}</div>
                <div className="col">{a.middleName}</div>
                <div className="col">{a.lastName}</div>
                <div className="col">{a.dob}</div>
                <div className="col">{a.heightInInches}</div>
                <div className="col">
                    <button className="btn btn-danger me-2" value={a.id} onClick={deleteClick}>Delete</button>
                    <button className="btn btn-info" value={a.id} onClick={updateClick}>Edit</button>
                </div>
            </div>)}
            <div className="row align-items-center">
                <div className="col-md-12 text-left">
                    <button className="btn btn-primary" onClick={addClick}>Add Agent</button>
                </div>
            </div> */}
        </>
    );
}


export default Agents;