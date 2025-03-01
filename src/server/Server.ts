/*
    Tyler Millershaski
    CSS 355 Midterm

    I did my best to start comments for Professor Lapan with "For Professor Lapan: "
*/



import { createServer } from "http"; // Import Node.js built-in module to create an HTTP server
import express, {Express, Request, Response } from "express"; // Import Express and its type definitions for TypeScript
import helmet from "helmet"; // Import Helmet for security enhancements
import { engine } from "express-handlebars"; // Import Handlebars as the template engine
import { Get404PageString } from "./FileTemplates";
import { ResetDatabase } from "./config/DatabaseReset"


const routes = require('./controllers'); // Import custom route handlers from the controllers directory
const port = 5000; // Define the port number for the server to listen on

const app: Express = express(); // Initialize an Express application


// initialize express
app.set("views", "views/server");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");



// Middle-ware Section

// logging middle-ware (placing at the top so that it's always invoked)
app.use((req: Request, resp: Response, next) =>
{
    // note that duplicates are probably because of the favicon.ico request
    console.log("A request was received: " + req.method + " for " + req.url);
    next(); // without a next, this request will die here
});

    
app.use(helmet()); // Helmet is used to set various HTTP headers for better security.
app.use(express.json()); // express.json() parses incoming JSON payloads (useful for APIs receiving JSON requests).
app.use(express.urlencoded({ extended: true })); // express.urlencoded({ extended: true }) parses URL-encoded payloads (useful for form submissions).

app.use(routes); // this allows us to use the router for forms.ts

app.use(express.static("static")); // Serve static files (such as images, CSS, JavaScript) from the "static" directory.
app.use(express.static("node_modules/bootstrap/dist")); // serve Bootstrap assets from the "node_modules/bootstrap/dist" directory.


/**
 * Redirect requests to the root ("/") to the "/form" route.
 * This ensures that when a user visits the base URL, they are automatically sent to the form page.
 */
//app.use("^/$", (req, resp) => resp.redirect("/"));


// this will automatically return a 404 for any non-defined route.
// It's important that this is at the bottom, so that we only get here if the response didn't have a route
app.use((req:Request, resp: Response, next) => 
{
    console.log("Defaulting to 404");

    // For Professor Lapan: note that the html for this 404 response was taken from chatgpt (because it looks nice)
    resp.status(404).send(Get404PageString());
    next();
});




// create and start server
const server = createServer(app);
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));



//ResetDatabase();