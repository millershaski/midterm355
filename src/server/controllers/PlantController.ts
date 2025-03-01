import express, { Request, Response } from "express";
import { Get404PageString } from "../FileTemplates";
import { Plant, PlantInputData } from "../models/Plant";
import { Validator } from "../models/Validator";

const router = express.Router();


// displays all plants
router.get("/", async (req: Request, resp: Response) =>
{
    try 
    {
        const allPlants = await Plant.findAll();        
        const allPlainData = allPlants.map(obj => obj.GetAllHandlebarData()) // needed so that handlebars can correctly access the properties (otherwise we get "Access has been denied to resolve the property "species" because it is not an "own property" of its parent.")
        
        resp.render("allPlants", 
            {
                noPlants: allPlainData.length==0,
                plant: allPlainData
            });      
    } 
    catch (error) 
    {
        console.error("Error fetching plants:", error); 
        resp.status(500).send("Internal Server Error"); 
    }
});



router.get("/new", async (req: Request, resp: Response) =>
{
    resp.render("addPlant", {});      
});



// handles creating a new plant
router.post("/new", async (req: Request, resp: Response) =>
{
    const input: PlantInputData = new PlantInputData(req);
    if(input.IsValid() == false)
        OnPlantInputInvalid(resp);    
    else   
    {
        await Plant.create({label: input.plantLabel, species: input.species, plantDate: input.plantDate, waterSchedule: input.wateringSchedule, lastWaterDate: input.plantDate, notes: input.notes});
        resp.status(200).send("Added new plant");   
    }      
});



function OnPlantInputInvalid(resp: Response)
{
    let errorMessage = "";
    const allErrors = Validator.GetAllErrorMessages();
    allErrors.forEach((value) =>
    {
        errorMessage += (value + "<br>");
    });

    console.log(errorMessage);
    resp.status(400).send(errorMessage);
}



// update a plant
router.put("/:id", async (req: Request, resp: Response) => 
{
    console.log("Correct put (update)");

    const foundPlant = await Plant.findOne({ where: {id: req.params.id} });
    if(foundPlant == null)
    {
        console.error("Unable to find plant with id: ", req.params.id); 
        resp.status(500).send("Internal Server Error"); 
        return;
    }


    const input: PlantInputData = new PlantInputData(req);
    if(input.IsValid() == false)
        OnPlantInputInvalid(resp);
    else   
    {
        console.log("Updating plant with: " + input);

        await foundPlant.UpdateWith(input);
        resp.status(200).send("Updated new plant");   
    }
});
    


// view single plant (at bottom so that something like /plants/new is not blocked)
router.get("/:id", async (req, resp) => 
{
    try
    {
        const foundPlant = await Plant.findOne({ where: {id: req.params.id} });
        
        if(foundPlant != null)
            resp.render("editPlant", foundPlant.GetAllHandlebarDataForEdit());
        else
            resp.status(404).send(Get404PageString());        
    }
    catch(error) 
    {
        console.error("Error fetching plants:", error); 
        resp.status(500).send("Internal Server Error"); 
    }
});



module.exports = router;