const router = require ("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require ("../utils/multer");
const Event = require ("../models/EventUser");

//POST
router.post("/", upload.single("image"), 
async (req, res) => {
    try {
        // Upload image to cloudinary
        // const result = await cloudinary.uploader.upload(req.file.path);
        // Create new Event
        let event= new Event({
            name: req.body.name,
            date: req.body.date,
            location: req.body.location,
            hours: req.body.hours,
            description: req.body.description,
            //  image: result.secure_url,
            //  cloudinary_id: result.public_id,
        });
        
        // save event details in mongodb
        console.log(event)
        await event.save();
        res.status(200).send({msg:"ok",
            event
        });
    } catch (error) { console.log(error);
        
    }
});


//GET 
router.get("/allevent", async (req, res)=> {
    try {
        const event = await Event.find();
           res.status(200).send({msg: "list Events", event});
    } catch (error) {
        res.status(400).send({msg: "can not get events", error});
        
    }
});

// DELETE
router.delete("/:_id", async (req, res)=> {
    try {
        //Find event by id
        // console.log(req.params._id)
        let event = await Event.findById(req.params._id);
        // console.log(event);
        //Delete image from cloudinary
        // await cloudinary.uploader.destroy(event.cloudinary_id);
        //Delete event from db
        await event.deleteOne();
        res.status(200).send({msg: "event deleted"}); 
    } catch (error) {
        res.status(400).send({msg: "can not delete this event", error});
        
    }
});

// PUT
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        let newEvent = await Event.findById(req.params.id);
        //Delete image from cloudinary
       // await cloudinary.uploader.destroy(newEvent.cloudinary_id);
        //Upload new image to cloudinary
        // const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            name: req.body.name || newEvent.name,
            date: req.body.date || newEvent.date,
            location: req.body.location || newEvent.location,
            hours: req.body.hours || newEvent.hours,
            // image: result.secure_url || newEvent.image,
            // cloudinary_id: result.public_id || newEvent.cloudinary_id,
        };
        updateEvent= await Event.findByIdAndUpdate(req.params.id, data, {
            new: true, });

            res.status(200).send({ msg: "event updated", updateEvent});
    } catch (error) {
        res.status(400).send({ msg: "can not update this event", error});
        
    }
});

router.get("/:_id", async (req, res) => {
    try {
        const eventToGet = await Event.findOne({ _id: req.params._id});
        res.status(200).send({ msg:"Event getted", eventToGet});
    } catch (error) {
        res.status(400).send({msg: "can not get this event", error});
    }
});
module.exports = router;