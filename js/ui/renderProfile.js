import { renderPosts } from "./renderPosts.js";
import { followUser, unfollowUser, getProfile } from "../api/profiles.js";

export function renderProfile(profile, container) {
    container.innerHTML = "";

    //Profile header
    const header = document.createElement("div");
    header.className = "profile-header";

    //Banner
    if (profile.banner?.url) {
        const banner = document.createElement("img");
        banner.src = profile.banner.url;
        banner.alt = profile.banner.alt || "Profile banner";
        banner.className = "profile-banner";
        header.appendChild(banner);
    }

    //wrapper avatar + name 
    const userRow = document.createElement("div");
    userRow.className = "profile-user-row";

    //Avatar
    if (profile.avatar?.url) {
        const avatar = document.createElement("img");
        avatar.src = profile.avatar.url;
        avatar.alt = profile.avatar.alt || "Profile avatar";
        avatar.className = "profile-avatar";
        userRow.appendChild(avatar);
    }

    //Name
    const name = document.createElement("h2");
    name.textContent = profile.name;
    name.className = "profile-name";
    userRow.appendChild(name);

    header.appendChild(userRow);

    if (profile.bio) {
        const bio = document.createElement("div");
        bio.textContent = profile.bio;
        bio.className = "profile-bio";
        header.appendChild(bio);
    }

    // Follow/unfollow button
    const loggedInUser = localStorage.getItem("username");

    // Only show follow/unfollow button if viewing someone else's profile
    if(profile.name !== loggedInUser) {
        const followButton = document.createElement("button");
        followButton.className = "follow-button";
        // Check if the logged-in user is already following the profile with some(). Checks if at least one follower matches the logged in user and returns true when it finds one. 
        const isFollowing = profile.followers?.some(follower => follower.name === loggedInUser);
        followButton.textContent = isFollowing ? "Unfollow" : "Follow";
        header.appendChild(followButton);
        
        // Event listener for follow/unfollow button
        followButton.addEventListener("click", async () => {
            try {
                if (followButton.textContent === "Unfollow") {
                    await unfollowUser(profile.name);
                    followButton.textContent = "Follow";
                }
                else {
                    await followUser(profile.name);
                    followButton.textContent = "Unfollow";
                }
                window.location.reload();
            } catch (error) {
                console.error("Error updating follow status:", error);
                alert("Failed to update follow status. Please try again.");
            }
        });
    } 
   

    //Summary (posts, followers, following)
    const summary = document.createElement("div");
    summary.className = "profile-summary";

    summary.innerHTML = `
        <span>Followers: ${profile._count.followers}</span>
        <span>Following: ${profile._count.following}</span>
        <span>Posts: ${profile._count.posts}</span>
        `;

    header.appendChild(summary);

    container.appendChild(header);

    //Posts section
    const postsSection = document.createElement("div");
    postsSection.className = "profile-posts";

    container.appendChild(postsSection);

    renderPosts(profile.posts, postsSection);
}