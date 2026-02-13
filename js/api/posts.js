const BASE_URL = "https://v2.api.noroff.dev/social/posts";
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

//Get all posts
export async function getAllPosts() {
    const response = await fetch(`${BASE_URL}?_author=true`, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch posts.")
    }

    const data = await response.json();
    return data.data;
}

//Get single post
export async function getSinglePost(postId) {
    const response = await fetch(`${BASE_URL}/${postId}?_author=true&_comments=true&_reactions=true`, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch post.")
    }

    const data = await response.json();
    return data.data;
    
}

//Search posts
export async function searchPosts(query) {
    const response = await fetch(
        `${BASE_URL}/search?q=${encodeURIComponent(query)}`,
        { headers: getHeaders()

    });

    if (!response.ok)  {
        throw new Error("Failed to search posts.");
    }

    const data = await response.json();
    return data.data;
}


//Create post
export async function createPost(postData) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        throw new Error("Failed to create post.")
    }

    const data = await response.json();
    return data.data;
}

// Edit post 
export async function editPost(postId, postData) {
    const response = await fetch(`${BASE_URL}/${postId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        throw new Error("Failed to edit post.")
    }

    const data = await response.json();
    return data.data;
}