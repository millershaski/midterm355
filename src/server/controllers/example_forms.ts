// import express, { Request, Response } from "express"; // Import Express and its type definitions for TypeScript
// import { sequelize } from "../config/connection"; // Import the Sequelize instance to manage database transactions
// import { ResultModel, Person, Calculation } from "../models"; // Import database models for interaction
// import { validate, getValidationResults } from "../validation";
// import { ValidationError } from "sequelize";
// const router = express.Router(); // Create a new router instance for defining routes
// const rowLimit = 10; // Define a limit for query results, though it's not used in this file

// /**
//  * GET Route - Render History Page
//  * - Fetches all records from the ResultModel table, including associated Person and Calculation data.
//  * - Orders the results by ID in descending order (latest first).
//  * - Converts the retrieved Sequelize instances into plain JavaScript objects.
//  * - Renders the "age" Handlebars template, passing in the fetched history.
//  */
// router.get("/", async (req: Request, resp: Response) => {
//     try {

//         //server side validation using the custom validators in the validation.ts
//         validate('name').required().minLength(3);
//         validate('age').required().isInteger();
//         validate('years').required().isInteger();

//         async (req: Request, resp: Response) => {
//             // Get validation results
//             const validation = getValidationResults(req);

//             // If the validation failed, return an error response
//             if (!validation.valid) {
//                 return res.status(400).json({
//                     message: 'Validation failed',
//                     errors: validation.results
//                 });
//             }
//             let history = (await ResultModel.findAll({
//                 include: [Person, Calculation], // Include related Person and Calculation data
//                 order: [["id", "DESC"]] // Sort by ID in descending order
//             })).map(row => row.get({ plain: true })); // Convert Sequelize instances to plain objects

//             console.log(history); // Log the retrieved history for debugging
//             resp.render("age", { history }); // Render the "age" view with the history data
//         }
//     } catch (error) {
//         console.error("Error fetching history:", error); // Log any errors that occur during the query
//         resp.status(500).send("Internal Server Error"); // Return a 500 status with an error message
//     }
// });

// /**
//  * POST Route - Handle New Entry Submission
//  * - Receives a name, age, and years from the request body.
//  * - Calculates the next age by adding years to the given age.
//  * - Uses a Sequelize transaction to ensure all related data is saved consistently.
//  * - If the Person already exists in the database, retrieves it instead of creating a new one.
//  * - If the Calculation already exists, retrieves it instead of creating a duplicate.
//  * - Creates a new entry in the ResultModel table linking the Person and Calculation records.
//  * - Fetches the updated history and re-renders the "age" template with new data.
//  */
// router.post("/", async (req: Request, resp: Response) => {
//     try {
//         const { name, age, years } = req.body; // Extract input data from request body
//         const nextage = Number.parseInt(age) + Number.parseInt(years); // Calculate future age

//         await sequelize.transaction(async (tx) => { // Start a transaction to ensure atomicity
//             // Find or create a Person record with the provided name
//             const [person] = await Person.findOrCreate({
//                 where: { name },
//                 transaction: tx // Ensure this action is part of the transaction
//             });

//             // Find or create a Calculation record with the provided age, years, and nextage
//             const [calculation] = await Calculation.findOrCreate({
//                 where: { age, years, nextage },
//                 transaction: tx // Ensure this action is part of the transaction
//             });

//             // Create a new ResultModel entry that links the Person and Calculation records
//             await ResultModel.create({
//                 personId: person.id, // Associate the result with the found/created Person
//                 calculationId: calculation.id // Associate the result with the found/created Calculation
//             }, { transaction: tx });
//         });

//         // Fetch updated history after saving the new record
//         let history = (await ResultModel.findAll({
//             include: [Person, Calculation], // Include related data
//             order: [["id", "DESC"]] // Sort by latest entry
//         })).map(row => row.get({ plain: true })); // Convert Sequelize instances to plain objects

//         console.log(history); // Log the updated history for debugging
//         resp.render("age", { history }); // Re-render the "age" view with the updated history

//     } catch (error) {
//         if (error instanceof ValidationError) {
//             // Check if the error is an instance of Sequelize's ValidationError.
//             // ValidationError is thrown when the validation fails during a database operation,
//             // such as when trying to save or update a model with invalid data.

//             // Initialize an empty object to hold error messages, where each key represents a field in the form.
//             let errors: { [key: string]: string } = {};

//             // Loop through all the validation errors that are part of the ValidationError object.
//             // Each error object in `error.errors` has properties like `path` (the field name) and `message` (the error message).
//             error.errors.forEach(e => {
//                 // Collect errors by field name (`e.path`) and assign the corresponding error message (`e.message`).
//                 // This will result in an object where the key is the field name and the value is the error message.
//                 if (e.path != null) {
//                     errors[e.path] = e.message;
//                 }
//             });

//             // After collecting all the errors, we now need to send these errors back to the client.
//             // We do this by rendering the "age" view again and passing the errors object as part of the context.
//             // This way, the template can use the errors to display feedback to the user. // Fetch updated history after saving the new record
//             let history = (await ResultModel.findAll({
//                 include: [Person, Calculation], // Include related data
//                 order: [["id", "DESC"]] // Sort by latest entry
//             })).map(row => row.get({ plain: true })); // Convert Sequelize instances to plain objects
//             resp.render("age", {
//                 history,
//                 errors, // This is the object containing validation errors for each form field
//                 name: req.body.name, // Pass the current form data so that the form can be repopulated
//                 age: req.body.age,
//                 years: req.body.years,
//             });
//         } else {
//             // If the error is not a ValidationError, we log the error and send a generic server error message.
//             // This happens when there's an unexpected issue (e.g., a database connection failure or other non-validation errors).

//             console.error("Transaction Error:", error); // Log the error for debugging purposes

//             // Respond with a 500 status code indicating an internal server error.
//             // This is a generic error response that informs the client that something went wrong on the server side.
//             resp.status(500).send("Failed to save result.");
//         }

//     }
// });

// module.exports = router; // Export the router to be used in other parts of the application