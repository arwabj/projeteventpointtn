// 1 require mongoose
const mongoose = require("mongoose");

// 2  Schema
const Schema = mongoose.Schema;

// 3 create Schema event
const eventSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    //user_id
//    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    
    
    hours: {
        type : String,
        required: true
    },
    description: {
        type : String,
        required: true
    },

    // image: String,
    // cloudinary_id: String
});

// export
module.exports = Event = mongoose.model("event", eventSchema);