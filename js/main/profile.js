import { getProfile, getProfilePosts } from "../api/profiles.js";
import { renderProfile } from "../ui/renderProfile.js";

const container = document.getElementById("profileContainer");
//Load profile
async function loadProfile() {
    const params = new URLSearchParams(window.location.search);
    const usernameFromUrl = params.get("name");
    const loggedInUser = localStorage.getItem("username");

    const profileToLoad = usernameFromUrl || loggedInUser;

    try {
        const profile = await getProfile(profileToLoad);
        const posts = await getProfilePosts(profileToLoad);
        
        profile.posts = posts;

        renderProfile(profile, container);
        
    } catch (error) {
        console.error("Failed to load profile:", error);
    }
}

loadProfile();

//Log out
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        try {
            localStorage.removeItem("accessToken");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 300);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    });
}