import { renderPosts } from "./renderPosts.js";

export function renderProfile(profile, container) {
    container.innerHTML = "";

    const loggedInUser = localStorage.getItem("username");

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