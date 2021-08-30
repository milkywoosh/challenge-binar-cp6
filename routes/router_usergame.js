
module.exports = app => {
    const usergame_con = require('../controllers/usergame_controller');
    let router = require("express").Router();


    //join table
    router.get("/usergames/join-table", usergame_con.join);


    //create new document
    // urutan pengaruhh dgn axioss?????
    router.post("/usergames/create", usergame_con.create);

    // edit datauser to detail.ejs
    router.get("/usergames/edit-user-data/:userID", usergame_con.editPageDataUser)

    // router.post("/usergames", usergame_con.create);
    // Retrieve all Tutorials
    router.get("/usergames", usergame_con.findAll);
    // Retrieve a single Tutorial with id
    router.get("/usergames/join-table/:id", usergame_con.findOne);
    // Delete all Tutorials
    router.delete("/usergames", usergame_con.deleteAll);
    router.delete("/usergames/deleteByid", usergame_con.deleteById);
    router.patch("/usergames/editUser", usergame_con.editUserGame);

    app.use("/api/", router); // penggunaan slash krn pengaruh ke proses URL???

}
