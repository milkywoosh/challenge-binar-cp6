const db = require('../models/index');
const {UserGame, UserBiodata} = require('../models')


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
          // res.render("index", {
          //   users
          // });
          res.send(users);
    
        })
        .catch( err => {
          res.send(err.message);
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
        .then(data => {

            res.send(data);
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
    const id = req.params.id;
    UserGame.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
                return;
            }
            res.status(200).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
            console.log(err);
        });
};
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