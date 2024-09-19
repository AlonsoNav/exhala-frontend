const API_URL = import.meta.env.VITE_API_URL;

export async function postEncodedRequest(payload, endpoint) {
    // Convert payload to URL encoded
    const urlEncodedPayload = new URLSearchParams();
    for (const [key, value] of Object.entries(payload)) {
        urlEncodedPayload.append(key, value);
    }

    const requestOptions = {
        method: 'POST',
        mode: "cors",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: urlEncodedPayload,
        credentials: 'include'
    }

    try {
        return await fetch(`${API_URL}${endpoint}`, requestOptions)
    } catch (error) {
        console.log(error)
    }
}

export async function postRequest(payload, endpoint) {
    const requestOptions = {
        method: 'POST',
        mode: "cors",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
        credentials: 'include'
    }

    try {
        return await fetch(`${API_URL}${endpoint}`, requestOptions)
    } catch (error) {
        console.log(error)
    }
}