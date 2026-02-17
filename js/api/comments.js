const BASE_URL = "https://v2.api.noroff.dev/social";
const API_KEY = "143a7d73-1893-43f4-bca0-8f81d8e2443f";

function getHeaders() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("No access token found. Please log in.");
    }

    return {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json"
    };
}

//Create commment or reply to comment
export async function createComment(postId, body, replyToId = null) {
    const payload = { body: body };

    if (replyToId !== null) {
        payload.replyToId = Number(replyToId);
    }

    const response = await fetch(
        `${BASE_URL}/posts/${postId}/comment`,
        {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(payload)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Failed to create comment.");
    }

    return data.data;
}


//React to a post
export async function reactToPost(postId) {

    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("No access token found.")
    }

    const response = await fetch(
        `${BASE_URL}/posts/${postId}/react/🙂`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY
            } 
        }
    );

    if (!response.ok) {
       throw new Error(`Reaction failed: ${response.status}`);
    }

    return true;
};