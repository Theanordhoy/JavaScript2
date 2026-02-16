const BASE_URL = "https://v2.api.noroff.dev/social/profiles";
const API_KEY = "143a7d73-1893-43f4-bca0-8f81d8e2443f";

function getHeaders() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("No access token found. Please log in.")
    }

    return {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json"
    };
}

//Get profile
export async function getProfile(name) {
    const response = await fetch(`${BASE_URL}/${name}?_followers=true&_following=true`, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile.")
    }

    const data = await response.json();
    return data.data;
}

//Get users posts
export async function getProfilePosts(name) {
    const response = await fetch(`${BASE_URL}/${name}/posts?_author=true&_comments=true&_reactions=true`,
         { headers: getHeaders()

    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile posts");
    }

    const data = await response.json();
    return data.data;
}
