const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("./app/config/db");
const db = require("./app/models");
const app = express();
require("dotenv").config();
const PORT= process.env.APP_PORT;
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
sql.connect(function (err) {
    if (err) throw err
    console.log('Successfully connect with mysql database...')
});
*/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/adminlogin.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/model.routes")(app);
require("./app/routes/variable.routes")(app);
require("./app/routes/events.routes")(app);

//require("./app/routes/latestupdate.routes")(app);
//require("./app/routes/achievements.routes")(app);

// set port, listen for requests

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


