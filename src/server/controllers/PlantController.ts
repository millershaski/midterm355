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



class PlantInputData
{
    plantLabel: string = "";
    species: string = "";
    plantDate: string = "";
    wateringSchedule: number = 0;
    notes: string = "";

    constructor(req: Request)
    {
        if(req == null)
            return;

        try
        {
            this.plantLabel = req.body["plantLabel"];
            this.species = req.body["species"];
            this.plantDate = req.body["plantDate"];
            this.wateringSchedule = parseInt(req.body["wateringSchedule"])
            this.notes = req.body["notes"]; 
            if(this.notes == null)
                this.notes = "";  
        }
        catch
        {
            // I don't care about the error too much, validation will fail later
        }         
    }


    
    IsValid(): boolean
    {
        Validator.Reset();
        Validator.Validate(this.plantLabel, "Label", Validator.NotEmptyString);
        Validator.Validate(this.species, "Species", Validator.NotEmptyString);
        Validator.Validate(this.plantDate, "Plant Date", Validator.ValidateDate);
        Validator.Validate(this.wateringSchedule, "Watering Schedule", Validator.ValidateNonZeroPositiveNumber);

        return Validator.IsValid();
    }    
}



router.post("/new", async (req: Request, resp: Response) =>
{
    const input: PlantInputData = new PlantInputData(req);
    if(input.IsValid() == false)
    {
        let errorMessage = "";
        const allErrors = Validator.GetAllErrorMessages();
        allErrors.forEach((value) =>
        {
            errorMessage += (value + "<br>");
        });
    
        resp.status(400).send(errorMessage);
    }
    else   
    {
        await Plant.create({label: input.plantLabel, species: input.species, plantDate: input.plantDate, waterSchedule: input.wateringSchedule, lastWaterDate: input.plantDate, notes: input.notes});
        resp.status(200).send("Added new plant");   
    }      
});



// We can't put directly from an html form, so instead we'll handle posts to this route as if it had been a put
router.post("/:id/update", (req: Request, resp: Response) =>
{
    console.log("Dirty put");
    OnPlantPut(req, resp);
});



// update a plant
router.put("/:id", async (req, resp) => 
{
    OnPlantPut(req, resp);
});
    


function OnPlantPut(req: Request, resp: Response)
{
    /*try
    {
        const foundPlant = await Plant.findOne({ where: {id: req.params.id} });
        
        if(foundPlant != null)
        {
            const plainPlant = foundPlant.GetAllHandlebarData();
            resp.render("partials/singlePlantPartial", foundPlant.GetAllHandlebarData());
        } 
        else
        {
            console.error("Unable to find plant with ID: " + req.params.id); 
            resp.status(500).send("Internal Server Error"); 
        }
    }
    catch (error) 
    {
        console.error("Error finding plants: ", error); 
        resp.status(500).send("Internal Server Error"); 
    }*/
}



// view single plant (at bottom so that something like /plants/new is not blocked)
router.get("/:id", async (req, resp) => 
{
    try
    {
        const foundPlant = await Plant.findOne({ where: {id: req.params.id} });
        
        if(foundPlant != null)
            resp.render("singlePlant", foundPlant.GetAllHandlebarData());
        else
            resp.status(404).send(Get404PageString());        
    }
    catch (error) 
    {
        console.error("Error fetching plants:", error); 
        resp.status(500).send("Internal Server Error"); 
    }
});


module.exports = router;


