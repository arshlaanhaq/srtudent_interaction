const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// console.log(require("./routes/auth"));n

// Routes
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const applicationRoutes = require("./routes/application");

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/application", applicationRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
