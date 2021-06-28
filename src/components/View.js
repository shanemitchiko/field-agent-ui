import { useState, useEffect } from "react";
import { findAll } from "../services/Agents";
import { useHistory } from "react-router";
import Agents from "./Agents";

function View() {
    const [agent, setAgents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        findAll()
            .then(setAgents)
            .catch(() => history.push("/failure"));
    }, [history]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">FIELD AGENTS</h1>
                        <hr />
                    </div>
                </div>
            </div>

            <div className="row">
                {agent.map(agent => (
                    <Agents key={agent.agentId} agent={agent} />
                ))}
            </div>
        </>
    );
}

export default View;