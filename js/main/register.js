const form = document.getElementById("registerForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();


const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const userData = {
    name: name,
    email: email,
    password: password
};

try {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json()

    if (response.ok) {
        alert("Registration was successfull, you can now log in!");
        window.location.href = "../../index.html";
    } else {
        console.log("Raw error response:", data);
        alert("Registration failed: " + (data.errors?.[0]?.message || "Check console for details"));
    }

    }catch (error) {
        console.error("Registration error:", error);
        alert("Something went wrong. Please try again later.");
    }

});