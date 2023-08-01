//1
const express= require ("express");
const { register, login } = require("../controllers/user");
const { registerValidation, validation, loginValidation } = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");

//2 create fonction

const router = express.Router();

// routes


// register or singin
router.post("/register", register);



//login
router.post("/login",loginValidation(),validation, login);


// curent user
router.get("/current", isAuth, (req, res) => {
    res.send(req.user);
});



//3 export
module.exports = router;