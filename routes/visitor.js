// require express
const express = require ("express");

// express router
const router = express.Router();

 /// route test
router.get ('/test', (req, res) => {
    res.send ('Hello Word')
});

// export
module.exports = router;