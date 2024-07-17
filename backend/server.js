const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const docRouter = require("./routers/docRoutes");
const apntRouter = require("./routers/appointmentRoutes");

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

mongoose.connect("mongodb://localhost/medify")
.then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log(err.message)                   
});

app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.use("/api/doc", docRouter);
app.use("/api/appointment", apntRouter)      

app.listen(5001, ()=>{
    console.log(`server running at http:///localhost:${5001}`)
})