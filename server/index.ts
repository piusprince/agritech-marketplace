import app from "./src/app";
import dotenv from "dotenv";
import connectDB from "./src/config/db";

dotenv.config();

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
