import express, { json } from "express";
import mongoose from "mongoose";

//importing product routes
import productRoutes from "./routes/product.routes.js";
//importing user routes
import userRoutes from "./routes/user.routes.js";
// creatinga n instance of server
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

/*
app.get("/Hello", (req, res)=>{
  res.status(200).json({message:"on hello route get"})
})
*/

// connecting to the database

mongoose
  .connect(process.env.MONGODB_ACCESS_TOKEN)
  .then(() => {
    app.listen(8000, () => {
      console.log("running");
    });
  })
  .catch((err) => {
    console.log("Error occoured while connecting to the Database");
  });
