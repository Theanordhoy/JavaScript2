export function isValidName(name) {
    const trimmed = name.trim();
    const regex = /^[A-Za-z0-9_]{3,15}$/; //Regex generated from ChatGPT. 

    if (!regex.test(trimmed)) {
        return {
            valid: false,
            message: "Name must be 3-15 characters using letters, numbers, and underscores."
        };
    }

    return { valid: true, message: "" };
}

/**
 * This function checks if the email is valid and ends with 'stud.noroff.no'.
 * @param {string} email - The email address to validate.
 * @returns {{valid: boolean, message: string}} - An object indicating if the email is valid and an error message if it's not. Check if the email is a valid Noroff student email.
 */
export function isValidEmail(email) {
    const trimmed = email.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Regex generated from ChatGPT. 

    if (!regex.test(trimmed)) {
        return {
            valid: false,
            message: "Please enter a valid email adress."
        };
    }

    if (!trimmed.toLowerCase().endsWith("@stud.noroff.no")) {
        return {
            valid: false,
            message: "Only 'stud.noroff.no' emails are allowed to register."
        };
    }

    return { valid: true, message: "" };
     
}

export function isValidPassword(password) {
    const trimmed = password.trim();

    if (trimmed.length < 8) {
        return {
            valid: false, 
            message: "Password must be at least 8 characters long."
        };
    }

    return { valid: true, message: "" };
}