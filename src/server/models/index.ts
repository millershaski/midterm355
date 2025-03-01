import {sequelize} from "../config/SequelizeInstance";
import {Plant} from "./Plant";
//import Calculation from "./example_Calculation";
//import ResultModel from "./example_ResultModel";

const initModels = () => {

    /*
  Plant.hasMany(ResultModel, { foreignKey: "personId" });
  Calculation.hasMany(ResultModel, { foreignKey: "calculationId" });

  ResultModel.belongsTo(Plant, { foreignKey: "personId" });
  ResultModel.belongsTo(Calculation, { foreignKey: "calculationId" });*/

  return sequelize.sync(); // Ensure tables are created
};

export { sequelize, Plant, /*Calculation, ResultModel,*/ initModels };