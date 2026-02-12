const BASE_URL = "https://v2.api.noroff.dev/auth";

//Register a new user
export async function registerUser(userData) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.errors?.[0]?.message || "Registration failed, check console for details"
        );
    }

    return data;
}

//Login user
export async function loginUser(credentails) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentails)
    });

    const data = await response.json();

     if (!response.ok) {
        throw new Error(
            data.errors?.[0]?.message || "Login failed"
        );
    }

    return data;
}