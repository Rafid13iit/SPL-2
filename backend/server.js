// const express = require('express')
// const app = express()

// // routes
// app.get('/', (req, res)=>{
//     res.send('Welcome to DUSP')
// })

// app.get('/blog', (req, res)=>{
//     res.send('Welcome to DUSP Blogsssss.....')
// })

// app.listen(3000, ()=>{
//     console.log('Server is Running on PORT 3000')
// })

// const port = 4003;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");

// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb+srv://efty3222:nj3PG6GvAdRrqsYW@cluster0.nzlkviu.mongodb.net/SPL-2", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const Users = mongoose.model("Users", {
//   name: String,
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: String,
//   cartData: Object,
//   number: String,
//   professionalPosition: String,
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   category: String,
//   dob: Date,
//   registrationNumber: String,
// });

// app.get("/", (req, res) => {
//   res.send("Express app is running");
// });

// // Creating endpoint for registering the user
// app.post("/register", async (req, res) => {
//   try {
//     console.log('Request body:', req.body);
//     let check = await Users.findOne({ email: req.body.email });
//     if (check) {
//       return res.status(400).json({ success: false, errors: "User already exists with this email" });
//     }

//     let cart = {};
//     for (let i = 0; i < 300; i++) {
//       cart[i] = 0;
//     }

//     const user = new Users({
//       name: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       number: req.body.number,
//       professionalPosition: req.body.professionalPosition,
//       cartData: cart,
//       category: req.body.category,
//       dob: req.body.dob,
//       registrationNumber: req.body.registrationNumber,
//     });

//     await user.save();

//     const data = { user: { id: user.id } };
//     const token = jwt.sign(data, 'secret_ecom');
//     res.json({ success: true, token });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ success: false, errors: "Server error" });
//   }
// });

// // Endpoint for user login
// app.post("/login", async (req, res) => {
//   try {
//     let user = await Users.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(400).json({ success: false, errors: "Invalid credentials" });
//     }

//     const passCompare = req.body.password === user.password;

//     if (!passCompare) {
//       return res.status(400).json({ success: false, errors: "Invalid credentials" });
//     }

//     const data = { user: { id: user.id } };
//     const token = jwt.sign(data, 'secret_ecom');
//     res.json({ success: true, token });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ success: false, errors: "Server error" });
//   }
// });

// app.listen(port, () => {
//   console.log("Server running on port: " + port);
// });



const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'rafidssrr.6767@gmail.com', // Replace with your email
      pass: 'your-email-password',  // Replace with your email password
    },
  });

  // Mail options
  let mailOptions = {
    from: email,
    to: 'rafidssrr.6767@gmail.com', // Replace with your pool's email
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Message sent successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
