import { getSinglePost } from "../api/posts.js";
import { createComment, reactToPost } from "../api/comments.js";
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
        attachReactionListener();
        attachCommentListener();
        attachReplyListener();

    } catch (error) {
        console.error("Error fetching post:", error);
        container.innerHTML = "<p class='error'>Error loading post.</p>";
    }
}

//Attach reaction after rendering
function attachReactionListener() {
    const reactionButton = document.querySelector(".reaction-button");

    if (!reactionButton) return;

    reactionButton.addEventListener("click", async () => {
        try {
            await reactToPost(postId, "👍");

            fetchSinglePost();

        } catch (error) {
            console.error("Reaction failed:", error);
        }
    });
}

//Comments
function attachCommentListener() {
    const form = document.querySelector(".comment-form");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const textarea = form.querySelector("textarea");
        const body = textarea.value.trim();
        
        if (!body) return;

        try {
            await createComment(postId, body);
            textarea.value = "";
            await fetchSinglePost();
        } catch (error) {
            console.error("Comment failed:", error);
        }
    })
}

function attachReplyListener() {
    const replyButtons = document.querySelectorAll(".reply-button");

    replyButtons.forEach(button => {
        button.addEventListener("click", () => {
            
            const commentItem = button.closest(".comment-item");
            //If replyform exists already - remove 
            const existingForm = commentItem.querySelector(".reply-form");
            if (existingForm) {
                existingForm.remove();
                return;
            }

            const replyForm = document.createElement("form");
            replyForm.className = "reply-form";

            const label = document.createElement("label");
            label.textContent = "Write a reply";
            label.setAttribute("for", "textareaId");
            label.className = "sr-only";

            const textarea = document.createElement("textarea");
            textarea.required = true;
            textarea.placeholder = "Write a reply";
            textarea.className = "comment-input";
            textarea.id = "textareaId";

            const submitBtn = document.createElement("button");
            submitBtn.type = "submit";
            submitBtn.textContent = "Post";
            submitBtn.className = "comment-button";

            replyForm.appendChild(textarea);
            replyForm.appendChild(submitBtn);

            commentItem.appendChild(replyForm);

            //Submit reply
            replyForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                const body = textarea.value.trim();
                if (!body) return;

                const replyToId = commentItem.dataset.commentId;

                try {
                    await createComment(postId, body, replyToId);
                    await fetchSinglePost();
                } catch (error) {
                    console.error("Reply failed:", error);
                }
            })
        })
    });
}
fetchSinglePost();

