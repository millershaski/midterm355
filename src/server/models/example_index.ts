// import {sequelize} from "../config/example_connection";
// import Person from "./example_Person";
// import Calculation from "./example_Calculation";
// import ResultModel from "./example_ResultModel";

// const initModels = () => {
//   Person.hasMany(ResultModel, { foreignKey: "personId" });
//   Calculation.hasMany(ResultModel, { foreignKey: "calculationId" });

//   ResultModel.belongsTo(Person, { foreignKey: "personId" });
//   ResultModel.belongsTo(Calculation, { foreignKey: "calculationId" });

//   return sequelize.sync(); // Ensure tables are created
// };

// export { sequelize, Person, Calculation, ResultModel, initModels };
