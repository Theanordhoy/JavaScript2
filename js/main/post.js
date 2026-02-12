import { getSinglePost } from "../api/posts.js";
import { renderSinglePost } from "../ui/renderPost.js";

const container = document.getElementById("singlePostContainer");

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

//Load single post
async function fetchSinglePost() {
    try {

        if (!postId) {
            throw new Error("No post ID found in URL");
        }

        const post = await getSinglePost(postId);
        renderSinglePost(post, container);
    
    } catch (error) {
        console.error("Error fetching post:", error);
        container.innerHTML = "<p class='error'>Error loading post.</p>";
    }
}


fetchSinglePost();

