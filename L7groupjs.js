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


/*
let jsonObject = {};

document.addEventListener("DOMContentLoaded", function () {
    const productmanagepage = document.getElementById("group-product-page");
    const jsonOutput = document.getElementById("jsonOutput");

    // ...

    const updateButton = document.querySelector("button[type='button']");
    updateButton.addEventListener("click", function () {
        // Get the updated data from the form fields
        const productId = document.getElementById("productid").value;
        const productDescription = document.getElementById("productdescription").value;
        const productCategory = document.getElementById("productcategory").value;
        const unitOfMeasurement = document.getElementById("unitofmeasurement").value;
        const productPrice = document.getElementById("productprice").value;
        const productWeight = document.getElementById("productweight").value;

        // Update the JSON object with the new data
        jsonObject = {
            productId: productId,
            productDescription: productDescription,
            productCategory: productCategory,
            unitOfMeasurement: unitOfMeasurement,
            productPrice: productPrice,
            productWeight: productWeight,
        };

        // Display the updated JSON object
        jsonOutput.textContent = JSON.stringify(jsonObject, null, 2);
    });
});

 */