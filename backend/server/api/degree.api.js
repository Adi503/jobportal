var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../models/Degree");

//@type         GET
//@route        /degree/list
//@desc         get degree
//@access       PUBLIC
router.get("/list", (req, res) => {
    db.find({}, (err, docs) => {
        if (err) throw err;
        res.end(JSON.stringify(docs));
    });
});

//@type         POST
//@route        /degree/save
//@desc         save degree
//@access       PUBLIC
router.post("/save", (req, res) => {
    var data = {
        _id: mongoose.Types.ObjectId(),
        long_name: req.body.long_name,
        short_name: req.body.short_name,
        name: req.body.long_name + " (" + req.body.short_name + ")",
        st_date: new Date(),
        up_date: new Date()

    };
    var newRecord = new db(data);
    newRecord.save((err, docs) => {
        if (err) throw err;
        res.send({ msg: "success" });
    });
});

//@type         DELETE
//@route        /degree/delete/
//@desc         delete degree
//@access       PUBLIC
router.delete("/delete/:id", (req, res) => {
    db.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), err => {
        if (err) res.send(err);
        res.send({ msg: "success" });
    });
});

//@type         PUT
//@route        /degree/update/
//@desc         update degree
//@access       PUBLIC
router.put("/update", (req, res) => {
    var _id = req.body._id;
    var query = { _id: mongoose.Types.ObjectId(_id) };
    var update = {
        long_name: req.body.long_name,
        short_name: req.body.short_name,
        name: req.body.long_name + " (" + req.body.short_name + ")",
        up_date: new Date()

    };
    db.findOneAndUpdate(query, update, (err, doc) => {
        if (err) throw err;
        res.json(doc);
    });
});



module.exports = router;