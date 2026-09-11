const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");

const routes = require("./routes");

const app = express();

app.use(clerkMiddleware());
app.use(cors());
app.use(express.json());

app.use("/api", routes);

module.exports = app;