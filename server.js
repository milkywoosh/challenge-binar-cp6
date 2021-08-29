const express = require("express");

const cors = require("cors");
require('dotenv').config();
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */


const db = require("./models/index");
const {UserGame, UserBiodata} = require('./models')
// UserGame.sequelize.sync(); // will show activity in database querying 

db.sequelize.sync({force: false}); // if true: overwrite the data every NPM RUN START, false: not overwrite!!

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test backend usergame." });
});

const routing = require("./routes/router");
routing(app);

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
