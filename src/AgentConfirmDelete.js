function AgentConfirmDelete({ currentAgent, confirm }) {

    const yesDelete = () => confirm(true, currentAgent.agentid);
    const cancel = () => confirm(false);

    return (
        <div>
            <h2>Delete {currentAgent.agentid}?</h2>
            <div className="alert alert-danger">
                <p>
                    All data for {currentAgent.agentid} will be permanently deleted.
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