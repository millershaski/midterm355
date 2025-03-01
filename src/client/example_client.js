/*import {validate} from "./client_validation"
document.getElementById('age_form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission for validation

    const formdata = new FormData(e.target);
    const errors = {};

    const nameValidator = validate('name', formdata);
    const ageValidator = validate('age', formdata);
    const yearsValidator = validate('years', formdata);

    // Validation rules
    nameValidator.required();
    ageValidator.required().isInteger();
    yearsValidator.required().isInteger();

    // Collect errors
    if (!nameValidator.results.required) errors.name = "Name is required.";
    if (!ageValidator.results.required) errors.age = "Age is required.";
    if (!ageValidator.results.isInteger) errors.age = "Age must be an integer.";
    if (!yearsValidator.results.required) errors.years = "Number of years is required.";
    if (!yearsValidator.results.isInteger) errors.years = "Number of years must be an integer.";

    // Display errors or submit the form if no errors
    if (Object.keys(errors).length > 0) {
        displayErrors(errors);
    } else {
        e.target.submit(); // Submit the form if no errors
    }
});

function displayErrors(errors) {
    // Remove any previous errors
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((msg) => msg.remove());

    // Show new error messages
    for (const [field, message] of Object.entries(errors)) {
        const inputField = document.querySelector(`[name=${field}]`);
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message', 'text-danger');
        errorDiv.textContent = message;

        // Insert error message after the input field
        inputField.parentElement.appendChild(errorDiv);
    }
}*/