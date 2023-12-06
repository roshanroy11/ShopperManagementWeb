function validate(input) {
    var value = input.value;

    // Check if the input field is empty
    if (value.trim() === "") {
        setRequiredError(input);
    } else {
        // removes error msg when input is not empty
        removeRequiredError(input);
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
