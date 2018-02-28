"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const { router: cocktailsRouter } = require("./cocktails");
const { router: menuRouter } = require("./menus");
const { dbConnect } = require("./db-mongoose");
mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require("./config");
const app = express();

app.use(
  morgan(process.env.NODE_ENV === "production" ? "common" : "dev", {
    skip: (req, res) => process.env.NODE_ENV === "test"
  })
);

app.use(morgan("common", { skip: () => process.env.NODE_ENV === "test" }));
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/cocktails/", cocktailsRouter);
app.use("/api/menus/", menuRouter);

app.use("*", (req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on("error", err => {
      console.error("Express failed to start");
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app, runServer };
