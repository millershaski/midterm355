

// Bootstrap Form Validation
document.addEventListener("DOMContentLoaded", () => 
{
    InitializePlantForm();
    InitializeDeleteConfirm();
});



function InitializePlantForm()
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
}



function InitializeDeleteConfirm()
{
    const button = document.getElementById("confirmDeleteButton");
    if(button == null)
        return;

    button.onclick = OnDeleteClicked;
}



// Handles delete requests when the user confirms a delete
function OnDeleteClicked()
{    
    // splitting should make this a bit more safe, in the event that parameters were passed to the url
    let deletePath = (window.location.href.split('?')[0]);
    if(deletePath.endsWith("/") == false)
        deletePath += "/";

    deletePath += "delete";

    window.location.href = deletePath;
}