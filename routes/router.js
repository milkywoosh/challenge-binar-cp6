module.exports = app => {
    const usergame_con = require('../controllers/usergame_controller');
    const userbio_con = require('../controllers/userbio_controller');
    

    let router = require("express").Router();
    

    //join table
    router.get("/join-table", usergame_con.join);

    //create new document
    router.post("/usergames", usergame_con.create);
    // Retrieve all Tutorials
    router.get("/usergames", usergame_con.findAll);
    // Retrieve a single Tutorial with id
    router.get("/usergames/cekid/:id", usergame_con.findOne);
    // Delete all Tutorials
    router.delete("/usergames", usergame_con.deleteAll);


    // Retrieve all Userbiodata
    router.get("/userbiodata", userbio_con.findAll_biodata);

    app.use("/api/", router);

}
