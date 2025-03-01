// import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";
// import {sequelize} from "../config/example_connection";
// import Person from "./example_Person";
// import Calculation from "./example_Calculation";

// export class ResultModel extends Model<
//   InferAttributes<ResultModel>,
//   InferCreationAttributes<ResultModel>
// > {
//   declare id: CreationOptional<number>;
//   declare personId: ForeignKey<Person["id"]>;
//   declare calculationId: ForeignKey<Calculation["id"]>;
// }

// ResultModel.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     personId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Person,
//         key: "id",
//       },
//     },
//     calculationId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Calculation,
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     modelName: "ResultModel",
//   }
// );

// // Define associations
// Person.hasMany(ResultModel, { foreignKey: "personId" });
// Calculation.hasMany(ResultModel, { foreignKey: "calculationId" });

// ResultModel.belongsTo(Person, { foreignKey: "personId" });
// ResultModel.belongsTo(Calculation, { foreignKey: "calculationId" });

// export default ResultModel;
