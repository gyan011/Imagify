import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import imageRouter from "./routes/imageRoute.js";


const app = express();
app.use(express.json());
dotenv.config();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "token"], 
}));

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  })

async function main() {
    await mongoose.connect(MONGO_URL);
}


app.use("/api/user", userRouter)
app.use("/api/image", imageRouter)


app.get('/', (req, res) => {
  res.send("API Working")
})

app.listen(PORT, () => {
  console.log("Server is running on port 4000")
})