export function renderSinglePost(post, container) {

    
    container.innerHTML = "";

    const postCard = document.createElement("div");
    postCard.className = "post-card";

     //Author
    if (post.author) {
        const authorSection = document.createElement("div");
        const authorName = document.createElement("p");

         if(post.author.avatar?.url) {
            const avatar = document.createElement("img");
            avatar.src = post.author.avatar.url;
            avatar.alt = post.author.avatar.alt || "Author Avatar";
            avatar.className = "author-avatar";
            authorSection.appendChild(avatar);
        }

        authorSection.className = "post-author";
        authorName.textContent = post.author.name || "Unknown";
        authorSection.appendChild(authorName);

        postCard.appendChild(authorSection);
    }

    //Title
    const postTitle = document.createElement("h2");
    postTitle.className = "post-title";
    postTitle.textContent = post.title || "Untitled Post";
    postCard.appendChild(postTitle);

    //Body
    const postBody = document.createElement("p");
    postBody.className = "post-body";
    postBody.textContent = post.body || "";
    postCard.appendChild(postBody);

    //Tags
     if (post.tags?.length) {
        const postTags = document.createElement("p");
        postTags.className = "post-tags";
        postTags.textContent = `#${post.tags.join(" #")}`;
        postCard.appendChild(postTags);
    }

    //Image
      if (post.media?.url) {
        const postImage = document.createElement("img");
        postImage.src = post.media.url;
        postImage.alt = post.media.alt || "Post Image";
        postImage.className = "post-image";
        postCard.appendChild(postImage);
    }

    //Meta
    const postMeta = document.createElement("div");
    const postComments = document.createElement("span");
    const postCommentsIcon = document.createElement("i");
    const postReactions = document.createElement("span");
    const postReactionsIcon = document.createElement("i");
    const postDate = document.createElement("span");
    const postDateIcon = document.createElement("i");

    postMeta.className = "post-meta";
    postComments.className = "post-comments";
    postCommentsIcon.className = "fa-regular fa-comment";
    postDate.className = "post-date";
    postDateIcon.className = "fa-regular fa-clock";


    postComments.appendChild(postCommentsIcon);
    postComments.append(`${post._count?.comments || 0}`);

    //Reactions
    postReactions.className = "post-reactions";
    postReactions.style.cursor = "pointer";
    postReactions.classList.add("reaction-button");

    const currentUser = localStorage.getItem("username");

    //Deafult icon
    postReactionsIcon.className = "fa-regular fa-face-smile"

    //Find reaction
    const smileReaction = post.reactions?.find(r => r.symbol === "👍");

    //Check if current user exists in reactors
    const hasReacted = smileReaction?.reactors?.some (
        username => username === currentUser
    );
      
    if (hasReacted) {
        postReactionsIcon.className = "fa-solid fa-face-smile";
    }

    postReactions.appendChild(postReactionsIcon);
    postReactions.append(`${post._count?.reactions || 0}`);

    //

    postDate.appendChild(postDateIcon);
    postDate.append(`${new Date(post.created).toLocaleDateString()}`);

    postMeta.appendChild(postComments);
    postMeta.appendChild(postReactions);
    postMeta.appendChild(postDate);

    postCard.appendChild(postMeta);

    
    //Comments section 
        const commentsSection = document.createElement("div");
        commentsSection.className = "comments-section";

        const commentsTitle = document.createElement("h3");
        commentsTitle.textContent = "Comments";
        commentsSection.appendChild(commentsTitle);

        //Comment form (main form)
        const commentForm = document.createElement("form");
        commentForm.className = "comment-form";

        const commentInput = document.createElement("textarea");
        commentInput.className = "comment-input";
        commentInput.placeholder = "Write a comment...";
        commentInput.required = true;
        commentInput.id = "commentInput";

        const label = document.createElement("label");
        label.textContent = "Write a comment";
        label.setAttribute("for", "commentInput");
        label.className = "sr-only";

        const commentButton = document.createElement("button");
        commentButton.className = "comment-button";
        commentButton.type = "submit";
        commentButton.textContent = "Post";

        commentForm.appendChild(label);
        commentForm.appendChild(commentInput);
        commentForm.appendChild(commentButton);
        commentsSection.appendChild(commentForm);

        //Group commments
        const topLevelComments = post.comments?.filter(c => !c.replyToId);
        const replies = post.comments?.filter(c => c.replyToId);

        //Render top level comments
        topLevelComments?.forEach(comment => {
            const commentItem = document.createElement("div");
            commentItem.className = "comment-item";
            commentItem.dataset.commentId = comment.id;

              
         //Avatar
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

            const body = document.createElement("p");
            body.className = "comment-body";
            body.textContent = comment.body;
            commentItem.appendChild(body);

            //Replybutton
            const replyButton = document.createElement("button");
            replyButton.textContent = "Reply";
            replyButton.className = "reply-button";
            commentItem.appendChild(replyButton);

            //Reply container
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

    
    if (!post.comments?.length) {
        const noComments = document.createElement("p");
        noComments.textContent = "No comments yet.";
        commentsSection.appendChild(noComments)
    }

    postCard.appendChild(commentsSection);
    container.appendChild(postCard);
}












