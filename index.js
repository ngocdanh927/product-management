const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
//env
require("dotenv").config();

//database
const database = require("./config/database");
database.connect();

//express + port
const app = express();
const port = process.env.PORT;

//set pug
app.set("views", "./views");
app.set("view engine", "pug");

//set public
app.use(express.static("public"));

//method override
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

//Route
const routerClient = require("./routes/client/index.route");
const routerAdmin = require("./routes/admin/index.route");
routerClient(app);
routerAdmin(app);

//variable local
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
  console.log(`App listening on port ${port} http://localhost:${port}/`);
});
