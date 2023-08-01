//1 
const express = require ("express");

//2 
const app = express ();


// 5
require ("dotenv").config();

// 6
const connectDB = require ("./config/connectDB");
connectDB ();

//7 routing
//middleware global / bodyparser
app.use(express.json());
// parse requests of content-type application
app.use(
    express.urlencoded({
        extended: true,
    })
);

//middleware routes
app.use("/api/user", require ("./routes/user"));
app.use("/api/visitor", require("./routes/visitor"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/event", require("./routes/EventUser"));

//3
const PORT = process.env.PORT;

//4
app.listen(PORT, (err)=> 
    err ? console.error(err) : console.log(`Server runnig on port ${PORT}..`)

);