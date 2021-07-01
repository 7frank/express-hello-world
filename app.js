const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.send("Hello there!"));


app.get("/!", (req, res) => res.send("Hello there!"));

app.get("/routes", (req, res) => res.send(getRoutes(app)));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));



function getRoutes(app)
{

    var route, routes = [];

    app._router.stack.forEach(function(middleware){
        if(middleware.route){ // routes registered directly on the app
            routes.push(middleware.route);
        } else if(middleware.name === 'router'){ // router middleware 
            middleware.handle.stack.forEach(function(handler){
                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    return routes
}