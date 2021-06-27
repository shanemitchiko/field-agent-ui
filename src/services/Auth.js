const url = "http://localhost:5000";

export async function register(user) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    }
    const response = await fetch(`${url}/create_account`, init);
    if (response.status === 201) {
        return response.json();
    }
    return Promise.reject("no dice");
}

export async function authenticate(user) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    }
    const response = await fetch(`${url}/authenticate`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("no dice");
}