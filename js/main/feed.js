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

fetchPosts();