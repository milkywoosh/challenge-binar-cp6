const express = require("express");

const cors = require("cors");
require('dotenv').config();
const app = express();


// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */


const db = require("./models/index");
const NEVER_CHANGE = { force: false };
db.sequelize.sync(NEVER_CHANGE); // if true: overwrite the data every NPM RUN START, false: not overwrite!!

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test backend usergame." });
});

const routing_usergame = require("./routes/router_usergame");
const routing_userbio = require("./routes/router_userbio");
routing_usergame(app);
routing_userbio(app);

// set port, listen for requests
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
