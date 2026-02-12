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
    postReactions.className = "post-reactions";
    postReactionsIcon.className = "fa-regular fa-heart";
    postDate.className = "post-date";
    postDateIcon.className = "fa-regular fa-clock";


    postComments.appendChild(postCommentsIcon);
    postComments.append(`${post._count?.comments || 0}`);

    postReactions.appendChild(postReactionsIcon);
    postReactions.append(`${post._count?.reactions || 0}`);

    postDate.appendChild(postDateIcon);
    postDate.append(`${new Date(post.created).toLocaleDateString()}`);

    postMeta.appendChild(postComments);
    postMeta.appendChild(postReactions);
    postMeta.appendChild(postDate);

    postCard.appendChild(postMeta);
   

    //Comments list
        const commentsSection = document.createElement("div");
        const commentsTitle = document.createElement("h3")

        commentsSection.className = "comments-section";
        commentsTitle.textContent = "Comments";

        commentsSection.appendChild(commentsTitle);

        if (post.comments?.length) {
            post.comments.forEach(comment => {
                
                const commentItem = document.createElement("div");
                commentItem.className = "comment-item";
         
        //Avatar
        if (comment.author?.avatar?.url) {
            const avatar = document.createElement("img");
            avatar.src = comment.author.avatar.url;
            avatar.alt = comment.author.avatar.alt || "User avatar";
            avatar.className = "comment-avatar";
            commentItem.appendChild(avatar);
        }

        //Name and comment
        const text = document.createElement("span");
        text.textContent = `${comment.author?.name || "Anonymous"}: ${comment.body}`;

        commentItem.appendChild(text);
        commentsSection.appendChild(commentItem);
    });
    
    }  else {
        const noComments = document.createElement("p");
        noComments.textContent = "No comments yet.";
        commentsSection.appendChild(noComments);
    }

    postCard.appendChild(commentsSection);
    container.appendChild(postCard);
}












