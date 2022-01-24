require("dotenv").config();
require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("./public"));
app.use(express.json());

// Route
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));