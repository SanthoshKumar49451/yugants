import dotenv from "dotenv";
dotenv.config();

import { config } from "dotenv";
import express from 'express';
import cors from 'cors';
import connectToDb from "./db/db.js";
import upload from "./middleware/upload.js";
import Subscribe from "./models/Subscribe.js";
import JobOpening from "./models/JobOpening.js";
import VeloceeoContact from "./models/VeloceeoContact.js";
import YugantContact from "./models/YugantContact.js";
import nodemailer from 'nodemailer';



const app = express();

config({ path: "./config/config.env" });

connectToDb();


app.use(express.json());
const corsOptions = {
  origin: [
    `${process.env.FRONTEND_URL}`,  
    'http://localhost:3000'                                
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

 
};


app.use(cors(corsOptions));


app.options('*', cors(corsOptions));

app.get('/',(req,res)=>{
  res.send("api working")
})


app.post('/api/veloceeocontact', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    const veloceeeocontact = new VeloceeoContact({
      name,
      phone,
      email,
      message
    });
    await veloceeeocontact.save();
    res.status(201).json({ 
      success:true,
      
      message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
});
app.post('/api/yugantcontact', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    const yugantcontact = new YugantContact({
      name,
      phone,
      email,
      message
    });
    await yugantcontact.save();
    res.status(201).json({ 
      success:true,
      
      message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
});

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    
    if (!email || typeof email !== "string") {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const subscription = new Subscribe({email})
    await subscription.save();

    res.status(201).json({
      success: true,
      message: "Subscribed successfully"
    });

  } catch (error){

    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

app.post("/api/job-opening", upload.single("resume"), async (req, res) => {
  try {
    const { name, contact, email, post, experience, otherDetails } = req.body;
    const resumeUrl = req.file?.path;

    if (!resumeUrl) {
      return res.status(400).json({ success: false, message: "Resume upload failed" });
    }

    const newJob = new JobOpening({
      name,
      contact,
      email,
      post,
      experience,
      otherDetails,
      resumeUrl,
    });

    await newJob.save();





    res.status(201).json({
      success: true,
      message: "Job application submitted successfully.",
      data: newJob,
    });
  } catch (error) {
    console.error("Job submission error:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 