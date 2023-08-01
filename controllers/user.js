const User = require ("../models/user");
const bcrypt = require('bcrypt');
const jwt = require ("jsonwebtoken");
// the user // createur d evenement
exports.register = async (req, res) => {
    try {
        
        // req.body => newUser
        const { name, email, password, phone} = req.body;
        const foundUser = await User.findOne ({ email});
        if (foundUser) {
            return res
            .status(400)
            .send ({errors: [{msg: "Email should be unique try again please !!!"}] });
        }
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash (password, saltRounds);

         // const newUser
         const newUser = new User ({...req.body});
         newUser.password = hashedpassword;

         // save
         await newUser.save();
         // creation token
         const token = jwt.sign(
            {
                id: newUser._id,

            },
            process.env.SECRET_KEY,
            {expiresIn:"2h"}
         );

         res
         .status(200)
         .send ({msg: "Register successfully ...", user: newUser, token});
        
    } catch (error) { 
        res.status(400).send({ msg: "Can not register the User"});
        
    }
};

exports.login = async (req, res) => {

    try {
        const { email, password} = req.body;
        // check if email exist
        const foundUser = await User.findOne({email});
        if (!foundUser){
            return res.status(400).send ({errors: [{msg: "Bad credential !!"}]});
        }
        const checkPassword = await bcrypt.compare(password, foundUser.password);
        if(!checkPassword){
            return res.status(400).send({errors: [{msg: "Bad credential !!"}]});
        }
        // create token
        const token= jwt.sign(
            {
                id: foundUser._id,
            },
            process.env.SECRET_KEY,
            {expiresIn: "2h"}
        );
        
        res
        .status(200)
        .send({msg: "Login successfully..", user: foundUser , token});
        } catch (error) {
            res.status(400).send({errors : [{msg: "Can not Login  the user!!"}]});
        
    }
};







