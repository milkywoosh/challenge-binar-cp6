const db = require('../models/index');
const {UserGame, UserBiodata} = require('../models')

const express = require("express");
const path = require("path");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

// equalTo greaterThan
const Op = db.Sequelize.Op;
const response = require('../response/index');

// join table 
exports.join =  (req, res) => {
    UserGame.findAll({
        raw: true,
        order: [
          ['id', 'ASC'],
        ],
        include: {
          model: UserBiodata
        }
      })
        .then(users => {
          res.render("index", {
            users
          });
        //   res.send(users);
    
        })
        .catch( err => {
          res.send({'errorr: ': err.message});
        })
}


// agar user_id dapat inserted harus pakai async await
exports.create =  async (req, res) => {
    const { username, password } = req.body;
    const user =  await UserGame.create({
        username,
        password
    });
    if (!user) {
        response.fail(res, `Failed to create new user.`);
        return;
    }

    const { fname, lname, age } = req.body;
    const userBiodata = await UserBiodata.create({
        fname,
        lname,
        age,
        user_id: user.id
    });
    if (!userBiodata) {
        response.fail(res, `Failed to create new user biodata.`);
        return;
    }

    response.success(res, `Created new user.`);
}



// Retrieve all Tutorials from the database.
exports.findAll =  (req, res) => {
    const username = req.query.username;
    // http://localhost:3030/api/usergames?username=tes
    var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;

     UserGame.findAll({ where: condition })
   
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
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const UserID = req.params.id;
    UserGame.findByPk(UserID)
        .then(data => {
            if (data) {
                res.send(data)
                return;
            }
            res.status(200).send({
                message: "Error retrieving Tutorial with id=" + UserID
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + UserID
            });
            console.log(err);
        });
};

// Delete by ID
exports.deleteById = (req, res) => {
        const { userID } = req.body;
        UserGame.destroy({
            where: {
                id: userID
            }
        })
            .then(async success => {
                if (success) {
                    response.success(res, `Deleted user with id ${userID}.`);
                } else {
                    response.fail(res, `No user with id ${userID}.`);
                }
            })
            .catch(e => {
                console.log(e)
                res.send(500)
            })
    },

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    UserGame.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// patch
exports.editUserGame = (req, res) => {
    const { userID, username, password } = req.body;
    UserGame.update(
        { username, password },
        { where: { id: userID } }
    )
        .then(([result]) => {
            if (result) return response.success(res, `Edited user with id ${userID}.`)
            else return response.fail(res, `No user with id ${userID}.`)
        })
        .catch(err =>
            response.serverError(res, "something went wrong " + err)
        )
}