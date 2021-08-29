const db = require('../models/index');
const {UserGame, UserBiodata} = require('../models')

// equalTo greaterThan
const Op = db.Sequelize.Op;
const response = require('../response/index');


// Retrieve all Tutorials from the database.
exports.findAll_biodata = async (req, res) => {
    const fullname = req.query.fullname;
    // http://localhost:3030/api/usergames?username=tes
    var condition = fullname ? { fullname: { [Op.iLike]: `%${fullname}%` } } : null;

    await UserBiodata.findAll({ where: condition })
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
exports.findOne_biodata = (req, res) => {
    const id = req.params.id;
    UserBiodata.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
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
exports.deleteAll_biodata = (req, res) => {
    UserBiodata.destroy({
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