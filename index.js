document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");

    const validateFullName = () => {
        const fullNameInput = document.getElementById("full-name");
        const fullNameIcon = document.getElementById("full-name-icon");

        const isValid = fullNameInput.value.length >= 3 && /^[a-zA-Z ]+$/.test(fullNameInput.value);
        fullNameIcon.textContent = isValid ? "✅" : "❌";
    };

    const validateEmail = () => {
        const emailInput = document.getElementById("email");
        const emailIcon = document.getElementById("email-icon");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(emailInput.value);
        emailIcon.textContent = isValid ? "✅" : "❌";
    };

    const validatePassword = () => {
        const passwordInput = document.getElementById("password");
        const passwordIcon = document.getElementById("password-icon");

        const isValid = passwordInput.value.length >= 8 && /\d/.test(passwordInput.value) && /[a-zA-Z]/.test(passwordInput.value);
        passwordIcon.textContent = isValid ? "✅" : "❌";
    };

    const validateConfirmPassword = () => {
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirm-password");
        const confirmPasswordIcon = document.getElementById("confirm-password-icon");

        const isValid = passwordInput.value === confirmPasswordInput.value;
        confirmPasswordIcon.textContent = isValid ? "✅" : "❌";
    };

    const validateDOB = () => {
        const dobInput = document.getElementById("dob");
        const dobIcon = document.getElementById("dob-icon");
        const dobError = document.getElementById("dob-error");

        const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
        const isValid = dobRegex.test(dobInput.value);

        if (isValid) {
            const currentDate = new Date();
            const inputDate = new Date(dobInput.value);
            const age = currentDate.getFullYear() - inputDate.getFullYear();
            if (age < 18) {
                dobIcon.textContent = "❌";
                dobError.textContent = "You must be at least 18 years old.";
                form.querySelector("button[type=submit]").disabled = true;
            } else {
                dobIcon.textContent = "✅";
                dobError.textContent = "";
                form.querySelector("button[type=submit]").disabled = false;
            }
        } else {
            dobIcon.textContent = "❌";
            dobError.textContent = "Please enter a valid date in the format YYYY-MM-DD.";
            form.querySelector("button[type=submit]").disabled = true;
        }
    };

    const inputFields = document.querySelectorAll("input");
    inputFields.forEach(input => {
        input.addEventListener("input", function () {
            switch (input.id) {
                case "full-name":
                    validateFullName();
                    break;
                case "email":
                    validateEmail();
                    break;
                case "password":
                    validatePassword();
                    validateConfirmPassword();
                    break;
                case "confirm-password":
                    validateConfirmPassword();
                    break;
                case "dob":
                    validateDOB();
                    break;
                default:
                    break;
            }

            if (input.classList.contains("valid") || input.classList.contains("invalid")) {
                input.classList.remove("valid", "invalid");
            }

            if (input.value.length > 0) {
                if (input.validity.valid) {
                    input.classList.add("valid");
                } else {
                    input.classList.add("invalid");
                }
            }
        });
    });
});
