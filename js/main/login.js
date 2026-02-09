const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const credentials = {
        email: email,
        password: password
    };

    try {
        const response = await fetch("https://v2.api.noroff.dev/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("username", data.data.name);
            alert("Login successful!");
            window.location.href = "../../feed.html";
        } else {
            console.log("Login error:", data);
            alert("Login failed:" + (data.errors?.[0]?.message || "Check console for details."));
        }
    } catch (error) {
        console.error("Login request failed:", error);
        alert("Something went wrong. Try again later.");
    }
});