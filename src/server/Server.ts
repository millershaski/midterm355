/*
    Tyler Millershaski
    CSS 355 Midterm

    I did my best to start comments for Professor Lapan with "For Professor Lapan: "
*/



import { createServer } from "http";
import express, {Express, Request, Response } from "express"; 
import helmet from "helmet";
import { engine } from "express-handlebars"; 
import { Get404PageString } from "./FileTemplates";
import { ResetDatabase } from "./config/DatabaseReset"


const routes = require('./controllers'); 
const port = 5000;

const app: Express = express(); 


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

    
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parses URL-encoded payloads (useful for form submissions).

app.use(routes); 

app.use(express.static("static")); 
app.use(express.static("node_modules/bootstrap/dist"));


/**
 * Redirect requests to the root ("/") to the "/form" route.
 * This ensures that when a user visits the base URL, they are automatically sent to the form page.
 */
//app.use("^/$", (req, resp) => resp.redirect("/"));

//app.use("/", (req, resp) => resp.redirect("/plants/"));


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