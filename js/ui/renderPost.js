export function renderSinglePost(post, container) {

    container.innerHTML = "";

    const postCard = document.createElement("div");
    postCard.className = "post-card";

     //Author section...........................//

     //Only render author if it exists
    if (post.author) {
        const authorSection = document.createElement("div");
        authorSection.className = "post-author";
        
        //If author has avatar, render image
        if (post.author.avatar?.url) {
            const avatar = document.createElement("img");
            avatar.src = post.author.avatar.url;
            avatar.alt = post.author.avatar.alt || "Author Avatar";
            avatar.className = "author-avatar";
            authorSection.appendChild(avatar);
        }
        //render auhtor name, if missing fallback
        const authorName = document.createElement("p");
        authorName.textContent = post.author.name || "Unknown";
        authorSection.appendChild(authorName);

        postCard.appendChild(authorSection);
    }

    //Title.......
    const postTitle = document.createElement("h2");
    postTitle.className = "post-title";
    postTitle.textContent = post.title || "Untitled Post";
    postCard.appendChild(postTitle);

    //Body.........
    const postBody = document.createElement("p");
    postBody.className = "post-body";
    postBody.textContent = post.body || "";
    postCard.appendChild(postBody);

    //Tags (render tags if they exist).....
    if (post.tags?.length) {
        const postTags = document.createElement("p");
        postTags.className = "post-tags";
        postTags.textContent = `#${post.tags.join(" #")}`;
        postCard.appendChild(postTags);
    }

    //Image (render image if it exists).....
    if (post.media?.url) {
        const postImage = document.createElement("img");
        postImage.src = post.media.url;
        postImage.alt = post.media.alt || "Post Image";
        postImage.className = "post-image";
        postCard.appendChild(postImage);
    }

    //Meta section (comments, reaction, date).............
    const postMeta = document.createElement("div");
    postMeta.className = "post-meta";

    //comments count 
    const postComments = document.createElement("span");
    postComments.className = "post-comments";

    const postCommentsIcon = document.createElement("i");
    postCommentsIcon.className = "fa-regular fa-comment";

    postComments.appendChild(postCommentsIcon);
    postComments.append(`${post._count?.comments || 0}`);

    //Reactions
    const postReactions = document.createElement("span");
    postReactions.className = "post-reactions";
    postReactions.style.cursor = "pointer";
    postReactions.classList.add("reaction-button");

    const postReactionsIcon = document.createElement("i");
    postReactionsIcon.className = "fa-regular fa-face-smile";

    const currentUser = localStorage.getItem("username");

    //Find reaction object
    const smileReaction = post.reactions?.find(r => r.symbol === "👍");

    //Check if current user has reacted
    const hasReacted = smileReaction?.reactors?.some (
        username => username === currentUser
    );
    //if user has reacted, fill icon
    if (hasReacted) {
        postReactionsIcon.className = "fa-solid fa-face-smile";
    }

    postReactions.appendChild(postReactionsIcon);
    postReactions.append(`${post._count?.reactions || 0}`);

    //Date
    const postDate = document.createElement("span");
    postDate.className = "post-date";

    const postDateIcon = document.createElement("i");
    postDateIcon.className = "fa-regular fa-clock";

    postDate.appendChild(postDateIcon);
    postDate.append(`${new Date(post.created).toLocaleDateString()}`);

    //Append meta elements
    postMeta.appendChild(postComments);
    postMeta.appendChild(postReactions);
    postMeta.appendChild(postDate);

    postCard.appendChild(postMeta);

    
    //Comments section....................//
    const commentsSection = document.createElement("div");
    commentsSection.className = "comments-section";

    const commentsTitle = document.createElement("h3");
    commentsTitle.textContent = "Comments";
    commentsSection.appendChild(commentsTitle);

    //Comment form....................
    const commentForm = document.createElement("form");
    commentForm.className = "comment-form";

    const label = document.createElement("label");
    label.textContent = "Write a comment";
    label.setAttribute("for", "commentInput");
    label.className = "sr-only";

    const commentInput = document.createElement("textarea");
    commentInput.className = "comment-input";
    commentInput.placeholder = "Write a comment...";
    commentInput.required = true;
    commentInput.id = "commentInput";

    const commentButton = document.createElement("button");
    commentButton.className = "comment-button";
    commentButton.type = "submit";
    commentButton.textContent = "Post";

    commentForm.appendChild(label);
    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentButton);
    commentsSection.appendChild(commentForm);

    //Comment rendering............//
    const topLevelComments = post.comments?.filter(c => !c.replyToId);
    const replies = post.comments?.filter(c => c.replyToId);

    //Render top level comments
    topLevelComments?.forEach(comment => {
        const commentItem = document.createElement("div");
        commentItem.className = "comment-item";
        commentItem.dataset.commentId = comment.id;

              
        //Avatar + name
        const commentHeader = document.createElement("div");
        commentHeader.className = "comment-header";

        if (comment.author?.avatar?.url) {
            const avatar = document.createElement("img");
            avatar.src = comment.author.avatar.url;
            avatar.alt = comment.author.avatar.alt || "User avatar";
            avatar.className = "comment-avatar";
            commentHeader.appendChild(avatar);
        }

        const authorName = document.createElement("span");
        authorName.className = "comment-author";
        authorName.textContent = comment.author?.name || "Anonymous";

        commentHeader.appendChild(authorName);
        commentItem.appendChild(commentHeader);
        //comment body
        const body = document.createElement("p");
        body.className = "comment-body";
        body.textContent = comment.body;
        commentItem.appendChild(body);

        //Replybutton
        const replyButton = document.createElement("button");
        replyButton.textContent = "Reply";
        replyButton.className = "reply-button";
        commentItem.appendChild(replyButton);

        //Reply container.........../
        const replyContainer = document.createElement("div");
        replyContainer.className = "reply-container";

        const childReplies = replies?.filter(r => r.replyToId === comment.id);

        childReplies?.forEach(reply => {
            const replyItem = document.createElement("div");
            replyItem.className = "reply-item";

            const replyHeader = document.createElement("div");
            replyHeader.className = "comment-header";

            //Reply avatar
            if (reply.author?.avatar?.url) {
                    const replyAvatar = document.createElement("img");
                    replyAvatar.src = reply.author.avatar.url;
                    replyAvatar.alt = reply.author.avatar.alt || "User avatar";
                    replyAvatar.className = "comment-avatar";
                    replyHeader.appendChild(replyAvatar);
                   
            }

            //Author
            const replyAuthor = document.createElement("span");
            replyAuthor.className = "comment-author";
            replyAuthor.textContent = reply.author?.name || "Anonymous";
            replyHeader.appendChild(replyAuthor);

            replyItem.appendChild(replyHeader);

            //Body
            const replyBody = document.createElement("p");
            replyBody.className = "comment-body";
            replyBody.textContent = reply.body;
            replyItem.appendChild(replyBody);
                
            replyContainer.appendChild(replyItem);
        });

        commentItem.appendChild(replyContainer);
        commentsSection.appendChild(commentItem);
    })

    //if no comments exists
    if (!post.comments?.length) {
        const noComments = document.createElement("p");
        noComments.textContent = "No comments yet.";
        commentsSection.appendChild(noComments)
    }

    postCard.appendChild(commentsSection);
    container.appendChild(postCard);
}












