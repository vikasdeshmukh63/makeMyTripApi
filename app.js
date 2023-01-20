let express = require("express");
let app = express();
let cors = require("cors");
let mongo = require("mongodb");
let dotenv = require("dotenv");
let port = process.env.PORT || 5000;
let MongoClient = mongo.MongoClient;
let mongoUrl = "mongodb+srv://test:test123@cluster0.sr3vmda.mongodb.net/?retryWrites=true&w=majority";
let db;

app.use(cors());
app.use(express.json());

// documentation
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

// to get all cities
app.get("/cities", (req, res) => {
    db.collection("city").find().toArray((err, data) => {
        if (err) {
            throw err
        } else {
            res.send(data);
        }
    });
});


// to get all hotels
app.get("/hotels", (req, res) => {
    db.collection("hotels").find().toArray((err, data) => {
        if (err) {
            throw err
        } else {
            res.send(data);
        }
    });
});


// to get all hotels based on condition(state id)
app.get("/hotels/state_id/:id", (req, res) => {
    let state_id = Number(req.params.id);

    db.collection("hotels").find({ state_id: state_id }).toArray((err, data) => {
        if (err) {
            throw err
        } else {
            res.send(data);
        }
    });
});


// to get all hotels based on condition(hotel id)
app.get("/hotels/hotel_id/:id", (req, res) => {
    let hotel_id = Number(req.params.id);

    db.collection("hotels").find({ hotel_id: hotel_id }).toArray((err, data) => {
        if (err) {
            throw err
        } else {
            res.send(data);
        }
    });
});


// to get all hotels based on condition(hotel aminities)
app.get("/filter/amenities", (req, res) => {
    let amenities = req.query;

    if (amenities.wifi) {
        db.collection("amenities").find({ wifi: req.query.wifi }).toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    }
    else if (amenities.free_cancellation) {
        db.collection("amenities").find({ free_cancellation: req.query.free_cancellation }).toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    } else if (amenities.free_breakfast) {
        db.collection("amenities").find({ free_breakfast: req.query.free_breakfast }).toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    } else if (amenities.spa) {
        db.collection("amenities").find({ spa: req.query.spa }).toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    } else if (amenities.swimming_pool) {
        db.collection("amenities").find({ swimming_pool: req.query.swimming_pool }).toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    } else {
        db.collection("amenities").find().toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    }
});


// to get all hotels based on condition(hotel aminities)
app.get("/filter/hotelrules", (req, res) => {
    let hotelrules = req.query;

    if (hotelrules.pets_allowed) {
        db.collection("hotelrules").find({ pets_allowed: req.query.pets_allowed }).toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    }
    else if (hotelrules.bachelors_allowed) {
        db.collection("hotelrules").find({ bachelors_allowed: req.query.bachelors_allowed }).toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    } else if (hotelrules.smoking_allowed) {
        db.collection("hotelrules").find({ smoking_allowed: req.query.smoking_allowed }).toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    } else if (hotelrules.alcohol_allowed) {
        db.collection("hotelrules").find({ alcohol_allowed: req.query.alcohol_allowed }).toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    } else if (hotelrules.allows_unmarried_couples) {
        db.collection("hotelrules").find({ allows_unmarried_couples: req.query.allows_unmarried_couples }).toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    } else {
        db.collection("hotelrules").find().toArray((err, data) => {
            if (err) {
                throw err
            } else {
                res.send(data);
            }
        });
    }
});


// to get all hotels based on condition(hotel category)
app.get("/filter/category/:category_id", (req, res) => {
    let category_id = Number(req.params.category_id);

    db.collection("hotels").find({ category_id: category_id }).toArray((err, data) => {
        if (err) {
            throw err
        } else {
            res.send(data);
        }
    });
});


// to get hotels based on price criteria
app.get("/filter/price", (req, res) => {
    let sort = req.query.sort;
    let min = Number(req.query.min);
    let max = Number(req.query.max);

    if (sort === "low-high") {
        db.collection("hotels").find().sort({ price_per_night: 1 }).toArray((err, data) => {
            if (err) {
                throw err;
            } else {
                res.send(data);
            }
        });
    } else if (sort === "high-low") {
        db.collection("hotels").find().sort({ price_per_night: -1 }).toArray((err, data) => {
            if (err) {
                throw err;
            } else {
                res.send(data);
            }
        });
    } else if (min && max) {
        db.collection("hotels").find({ price_per_night: { $gte: min, $lte: max } }).sort({ price_per_night: sort }).toArray((err, data) => {
            if (err) {
                throw err;
            } else {
                res.send(data);
            }
        });
    } else {
        db.collection("hotels").find().toArray((err, data) => {
            if (err) {
                throw err;
            } else {
                res.send(data);
            }
        });
    }
});

// to get bookings
app.get("/bookings", (req, res) => {
    let query = {};
    let email = req.query.email
    if (email) {
        query = { email };
    }
    db.collection("bookings").find(query).toArray((err, data) => {
        if (err) {
            throw err
        } else {
            res.send(data);
        }
    });
});

// create booking data
app.post("/createbooking", (req, res) => {
    db.collection("bookings").insertOne(req.body, (err, data) => {
        if (err) {
            throw err
        } else {
            res.send("Booking done successfully");
        }
    });
});


// update booking data
app.put("/updatebooking/:id", (req, res) => {
    let booking_id = Number(req.params.id);
    db.collection("bookings").updateOne(
        { booking_id: booking_id },
        {
            $set: { "status": req.body.status, "bank_name": req.body.bank_name, "date": req.body.date }
        }, (err, data) => {
            if (err) {
                throw err
            } else {
                res.send("Booking updated successfully");
            }
        }
    );
});

// delete booking data
app.delete("/deletebooking/:id",(req,res)=>{
    let _id = mongo.ObjectId(req.params.id);
    db.collection("bookings").remove({_id},(err,data)=>{
        if(err){
            throw err
        }else{
            res.send("booking data is successfully deleted");
        }
    });
});


// available types of room details
app.post("/roomdata",(req,res)=>{
    if(Array.isArray(req.body.id)){
        db.collection("roomdata").find({room_id:{$in:req.body.id}}).toArray((err,data)=>{
            if(err){
                throw err
            }else{
                res.send(data);
            }
        })
    }else{
        res.send("Invalid Input");
    }
})

// connection with mongodb
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
        console.log("Error while connecting");
    } else {
        db = client.db("mmt");
        app.listen(port, (err) => {
            if (err) {
                throw err;
            } else {
                console.log(`server has started on port ${port}`);
            }
        });
    }
});

