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
const propertyRoute = require("./routes/property.route");
const followupRoute = require("./routes/followup.route");

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev")); // For API Response logs.
app.use(cors());

// Using Routes
const baseUrl = "/api/v1";
app.use(`${baseUrl}/auth`, authRoute);

app.use(`${baseUrl}`, propertyRoute);

app.use(`${baseUrl}`, followupRoute);

module.exports = app;
