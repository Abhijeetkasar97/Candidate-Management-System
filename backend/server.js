require("dotenv").config();
const express = require("express");
const cors = require("cors");

const candidateRoutes = require("./routes/candidate.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/candidates", candidateRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {

  res.status(500).json({ error: err.message });
});

app.listen(5000, () =>
  console.log("Server running on port 5000")
);
