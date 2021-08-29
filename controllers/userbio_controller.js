const db = require('../models/index');
const {UserGame, UserBiodata} = require('../models')

// equalTo greaterThan
const Op = db.Sequelize.Op;
const response = require('../response/index');


// Retrieve all Tutorials from the database.
exports.findAll_biodata = async (req, res) => {
    const partname = req.query.partname;
    // http://localhost:3030/api/usergames?username=tes
    var condition = partname ? { partname: { [Op.iLike]: `%${partname}%` } } : null;

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
exports.findOne_biodata = async (req, res, next) => {
    const id = req.params.id;
    // UserBiodata.findByPk(id)
    //     .then(data => {
    //         // if (data) {
    //         //     res.send(data)
    //         //     return;
    //         // }
    //         res.status(200).send(data);
    //         // res.status(200).send({
    //         //     message: "Error retrieving Tutorial with id=" + id
    //         // });
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error retrieving Tutorial with id=" + id
    //         });
    //         console.log(err);
    //     });
    try {
        await UserBiodata.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
                return;
            }
        
            res.status(200).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        })
    } catch(err) {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id
        });
        console.log(err);
    }
};

exports.deleteByIdUser_biodata = async (req, res) => {
    const id = req.params.id;

    await UserBiodata.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
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