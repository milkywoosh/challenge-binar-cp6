const db = require('../models/index');
const { UserGame, UserHistoriGame } = require('../models')

const express = require("express");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

// equalTo greaterThan
const Op = db.Sequelize.Op;
const response = require('../response/index');



// join table 
exports.cekScoreHistory = async (req, res) => {
    UserHistoriGame.findAll({
        raw: true,
        include: {
            model: UserGame
        }
    })
        .then(scoreUsers => {
            res.render("tablescore", {
                scoreUsers
            });
            // res.send(scoreUsers);

        })
        .catch(err => {
            res.send({ 'errorr: ': err.message });
        })
}


// Retrieve all Tutorials from the database.
exports.findAll_Userhistory = async (req, res) => {

    UserHistoriGame.findAll()

        .then(datafindall => {

            res.send(datafindall);

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};




