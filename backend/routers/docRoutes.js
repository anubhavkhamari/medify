const express = require("express");
const Doc = require("../models/docModel.js");
const { ObjectId } = require('mongodb');

const docRouter = express.Router();

docRouter.get("/", async (req, res) => {
    const docs = await Doc.find();
    res.status(200).send(docs);
})

docRouter.get("/:id", async (req, res) => {
    const doc = await Doc.findById(new ObjectId(req.params.id));
    res.status(200).send(doc);
})

docRouter.get("/search/:s", async (req, res) => {
    const searchQuery = req.params.s;
    try {
      const doctors = await Doc.find({
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { specialty: { $regex: searchQuery, $options: 'i' } },
          { hospital: { $regex: searchQuery, $options: 'i' } }
        ]
      });
      res.json(doctors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
})

docRouter.post("/", async (req, res) => {
    if (req.body.uid || req.body.name || req.body.age || req.body.experience || req.body.specialization || req.body.specialization || req.body.hospital || req.body.address || req.body.contact || req.body.email || req.body.detail) {
        const doc = new Doc({
            name: req.body.name,
            age: req.body.age,
            experience: req.body.experience,
            specialization: req.body.speciality,
            hospital: req.body.hospital,
            address: req.body.address,
            contact: req.body.contact,
            email: req.body.email,
            detail: req.body.detail
        })

        const save = await doc.save();
        console.log(save)
        res.status(200).send(save);
    } else {
        res.status(404).send({ message: "Please Check All Fields Again." })
    }
})

docRouter.post("/update/:id", async (req, res) => {
    const doc = await Doc.findById(new ObjectId(req.params.id));
    const updatedDoc = {
        name: req.body.name || doc.name,
        age: req.body.age || doc.age,
        experience: req.body.experience || doc.experience,
        specialization: req.body.specialization || doc.specialization,
        hospital: req.body.hospital || doc.hospital,
        address: req.body.address || doc.address,
        contact: req.body.contact || doc.contact,
        email: req.body.email || doc.email,
        detail: req.body.detail || doc.detail
    }

    Doc.findByIdAndUpdate(req.params.id, updatedProduct, { new: true })
        .then(data => { res.status(201).json(data) })
        .catch(error => { res.status(400).send('Error updating the  data') })
})

// DELETE
docRouter.get("/delete/:id", async (req, res) => {
    Doc.findByIdAndDelete(req.params.id)
        .then(data => { res.status(201).send(`Deleted the product with the id ${data._id}`) })
        .catch(error => { res.status(400).send('Error updating the  data') })
})



module.exports = docRouter;
