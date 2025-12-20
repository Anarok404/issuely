import "dotenv/config.js";
import app from "./src/app.js";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
