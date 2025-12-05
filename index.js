const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dygsbwyjo",
  api_key: "792834368898588",
  api_secret: "<your_api_secret>", // Click 'View API Keys' above to copy your API secret
});
//env
require("dotenv").config();

//database
const database = require("./config/database");
database.connect();

//express + port
const app = express();
const port = process.env.PORT;

//set pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//set public
app.use(express.static(`${__dirname}/public`));

//method override
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// cookieParser
app.use(cookieParser("keyboard cat"));

// session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

// flash
app.use(flash());

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
