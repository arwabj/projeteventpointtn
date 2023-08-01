//1

const mongoose = require ("mongoose");

//2
 
const connectDB = async () => {
    try {
        // mongoose.set("strictQuerry", false);
        await mongoose.connect (process.env.DB_URI, { useNewUrlParser: true});
        console.log("Database connected...");
    } catch (error) 
    {
        console.log("Can not connected !!!", error);
    }
};

//3 

module.exports = connectDB;