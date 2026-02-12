const apiURL = "https://v2.api.noroff.dev/social/posts";
const postsContainer = document.getElementById("postsContainer");

async function fetchPosts() {
    try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            throw new Error("No access token found. Please log in.");
        }

        const response = await fetch(apiURL, {
            headers: {
                Authorization: `Bearer ${token}`, 
                "X-Noroff-API-Key": '143a7d73-1893-43f4-bca0-8f81d8e2443f'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch posts.");
        }

        const data = await response.json();
        console.log("Fetched posts:", data);

        renderPosts(data.data);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
}

function renderPosts(posts) {
    postsContainer.innerHTML = "";

    posts.forEach(post => {
        const postCard = document.createElement("div");
        const postTitle = document.createElement("h2");
        const postBody = document.createElement("p");
        const postMeta = document.createElement("div");
        const postComments = document.createElement("span");
        const postCommentsIcon = document.createElement("i");
        const postReactions = document.createElement("span");
        const postReactionsIcon = document.createElement("i");
        const postDate = document.createElement("span");
        const postDateIcon = document.createElement("i");
        const anchor = document.createElement("a");

        postCard.className = "post-card";
        postTitle.className = "post-title";
        postBody.className = "post-body";
        postMeta.className = "post-meta";
        postComments.className = "post-comments";
        postCommentsIcon.className = "fa-regular fa-comment";
        postReactions.className = "post-reactions";
        postReactionsIcon.className = "fa-regular fa-face-smile";
        postDate.className = "post-date";
        postDateIcon.className = "fa-regular fa-clock";

        postTitle.textContent = post.title || "Untitled Post";
        postBody.textContent = post.body || "";
        anchor.href = `post.html?id=${post.id}`;
        
        postCard.appendChild(postTitle);
        postCard.appendChild(postBody);
        anchor.appendChild(postCard);

        if (post.tags?.length) {
            const postTags = document.createElement("p");
            postTags.className = "post-tags";
            postTags.textContent = `#${post.tags.join(" #")}`;
            postCard.appendChild(postTags);
        }

        if (post.media?.url) {
            const postImage = document.createElement("img");
            postImage.src = post.media.url;
            postImage.alt = post.media.alt || "Post Image";
            postImage.className = "post-image";
            postCard.appendChild(postImage);
        }

        postComments.appendChild(postCommentsIcon);
        postComments.append(` ${post._count.comments}`);
        postReactions.appendChild(postReactionsIcon);
        postReactions.append(` ${post._count.reactions}`);
        postDate.appendChild(postDateIcon);
        postDate.append(` ${new Date(post.created).toLocaleDateString()}`);
        postMeta.appendChild(postComments);
        postMeta.appendChild(postReactions);
        postMeta.appendChild(postDate);
        postCard.appendChild(postMeta);
        postsContainer.appendChild(anchor);
    });
}

// Search function for posts based on title and body using the API's search endpoint
async function searchPosts(query) {
    try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            throw new Error("No access token found. Please log in.");
        }

        const response = await fetch(`${apiURL}/search?q=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": '143a7d73-1893-43f4-bca0-8f81d8e2443f'
            }
        });

        if(!response.ok) {
            throw new Error("Failed to search posts.");
        }

        const data = await response.json();
        renderPosts(data.data);

    } catch (error) {
        console.error("Error searching posts:", error);
    }
}

async function createPost(postData) {
    try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": '143a7d73-1893-43f4-bca0-8f81d8e2443f',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error("Failed to create post.");
        }

        const data = await response.json();
        console.log("Post created:", data);
        fetchPosts();
    } catch (error) {
        console.error("Error creating post:", error);
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchPosts");
    const searchButton = document.getElementById("searchButton");
    const createPostButton = document.getElementById("createPostButton");
    const createPostForm = document.getElementById("createPostForm");

    // Search button click event
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        console.log("Search query:", query);
        if (query) {
            searchPosts(query);
        } else {
            fetchPosts();
        }
    });

    // Allows pressing Enter to trigger search
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                searchPosts(query);
            } else {
                fetchPosts();
            }
        }
    });

    // Removes search results when input is cleared
    searchInput.addEventListener("input", () => {
        if (searchInput.value.trim() === "") {
            fetchPosts();
        }
    });

    // Show create post form when button is clicked
    createPostButton.addEventListener("click", () => {
        if (createPostForm.style.display === "none") {
            createPostForm.style.display = "block";
            createPostButton.textContent = "Cancel";
        } else {
            createPostForm.style.display = "none";
            createPostButton.textContent = "+ Create new post";
        }
    });

    // Handle create post form submission
    createPostForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("postTitle").value.trim();
        const body = document.getElementById("postBody").value.trim();
        const imageUrl = document.getElementById("postImageUrl").value.trim();

        const newPost = {
            title
        };
        if (!title) {
            alert("Title is required to create a post.");
            return;
        }
        if (body) {
            newPost.body = body;
        }
        if (imageUrl) {
            newPost.media = {
                url: imageUrl
            };
        }

        createPost(newPost);
        createPostForm.reset();
    });

});


fetchPosts();