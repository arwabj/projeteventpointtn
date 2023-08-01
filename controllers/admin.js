const Admin = require ("../models/admin");
const bcrypt = require('bcrypt');
const jwt = require ("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        
        // req.body => newAdmin
        const { name, email, password, phone} = req.body;
        const foundAdmin = await Admin.findOne ({ email});
        if (foundAdmin) {
            return res
            .status(400)
            .send ({errors: [{msg: "Email should be unique try again please !!!"}] });
        }
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash (password, saltRounds);

         // const newAdmin
         const newAdmin = new Admin ({...req.body});
         newAdmin.password = hashedpassword;

         // save
         await newAdmin.save();
         // creation token
         const token = jwt.sign(
            {
                id: newAdmin._id,

            },
            process.env.SECRET_KEY,
            {expiresIn:"2h"}
         );

         res
         .status(200)
         .send ({msg: "Register successfully ...", newAdmin, token});
        
    } catch (error) { 
        res.status(400).send({ msg: "Can not register the admin "});
        
    }
};

exports.login = async (req, res) => {

    try {
        const { email, password} = req.body;
        // check if email exist
        const foundAdmin = await Admin.findOne({email});
        if (!foundAdmin){
            return res.status(400).send ({errors: [{msg: "Bad credential !!"}]});
        }
        const checkPassword = await bcrypt.compare(password, foundAdmin.password);
        if(!checkPassword){
            return res.status(400).send({errors: [{msg: "Bad credential !!"}]});
        }
        // create token
        const token= jwt.sign(
            {
                id: foundAdmin._id,
            },
            process.env.SECRET_KEY,
            {expiresIn: "2h"}
        );
        
        res
        .status(200)
        .send({msg: "Login successfully..", Admin: foundAdmin , token});
        } catch (error) {
            res.status(400).send({errors : [{msg: "Can not Login  the admin!!"}]});
        
    }
};