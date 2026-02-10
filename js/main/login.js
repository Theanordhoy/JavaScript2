import { isValidEmail, isValidPassword } from "../utils/validation.js";

// DOM references
const form = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Live Validation
emailInput.addEventListener("blur", () => {
    const result = isValidEmail(emailInput.value);
    emailError.textContent = result.message;
});

passwordInput.addEventListener("blur", () => {
    const result = isValidPassword(passwordInput.value);
    passwordError.textContent = result.message;
});

// Submit Event
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validation
    const emailCheck = isValidEmail(emailInput.value);
    const passwordCheck = isValidPassword(passwordInput.value);

    // Show error-messages if needed
    emailError.textContent = emailCheck.message;
    passwordError.textContent = passwordCheck.message;

    if (!emailCheck.valid || !passwordCheck.valid) {
        return; // Stops before API
    }

    const credentials = {
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
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

        if (!response.ok) {
            throw new Error(data?.errors?.[0]?.message || "Login failed.");
        }

        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("username", data.data.name);

        alert("Login successful!");
        window.location.href = "../../feed.html";
        
    } catch (error) {
        console.error("Login request failed:", error);
        alert("Something went wrong. Try again later.");
    }
});