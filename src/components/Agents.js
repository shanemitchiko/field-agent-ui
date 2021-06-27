import { Link } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "../contexts/LoginContext";

function Agents({ agent }) {

    const {username} = useContext(LoginContext);

    return (
        <>
            <div id="table-container">
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
                    <tr key={agent.agentId} >
                        <td headers="th1" className="col text-align-center">{agent.firstName}</td>
                        <td headers="th2" className="col text-align-center">{agent.middleName}</td>
                        <td headers="th3" className="col text-align-center">{agent.lastName}</td>
                        <td headers="th4" className="col text-align-center">{agent.dob}</td>
                        <td headers="th5" className="col text-align-center">{agent.heightInInches}</td>
                        <td headers="th6" className="col ">
                            <Link to={`/edit/${agent.agentId}`} className={`btn btn-secondary me-1 mb-1${(username ? "" : " disabled")}`}>Edit</Link>
                            <Link to={`/delete/${agent.agentId}`} className={`btn btn-danger${(username ? "" : " disabled")}`}>Delete</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </>
    );
}


export default Agents;