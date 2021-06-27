import { useHistory } from "react-router-dom";

function Error() {
    const history = useHistory();

    return (
        <main>
            <p>Error: {history.location.state.msg}</p>
            <button onClick={() => {
                history.goBack();
            }}>
                Back to Form
            </button>
        </main>
    );
}

export default Error;