import { useState, useEffect } from "react";
import {findAll} from "../services/Agents";
import { useHistory } from "react-router";
import Agents from "./Agents";

function Home() {
    const [agent, setAgents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        findAll()
            .then(setAgents)
            .catch(() => history.push("/failure"));
    }, [history]);

    return (
            <>
            <img src="https://pavbca.com/walldb/original/1/c/c/206397.jpg" width="1300" height="1000"></img>
            </>
    );
}

export default Home;