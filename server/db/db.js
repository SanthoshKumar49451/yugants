


import mongoose from "mongoose";

const connectToDb =async () => {
 await  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Error while connecting database:", err);
    });
};

export default connectToDb;
