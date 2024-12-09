const express = require("express");
const app=express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./configs/db.js");


//dot en configuration
dotenv.config();
//DB connection
connectDb();

app.use(express.json());
app.use(morgan("dev"));

// route
app.use("/api/auth",require("./Routes/authRoutes.js"))

// app.get("/", (req, res) => {
//     return res
//       .status(200)
//       .send("<h1>Welcome to Food Server APP API BASE PROJECT </h1>");
//   });

  //PORT
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});