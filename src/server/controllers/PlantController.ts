import express, {Request, response, Response} from "express";
import {Plant} from "../models";
import {Validator} from "../models/Validator";
import { Get404PageString } from "../FileTemplates";

const router = express.Router();


// displays all plants
router.get("/", async (req: Request, resp: Response) =>
{
    try 
    {
        const allPlants = await Plant.findAll();

        console.log("allPlants: " + allPlants); // Log the retrieved history for debugging
        console.log("All Plants: " + JSON.stringify(allPlants));
        for(let i = 0; i < allPlants.length; i++)
        {
            const somePlant = allPlants[i];
            console.log("\t" + i + ": " + somePlant.id + " x " + somePlant.label + " x " + somePlant.species);
        }
        
        //const allPlainData = allPlants.map(obj => obj.GetAllHandlebarData()) // needed so that handlebars can correctly access the properties (otherwise we get "Access has been denied to resolve the property "species" because it is not an "own property" of its parent.")
        
        const allPlainData = [];
        resp.render("allPlants", {noPlants: allPlainData.length==0});//{plant: allPlainData});      
    } 
    catch (error) 
    {
        console.error("Error fetching plants:", error); 
        resp.status(500).send("Internal Server Error"); 
    }
});



router.get("/new", async (req: Request, resp: Response) =>
{
    console.log("In new plants");

    resp.render("addPlant", {});      
});



router.post("/new", async (req: Request, resp: Response) =>
{
    console.log("Posting new plants");    

    const plantLabel = req.body["plantLabel"];
    const species = req.body["species"];
    const plantDate = req.body["plantDate"];
    const wateringSchedule = parseInt(req.body["wateringSchedule"])
    let notes = req.body["notes"]; // not constant so that we can make it non-null later (notes is optional)
    if(notes == null)
        notes = "";

    Validator.Reset();
    Validator.Validate(plantLabel, "Label", Validator.NotEmptyString);
    Validator.Validate(species, "Species", Validator.NotEmptyString);
    Validator.Validate(plantDate, "Plant Date", Validator.ValidateDate);
    Validator.Validate(wateringSchedule, "Watering Schedule", Validator.ValidateNonZeroPositiveNumber);
    
    if(Validator.IsValid() == false)
        OnInvalidNewPlantData(resp);
    else   
        await OnValidNewPlantData(plantLabel, species, plantDate, wateringSchedule, notes, resp); // probably don't need to await this, as nothing follows       
});



function OnInvalidNewPlantData(resp: Response)
{
    let errorMessage = "";
    const allErrors = Validator.GetAllErrorMessages();
    allErrors.forEach((value) =>
    {
        errorMessage += (value + "<br>");
    });

    resp.status(400).send(errorMessage);
}



async function OnValidNewPlantData(plantLabel: any, species: any, plantDate: any, wateringSchedule: any, notes: any, resp: Response) 
{
    await Plant.create({label: plantLabel, species: species, plantDate: plantDate, waterSchedule: wateringSchedule, lastWaterDate: plantDate, notes: notes});
    
    resp.status(200).send("Added new plant");   

    //resp.render("addPlant", {});   
}



// view single plant (at bottom so that something like /plants/new is not blocked)
router.get("/:id", async (req, resp) => 
{
    try
    {
        const foundPlant = await Plant.findOne({ where: {id: req.params.id} });
        
        if(foundPlant != null)
        {
            const plainPlant = foundPlant.GetAllHandlebarData();
            console.log("Found plant: " + plainPlant.label);

            
            //const {...goodData} = foundPlant;
            resp.render("partials/singlePlant", foundPlant.GetAllHandlebarData());
        } 
        else
        {
            resp.status(404).send(Get404PageString());
        }
    }
    catch (error) 
    {
        console.error("Error fetching plants:", error); 
        resp.status(500).send("Internal Server Error"); 
    }
});


module.exports = router;


