function validate(input) {
    var value = input.value;

    // Check if the input field is empty
    if (value.trim() === "") {
        setRequiredError(input);
    } else {
        // removes error msg when input is not empty
        removeRequiredError(input);

        // Check specific validation rules based on the input's id
        switch (input.id) {
            case "email":
                var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (!value.match(emailPattern)) {
                    setEmailFormat();
                } else {
                    clearInvalidEmail();
                }
                break;
            case "shopperphonenum":
                var phonePattern =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                if (!value.match(phonePattern)) {
                    setInvalidPhone();
                }
                else{
                    clearInvalidPhone();
                }
                break;
            default:
                break;
        }
    }
}



function setRequiredError(input) {
    const errorField = input.nextElementSibling;
    if (errorField) {
        errorField.style.display = "block";
        input.style.borderColor = "red";
    }
}

function removeRequiredError(input) {
    const errorField = input.nextElementSibling;
    if (errorField) {
        errorField.style.display = "none";
        input.style.borderColor = "green";
    }
}

function setEmailFormat() {
    const errorField = document.querySelector(".invalid-format");
    const confirmEmailInput = document.getElementById("email");
    errorField.style.display = "block";
    confirmEmailInput.style.borderColor = "red";
}


function clearInvalidEmail() {
    const errorField = document.querySelector(".invalid-format");
    const confirmEmailInput = document.getElementById("email");
    errorField.style.display = "none";
    confirmEmailInput.style.borderColor = "green";
}

function setInvalidPhone(){
    const errorField = document.querySelector(".invalid-phone");
    const confirmPhoneInput = document.getElementById("shopperphonenum");
    errorField.style.display = "block";
    confirmPhoneInput.style.borderColor = "red";
}

function clearInvalidPhone() {
    const errorField = document.querySelector(".invalid-phone");
    const confirmPhoneInput = document.getElementById("shopperphonenum");
    errorField.style.display = "none";
    confirmPhoneInput.style.borderColor = "green";
}


document.addEventListener("DOMContentLoaded", function () {
    const signupform = document.getElementById("group-signup-form");
    const jsonOutput = document.getElementById("jsonOutput");

    signupform.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(signupform);
        const jsonObject = {};

        formData.forEach(function (value, key) {
            jsonObject[key] = value;
        });

        jsonOutput.textContent = JSON.stringify(jsonObject, null, 2);
    });
});