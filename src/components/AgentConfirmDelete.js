import { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router";
import { findById, deleteById } from "../services/Agents";
import LoginContext from "../contexts/LoginContext";

function AgentConfirmDelete() {

    const [agent, setAgent] = useState({ firstName: "",  middleName: "", lastName: "" });
    const history = useHistory();
    const { id } = useParams();
    const { jwt } = useContext(LoginContext);

    useEffect(() => {
        if (id) {
            findById(id)
                .then(a => setAgent(a))
                .catch(() => history.push("/failure"));
        }
    }, [history, id]);

    const yesDelete = () => {
        deleteById(agent.agentId, jwt)
            .then(() => history.push("/"))
            .catch(() => history.push("/failure"));
    };
    const cancel = () => history.push("/");

    return (
        <div>
            <h2>Delete {agent.firstName} {agent.middleName} {agent.lastName}?</h2>
            <div className="alert alert-danger">
                <p>
                    All data for {agent.firstName} {agent.middleName} {agent.lastName} will be permanently deleted.
                </p>
                Are you sure?
            </div>
            <div>
                <button className="btn btn-danger me-2" onClick={yesDelete}>Delete Forever</button>
                <button className="btn btn-secondary" onClick={cancel}>Cancel</button>
            </div>
        </div>
    );
}

export default AgentConfirmDelete;