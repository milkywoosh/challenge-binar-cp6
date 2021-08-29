module.exports = app => {
    const userbio_con = require('../controllers/userbio_controller');
    let router = require('express').Router();

    // Retrieve all Userbiodata
    router.get("/userbiodata", userbio_con.findAll_biodata);
    router.get("/userbiodata/cekid/:id", userbio_con.findOne_biodata);
    router.delete("/userbiodata/delete-by-id/:id", userbio_con.deleteByIdUser_biodata);
    // Delete all UserBiodata
    router.delete("/userbiodata/", userbio_con.deleteAll_biodata)

    app.use("/api/", router);
}