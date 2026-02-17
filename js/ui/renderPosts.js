import { deletePost } from "../api/posts.js";

/**
 * Renders a list of posts into the specified container. 
 * Clears the container before rendering new posts cards.
 * Each post card includes author, title, body, image url(if availeble), tags and meta information(comments, reactions and date).
 * Adds edit and delete buttons for posts created by the logged in user.
 * @param {Array<Object>} posts - An array of post objects to be rendered. Each post object should contain properties like author, title, body, image url, tags and meta information.
 * @param {HTMLElement} container - The DOM element where the posts will be rendered.
 * @returns {void} - This function does not return anything. It directly manipulates the DOM to display the posts.
 * 
 * @example
 * const posts = await getAllPosts();
 * const container = document.getElementById("postsContainer");
 * renderPosts(posts, container);
 */
export function renderPosts(posts, container) {

    container.innerHTML = "";

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
        
        if (post.author) {
            const authorSection = document.createElement("div");
            const authorName = document.createElement("a");
    
             if(post.author.avatar?.url) {
                const avatar = document.createElement("img");
                avatar.src = post.author.avatar.url;
                avatar.alt = post.author.avatar.alt || "Author Avatar";
                avatar.className = "author-avatar";
                authorSection.appendChild(avatar);
            }
    
            authorSection.className = "post-author";
            authorName.textContent = post.author.name || "Unknown";
            authorName.href = `profile.html?name=${post.author.name}`;
            authorSection.appendChild(authorName);
    
            postCard.appendChild(authorSection);
        }

        const username = localStorage.getItem("username");

        if (post.author?.name === username) {
            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");
            editButton.className = "edit-button";
            deleteButton.className = "delete-button";
            editButton.textContent = "Edit";
            deleteButton.textContent = "Delete";
            postCard.appendChild(editButton);
            postCard.appendChild(deleteButton);

            editButton.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = `../editPost.html?id=${post.id}`;
            });

            deleteButton.addEventListener("click", async (e) => {
                e.preventDefault();
                if (confirm("Are you sure you want to delete this post?")) {
                    try {
                        await deletePost(post.id);
                        postCard.remove();
                    } catch (error) {
                        console.error("Error deleting post:", error);
                        alert("Failed to delete post. Please try again.");
                    }
                }
            });
        }
    
        postCard.appendChild(postTitle);
        postCard.appendChild(postBody);

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

        postCard.addEventListener("click", () => {
            window.location.href = `post.html?id=${post.id}`;
        });

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
        container.appendChild(postCard);
    });
}


    
