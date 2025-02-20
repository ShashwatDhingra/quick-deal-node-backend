// Initial Configurations
require("dotenv").config();

// Imports
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { log } = require("./utils/utils");

// Routes Import
const authRoute = require("./routes/auth.route");
const dynamicRoute = require("./routes/dynamic.route");
// const followupRoute = require("./routes/followup.route");
const app = express();
app.use(bodyParser.json());
app.use(morgan("dev")); // For API Response logs.
app.use(cors());

// Using Routes
const baseUrl = "/api/v1";
app.use(`${baseUrl}/auth`, authRoute);

app.use(`${baseUrl}`, dynamicRoute);

// app.use(`${baseUrl}`, followupRoute);

module.exports = app;
