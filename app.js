require("dotenv").config();
require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

const PORT = 3000;

// Middleware
app.use(express.json());

// Route
app.use("/api/v1/tasks", tasks);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));