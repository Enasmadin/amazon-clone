const functions = require("firebase-functions");
const express= require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// app config 

const app = express();

// middleware 
app.use(cors({origin:true}));
app.use(express.json());

// Api Route 
app.get("/",(req,res)=>res.status(200).send("heloo world"));
app.post("/payments/create",async(req,res)=>{
    const total = req.query.total
    const paymentIntent= await stripe.paymentIntents.create({
       amount:total,
       currency:"usd",
    });
    res.status(201).send({
        // clientSecret:paymentIntent.client_secret,
        clientSecret: paymentIntent.client_secret,
    })
})

//Lisiton Commend 

exports.api= functions.https.onRequest(app);

// (http://127.0.0.1:5001/colone-efc39/us-central1/api //





