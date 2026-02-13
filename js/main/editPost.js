import { getSinglePost } from "../api/posts.js";
import { renderEditPost } from "../ui/renderEditPost.js";
import { editPost } from "../api/posts.js";

const container = document.getElementById("editPostContainer");

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

//Load edit post
async function loadEditPost() {
    try {
        if (!postId) {
            throw new Error("No post ID found in URL");
        }

        const post = await getSinglePost(postId);


        renderEditPost(post, container, publishEditedPost);
    
    } catch (error) {
        console.error("Error fetching post:", error);
        container.innerHTML = "<p class='error'>Error loading post.</p>";
    }
}

loadEditPost();

// Publish edited post and redirect to post page
async function publishEditedPost(postId, postData) {
    try {
        if (!postId) {
            throw new Error("No post Id found in URL");
        }

        const editedPostData = {
            title: postData.title,
            body: postData.body,
            media: postData.media
        };

        await editPost(postId, editedPostData);
        console.log("Sending PUT data:", editedPostData);
        window.location.href = `post.html?id=${postId}`;
    } catch (error) {
        console.error("Error editing post:", error);
        alert("Something went wrong. Check your inputs and try again.");
    }
}


