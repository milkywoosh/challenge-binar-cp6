module.exports = app => {
    const usergame_con = require('../controllers/usergame_controller');
    let router = require("express").Router();
    

    //join table
    router.get("/usergames/join-table", usergame_con.join);

    //create new document
    router.post("/usergames/create", usergame_con.create);
    // Retrieve all Tutorials
    router.get("/usergames", usergame_con.findAll);
    // Retrieve a single Tutorial with id
    router.get("/usergames/join-table/:id", usergame_con.findOne);
    // Delete all Tutorials
    router.delete("/usergames", usergame_con.deleteAll);
    router.delete("/usegames/deleteByid", usergame_con.deleteById);
    router.patch("/usergames/editUser", usergame_con.editUserGame);
   
    app.use("/api/", router);

}
