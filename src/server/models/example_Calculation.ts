// import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
// import { sequelize } from "../config/example_connection"; // Import the configured Sequelize instance to establish database connection

// /**
//  * The Calculation model represents a table in the database.
//  * It extends Sequelize's Model class, allowing us to interact with the database using object-oriented principles.
//  * Sequelize automatically maps this model to the "Calculations" table (or explicitly defined table name).
//  */
// export class Calculation extends Model<
//   InferAttributes<Calculation>, // Infers the attributes that exist in the model for type safety
//   InferCreationAttributes<Calculation> // Infers attributes needed when creating a new instance
// > {
//   /**
//    * Declare model attributes with TypeScript types for better type checking.
//    * These attributes map directly to the corresponding database table columns.
//    */

//   declare id: CreationOptional<number>; // Primary key, optional when creating a new record because it auto-increments
//   declare age: number; // Represents a person's current age, must be an integer and cannot be null
//   declare years: number; // Represents a duration in years, must be an integer and cannot be null
//   declare nextage: number; // Represents the projected age after adding the years, must be an integer and cannot be null
// }

// /**
//  * The Calculation.init() method configures the model's attributes and options.
//  * - Attributes define the shape of the table (column types, constraints, etc.).
//  * - Options configure Sequelize's behavior for this model.
//  */
// Calculation.init(
//   {
//     id: {
//       type: DataTypes.INTEGER, // Specifies that this column stores integer values
//       autoIncrement: true, // Ensures the value automatically increases for new records
//       primaryKey: true, // Defines this column as the table's primary key (unique identifier)
//     },
//     age: {
//       type: DataTypes.INTEGER, // Integer type column for storing age values
//       allowNull: false, // Ensures that age cannot be null, meaning it's required when inserting a record
//     },
//     years: {
//       type: DataTypes.INTEGER, // Integer type column for storing the number of years
//       allowNull: false, // This field is required and cannot be left empty
//     },
//     nextage: {
//       type: DataTypes.INTEGER, // Integer type column for storing the calculated next age
//       allowNull: false, // This field is required and cannot be left empty
//     },
//   },
//   {
//     sequelize, // Links this model to the Sequelize instance to connect with the database
//     modelName: "Calculation", // Defines the model name for internal Sequelize reference
//     // By default, Sequelize pluralizes the table name (i.e., "Calculations" instead of "Calculation")
//     // To use a custom table name, we could add: tableName: "custom_table_name"
//   }
// );

// export default Calculation; // Exports the model so it can be used elsewhere in the application
