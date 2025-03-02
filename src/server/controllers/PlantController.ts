import express, { Request, Response } from "express";
import { Get404PageString } from "../FileTemplates";
import { Plant, PlantInputData } from "../models/Plant";
import { Validator } from "../models/Validator";

const router = express.Router();


router.get("/changeSuccess", (req, resp) => resp.render("changeSuccess"));
router.get("/changeFail", (req, resp) => resp.render("changeFail"));

router.get("/deleteSuccess", (req, resp) => resp.render("deleteSuccess"));
router.get("/deleteFail", (req, resp) => resp.render("deleteFail"));


router.get("/new", async (req: Request, resp: Response) =>
{
    resp.render("addPlant");      
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
        resp.render("addPlantSuccess");
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
        await foundPlant.UpdateWith(input);
        resp.render("changeSuccess");
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


router.delete("/:id", async(req: Request, resp: Response) =>
{
    const foundPlant = await Plant.findOne({ where: {id: req.params.id} });
    if(foundPlant == null)
    {
        console.error("Unable to find plant with id: ", req.params.id); 
        resp.status(500).send("Internal Server Error"); 
        return;
    }

    await foundPlant.destroy();
    resp.status(200).send("Success");
});

module.exports = router;