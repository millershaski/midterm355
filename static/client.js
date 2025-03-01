
// Bootstrap Form Validation
document.addEventListener("DOMContentLoaded", () => 
{
    const form = document.getElementById("plantForm");
    if(form == null)
        return;

    form.addEventListener("submit", (event) =>
    {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add("was-validated");
    }, false);

});