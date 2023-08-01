// require express
const express = require ("express");

// create fonction 
const router = express.Router();

// register and login admin
router.post("/registerAdmin");

router.post("/loginAdmin");

// export 
module.exports= router;