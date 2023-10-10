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



//stuff to convert data to json and then print it out after hitting "save" button
document.addEventListener("DOMContentLoaded", function () {
    const productmanagepage = document.getElementById("group-product-page");
    const jsonOutput = document.getElementById("jsonOutput");

    productmanagepage.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(productmanagepage);
        const jsonObject = {};

        formData.forEach(function (value, key) {
            jsonObject[key] = value;
        });

        jsonOutput.textContent = JSON.stringify(jsonObject, null, 2);
    });
});