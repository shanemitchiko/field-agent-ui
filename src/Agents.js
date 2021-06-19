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

    const [agents, setAgents] = useState();
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
    }, []);

    const addClick = () => {
        setCurrentAgent();
        setCurrentView(View.FORM);
    };

    const updateClick = evt => {
        const agent = agents.find(a => a.id === parseInt(evt.target.value, 10));
        if (agent) {
            setCurrentAgent(agent);
            setCurrentView(View.FORM);
        }
    };

    const deleteClick = evt => {
        const agent = agents.find(a => a.id === parseInt(evt.target.value, 10));
        if (agent) {
            setCurrentAgent(agent);
            setCurrentView(View.CONFIRM_DELETE);
        }
    };

    // const saveAgent = agent => {
    //     if (agent) {
    //         if (agent.id > 0) { // update
    //             const agentIndex = agents.findIndex(a => a.agentId === agent.agentId);
    //             const nextAgent = [...agents];
    //             nextAgent.splice(agentIndex, 1, agent);

    //             const jAgent = {
    //                 "agentId": agent.agentId,
    //                 "firstName": agent.firstName,
    //                 "middleName": agent.middleName,
    //                 "lastName": agent.lastName,
    //                 "dob": agent.dob,
    //                 "heightInInches": agent.heightInInches 
    //             }

    //             const init = {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Accept": "application/json"
    //                 },
    
    //                 body: JSON.stringify(jAgent)
    //             }

    //             fetch(`http://localhost:8080/api/agent/${agent.id}`, init)
    //                 .then(r => {
    //                     if (r.status === 204) {
    //                         return fetchAll();
    //                     }
    //                     throw new Error("Update was not 204.");
    //                 })
    //                 .then(json => setAgents([...agents, json]))
    //                 .catch(console.error);


    //         } else { // add

    //             const jAgent = {
    //                 "firstName": agent.firstName,
    //                 "middleName": agent.middleName,
    //                 "lastName": agent.lastName,
    //                 "dob": agent.dob,
    //                 "heightInInches": agent.heightInInches
    //             };

    //             const init = {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Accept": "application/json"
    //                 },
    
    //                 body: JSON.stringify(jAgent)
    //             }

    //             fetch(`http://localhost:8080/api/agent/`, init)
    //                 .then(r => {
    //                     if (r.status === 201) {
    //                         return fetchAll();
    //                     }
    //                     throw new Error("Update was not 204.");
    //                 })
    //                 .then(json => setAgents([...agents, json]))
    //                 .catch(console.error);

    //         }
    //     }
    //     setCurrentView(View.AGENTS);
    // };

    const saveAgent = agent => {
        if(agent) {
            if(agent.agentId > 0) {
                const agentIndex = agents.findIndex(a => a.agentId === agent.agentId);
                const nextAgent = [...agents];
                nextAgent.splice(agentIndex, 1, agent);
                
                const jsonAgent = {
                    "agentId": agent.agentId,
                    "firstName": agent.firstName,
                    "middleName": agent.middleName,
                    "lastName": agent.lastName,
                    "dob": agent.dob,
                    "heightInInches": agent.heightInInches
                };
            
                const init = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(jsonAgent)
                };
            
                fetch(`http://localhost:8080/api/agent/${agent.agentId}`, init)
                    .then(response => {
                        if (response.status !== 201) {
                            return Promise.reject("response is not 200 OK");
                        }
                        return response.json();
                    })
                    .then(json => setAgents([...agents, json])) // Spread new state
                    .catch(console.log);
            } else {
                const jsonAgent = {
                    "firstName": agent.firstName,
                    "middleName": agent.middleName,
                    "lastName": agent.lastName,
                    "dob": agent.dob,
                    "heightInInches": agent.heightInInches
                };
            
                const init = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(jsonAgent)
                };
            
                fetch("http://localhost:8080/api/agent", init)
                    .then(response => {
                        if (response.status !== 201) {
                            return Promise.reject("response is not 200 OK");
                        }
                        return response.json();
                    })
                    .then(json => setAgents([...agents, json])) // Spread new state
                    .catch(console.log);
            }
        }
        setCurrentView(View.AGENTS);
    };

    const confirmDelete = (shouldDelete, agentId) => {
        if (shouldDelete) {
            fetch(`http://localhost:8080/api/agent/${agentId}`, { method: "DELETE" })
                .then(r => {
                    if (r.status === 204) {
                        return fetchAll();
                    }
                    throw new Error("Delete was not 204.");
                })
                .catch(console.error);
        }
        setCurrentView(View.AGENTS);
    };

    if (currentView === View.FORM) {
        return <AgentForm saveAgent={saveAgent} currentAgent={currentAgent} />;
    } else if (currentView === View.CONFIRM_DELETE) {
        return <AgentConfirmDelete confirm={confirmDelete} currentAgent={currentAgent} />;
    }

    return (
        <>
            <div className="row align-items-center">
                <h1 className="col">A G E N T S</h1>
            </div>
            <div className="row grid-header">
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
            <div className="col d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={addClick}>Add Agent</button>
                </div>
            </div>
        </>
    );
}

export default Agents;