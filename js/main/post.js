const API_URL = "https://v2.api.noroff.dev/social/posts";
const container = document.getElementById("singlePostContainer");

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

async function fetchSinglePost() {
    try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            throw new Error("No access token found. Please log in.");
        }

        if(!postId) {
            throw new Error("No post ID found in URL.");
        }

        const response = await fetch(`${API_URL}/${postId}?_author=true&_comments=true&_reactions=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": "143a7d73-1893-43f4-bca0-8f81d8e2443f"
            }
        });

        if(!response.ok) {
            throw new Error("Failed to fetch post.");
        }

        const data = await response.json();
        renderSinglePost(data.data);
    
    } catch (error) {
        console.error("Error fetching post:", error);
        container.innerHTML = "<p class='error'>Error loading post.</p>";
    }
}

function renderSinglePost(post) {
    container.innerHTML = "";

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

    postCard.className = "post-card";
    postTitle.className = "post-title";
    postBody.className = "post-body";
    postMeta.className = "post-meta";
    postComments.className = "post-comments";
    postCommentsIcon.className = "fa-regular fa-comment";
    postReactions.className = "post-reactions";
    postReactionsIcon.className = "fa-regular fa-heart";
    postDate.className = "post-date";
    postDateIcon.className = "fa-regular fa-clock";

    postTitle.textContent = post.title || "Untitled Post";
    postBody.textContent = post.body || "";

    postComments.appendChild(postCommentsIcon);
    postComments.append(`${post._count?.comments || 0}`);

    postReactions.appendChild(postReactionsIcon);
    postReactions.append(`${post._count?.reactions || 0}`);

    postDate.appendChild(postDateIcon);
    postDate.append(`${new Date(post.created).toLocaleDateString()}`);

    postMeta.appendChild(postComments);
    postMeta.appendChild(postReactions);
    postMeta.appendChild(postDate);

    postCard.appendChild(postTitle);
    postCard.appendChild(postBody);
    postCard.appendChild(postMeta);

    //Image
    if (post.media?.url) {
        const postImage = document.createElement("img");
        postImage.src = post.media.url;
        postImage.alt = post.media.alt || "Post Image";
        postImage.className = "post-image";
        postCard.appendChild(postImage);
    }

    //Tags
    if (post.tags?.length) {
        const postTags = document.createElement("p");
        postTags.className = "post-tags";
        postTags.textContent = `#${post.tags.join(" #")}`;
        postCard.appendChild(postTags);
    }

    container.appendChild(postCard);

    //Author
    if (post.author) {
        const authorSection = document.createElement("div");
        const authorTitle = document.createElement("h3");
        const authorName = document.createElement("p");

        authorSection.className = "post-author";
        authorTitle.textContent = "Author";
        authorName.textContent = post.author.name || "Unknown";

        authorSection.appendChild(authorTitle);
        authorSection.appendChild(authorName);

        if(post.author.avatar?.url) {
            const avatar = document.createElement("img");
            avatar.src = post.author.avatar.url;
            avatar.alt = post.author.avatar.alt || "Author Avatar";
            avatar.className = "author-avatar";
            authorSection.appendChild(avatar);
        }

        container.appendChild(authorSection);
    }

    //Comments
    const commentsSection = document.createElement("div");
    const commentsTitle = document.createElement("h3");

    commentsSection.className = "comments-section";
    commentsTitle.textContent = "Comments";

    commentsSection.appendChild(commentsTitle);

    if (post.comments?.length) {
        post.comments.forEach(comment => {
            const commentItem = document.createElement("p");
            commentItem.className = "comment-item";
            commentItem.textContent = `${comment.author?.name || "Anonymous"}: ${comment.body}`;

            commentsSection.appendChild(commentItem);
        });
    } else {
        const noComments = document.createElement("p");
        noComments.textContent = "No comments yet.";
        commentsSection.appendChild(noComments);
    }

    container.appendChild(commentsSection);
}   

fetchSinglePost();

