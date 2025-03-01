import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../config/SequelizeInstance"; 


/*export class PlainPlant
{
    id: number; 
    label: string;
    species: string;
    plantDate: string;
    waterSchedule: string;
    lastWaterDate: string; 
    notes: string

    constructor(somePlant: Plant)
    {
        this.id = somePlant.id;
        this.label = somePlant.label;
        this.species = somePlant.species;
        this.plantDate = new Date(somePlant.plantDate).toLocaleDateString();
        this.waterSchedule = this.ToScheduleString(somePlant.waterSchedule);
        this.lastWaterDate = new Date(somePlant.lastWaterDate).toLocaleDateString();
        this.notes = somePlant.notes;
    }


    
    GetAllHandlebarData()
    {
        const data = 
        {            
            id: this.id,
            label: this.label,
            species: this.species,
            plantData: this.plantDate,
            waterSchedule: this.waterSchedule,
            lastWaterDate: this.lastWaterDate,
            notes: this.notes
        }
        return data;
    }
}*/


export class Plant extends Model 
{
    declare id: number; 
    declare label: string;
    declare species: string;
    declare plantDate: string;
    declare waterSchedule: number;
    declare lastWaterDate: string;   
    declare notes: string; 

    
    // We use this method so that handlebars can correctly access the data (it can't access inherited members by default).
    // We can also perform some formatting things here.
    // This method returns plain data that handlebars can access
    GetAllHandlebarData()
    {
        const data = 
        {            
            id: this.id,
            label: this.label,
            species: this.species,
            plantDate: new Date(this.plantDate).toLocaleDateString(),
            waterSchedule: this.ToScheduleString(this.waterSchedule),
            lastWaterDate: new Date(this.lastWaterDate).toLocaleDateString(),
            notes: this.notes
        }
        return data;
    }
    


    ToScheduleString(schedule: number): string
    {
        if(schedule <= 1)
            return "daily";
        else if(schedule <= 2)
            return "every other day";
        else if(schedule <= 7)
            return "weekly";
        else if(schedule <= 14)
            return "bi weekly";
        else
            return "other";
    } 
}

Plant.init(
{
    id: 
    {
        type: DataTypes.INTEGER,
        autoIncrement: true, // The ID will automatically increment when a new record is created
        primaryKey: true, 
    },    
    label: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    species:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    plantDate:
    {
        type: DataTypes.DATE,
        allowNull: false
    },
    waterSchedule:
    {
        type: DataTypes.NUMBER
    },
    lastWaterDate:
    {
        type: DataTypes.DATE,
        allowNull: false
    },
    notes:
    {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    sequelize, 
    modelName: "Plant", // The name of the model (used for table creation and associations)
    tableName: 'Plants',  // this can be omitted, as the name will automatically be made the plural version of the modelName
    timestamps: false, // I don't care when the records were created or updated 
    underscored: true
}
);

export default {Plant};
