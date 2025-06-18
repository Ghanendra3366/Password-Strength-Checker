// script.js

// Example list of common passwords (expand as needed)
const commonPasswords = [
    "123456", "password", "123456789", "12345", "12345678", "qwerty", "1234567", "111111", "123123"
];

// Calculate entropy of a password
function calculateEntropy(password) {
    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32; // Approximate for symbols

    if (charsetSize === 0) return 0;
    return Math.round(password.length * Math.log2(charsetSize));
}

// Check if password is common
function isCommonPassword(password) {
    return commonPasswords.includes(password);
}

// Analyze password and return strength info
function analyzePassword(password) {
    const entropy = calculateEntropy(password);
    const common = isCommonPassword(password);

    let strength = "Weak";
    if (common || password.length < 6) {
        strength = "Very Weak";
    } else if (entropy > 60) {
        strength = "Strong";
    } else if (entropy > 40) {
        strength = "Moderate";
    }

    return { entropy, common, strength };
}

// UI logic
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("password");
    const result = document.getElementById("result");

    // Show/Hide password toggle
    const toggleBtn = document.getElementById("togglePassword");
    if (toggleBtn && input) {
        toggleBtn.addEventListener("click", () => {
            if (input.type === "password") {
                input.type = "text";
                toggleBtn.textContent = "🙈";
            } else {
                input.type = "password";
                toggleBtn.textContent = "👁️";
            }
        });
    }

    input.addEventListener("input", () => {
        const password = input.value;
        const { entropy, common, strength } = analyzePassword(password);

        let color = "#dc2626"; // Weak (red)
        if (strength === "Moderate") color = "#f59e42"; // Orange
        if (strength === "Strong") color = "#16a34a"; // Green

        result.innerHTML = `
            <p>Entropy: <strong>${entropy}</strong> bits</p>
            <p>Common Password: <strong>${common ? "Yes" : "No"}</strong></p>
            <p style="color:${color}">Strength: <strong>${strength}</strong></p>
        `;
    });
});