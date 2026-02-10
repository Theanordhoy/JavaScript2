//Import
import {
    isValidName,
    isValidEmail,
    isValidPassword
} from "../utils/validation.js";

//DOM references
const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name").value;
const emailInput = document.getElementById("email").value;
const passwordInput = document.getElementById("password").value;

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

//Submit Event
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    //Validation
    const nameCheck = isValidName(nameInput.value);
    const emailCheck = isValidEmail(emailInput.value);
    const passwordCheck = isValidPassword(passwordInput.value);

    //Show error-messages if needed
    nameError.textContent = nameCheck.message;
    emailError.textContent = emailCheck.message;
    passwordError.textContent = passwordCheck.message;

    if (!nameCheck.valid || !emailCheck.valid || !passwordCheck.valid) {
        return; //Stops before API
    }

    const userData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value.trim()
    };

try {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Registration failed, check console for details");
    } 

    alert("Registration was successfull, you can now log in!")
    window.location.href = "../../index.html";

    } catch (error) {
        console.error("Registration error:", error);
        alert(error.message || "Something went wrong. Please try again later.");
    }
});

