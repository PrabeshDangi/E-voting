import dotenv from "dotenv";
import connectDB from "./Database/DB.js";
import app from "./app.js";

dotenv.config({ path: "./.env" });

app.on("error", (error) => {
  console.error("Error: ", error);
  throw error;
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed!!", error);
  });
