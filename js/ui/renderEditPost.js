export function renderEditPost(post, container, onSave) {
    
    container.innerHTML = "";

    const editPostCard = document.createElement("div");
    editPostCard.className = "edit-post-card";

    const postTitleLabel = document.createElement("label");
    const postTitleInput = document.createElement("input");
    const postBodyLabel = document.createElement("label");
    const postBodyInput = document.createElement("textarea");
    const postTagsLabel = document.createElement("label");
    const postTagsInput = document.createElement("input");
    const postImageLabel = document.createElement("label");
    const postImageInput = document.createElement("input");
    const saveButton = document.createElement("button");

    postTitleInput.id = "editPostTitle";
    postBodyInput.id = "editPostBody";
    postTagsInput.id = "editPostTags";
    postImageInput.id = "editPostImage";

    postTitleInput.name = "editPostTitle";
    postBodyInput.name = "editPostBody";
    postTagsInput.name = "editPostTags";
    postImageInput.name = "editPostImage";

    postTitleLabel.setAttribute("for", "editPostTitle");
    postBodyLabel.setAttribute("for", "editPostBody");
    postTagsLabel.setAttribute("for", "editPostTags");
    postImageLabel.setAttribute("for", "editPostImage");

    postTitleInput.type = "text";
    postTagsInput.type = "text";
    postImageInput.type = "url";

    postTitleLabel.className = "sr-only";
    postTitleInput.className = "edit-post-title";
    postBodyLabel.className = "sr-only";
    postBodyInput.className = "edit-post-body";
    postTagsLabel.className = "sr-only";
    postTagsInput.className = "edit-post-tags";
    postImageLabel.className = "sr-only";
    postImageInput.className = "edit-post-image";
    saveButton.className = "save-button";

    postTitleLabel.textContent = "Title";
    postTitleInput.value = post.title;
    postBodyLabel.textContent = "Edit the body of your post";
    postBodyInput.value = post.body || "";
    postTagsLabel.textContent = "Edit the tags of your post";
    postTagsInput.value = post.tags ? post.tags.join(" ") : "";
    postImageLabel.textContent = "Edit the image URL of your post";
    postImageInput.value = typeof post.media === "string" ? post.media :  post.media?.url || "";
    saveButton.textContent = "Save Changes";

    editPostCard.appendChild(postTitleLabel);
    editPostCard.appendChild(postTitleInput);
    editPostCard.appendChild(postBodyLabel);
    editPostCard.appendChild(postBodyInput);
    editPostCard.appendChild(postTagsLabel);
    editPostCard.appendChild(postTagsInput);
    editPostCard.appendChild(postImageLabel);
    editPostCard.appendChild(postImageInput);
    editPostCard.appendChild(saveButton);
    container.appendChild(editPostCard);

    saveButton.addEventListener("click", () => {
        const updatedPost = {
            title: postTitleInput.value.trim() || post.title,
            body: postBodyInput.value.trim() || post.body
        }
        const mediaValue = postImageInput.value.trim() || (typeof post.media === "string" ? post.media : post.media?.url);
            if (mediaValue) {
                updatedPost.media = {
                    url: mediaValue
                }
            }
        onSave(post.id, updatedPost);
    });
}