import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import authRoutes from "./routes/auth.routes";
// import { authMiddleware} from "./middlewares/auth.middleware"

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("API is running ");
});



app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({
    message: "Internal Server Error",
  });
});


const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });


















