

document.addEventListener("DOMContentLoaded", () => 
{
    InitializePlantFormNew(); // form validation
    InitializePlantFormEdit(); // form validation and correctly creating a put request
    InitializeDeleteConfirm();
});



function InitializePlantFormNew()
{
    const form = document.getElementById("plantForm");
    if(form == null)
        return;

    form.addEventListener("submit", (event) =>
    {
        if(form.checkValidity() == false) 
        {
            event.preventDefault();
            event.stopPropagation();
        }
        
        form.classList.add("was-validated");
    }, false);
}



function InitializePlantFormEdit()
{
    const form = document.getElementById("plantFormEdit");
    if(form == null)
        return;

    form.addEventListener("submit", (event) =>
    {
        if(form.checkValidity() == true) 
            CreateCustomPutRequest(form);

        event.preventDefault();
        event.stopPropagation(); // we never want to submit, because we're going to send a custom request to the server
        form.classList.add("was-validated");
    }, false);
}



async function CreateCustomPutRequest(form)
{
    try 
    {

        window.location.href = "/";
        return;
        console.log("putting to: " + window.location.href + " : " + form);

        GetAllEditFormJSONData(form);
        
        const response = await fetch(window.location.href,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(GetAllEditFormJSONData(form))
        });
    }
    catch
    {
    }
}



function GetAllEditFormJSONData(form)
{
    if(form == null)
        return {};

    const formData = new FormData(form);
    
    const data = 
    {
        plantLabel: formData.get("plantLabel"),
        species: formData.get("species"),
        plantDate: formData.get("plantDate"),
        wateringSchedule: formData.get("wateringSchedule"),
        notes: formData.get("notes")        
    };

    console.log(data);
    console.log("About to string");
    console.log(JSON.stringify(data));

    return data;
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