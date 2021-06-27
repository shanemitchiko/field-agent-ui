const url = "http://localhost:8080/api/agent";


export async function findAll() {
    const response = await fetch(url);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }
    return response.json();
}

export async function findById(agentId) {
    const response = await fetch(`${url}/${agentId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }
    return response.json();
}

export async function add(agent) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(agent)
    };

    const response = await fetch(url, init);

    if (response.status !== 201) {
        return Promise.reject("response is not 201 CREATED");
    }
}

export async function update(agent) {
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(agent)
    }

    const response = await fetch(`${url}/${agent.agentId}`, init);

    if (response.status !== 204) {
        return Promise.reject("response is not 204 NO CONTENT");
    }
}

export async function save(agent) {
    if (agent.agentId > 0) {
        await update(agent);
    } else {
        await add(agent);
    }
    return findAll();
}

export async function deleteById(agentId) {
    const init = { method: "DELETE" };

    console.log(`${url}/${agentId}`);
    const response = await fetch(`${url}/${agentId}`, init);

    if (response.status !== 204) {
        return Promise.reject("response not 204 NO CONTENT");
    }

    return findAll();
}



