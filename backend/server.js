import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import generateToken from "./utils/generateToken.js";

dotenv.config();

connectDB();

const app = express();
console.log(generateToken("Hello World"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running ....");
});

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
