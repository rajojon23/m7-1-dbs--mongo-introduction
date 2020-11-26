"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { getUsers } = require("./exercises/exercise-1.3");
const { addUser } = require("./exercises/exercise-1.4");
const { createGreeting, getGreeting, getManyGreetings, deleteGreeting, updateGreeting } = require("./exercises/exercise-2");

const PORT = process.env.PORT || 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // exercise 1
  .get("/exercise-1/users", getUsers)
  .put("/exercise-1/users", addUser)

  // exercise 2
  .get("/exercise-2/greeting/:_id", getGreeting)
  .get("/exercise-2/greetings", getManyGreetings)
  .post("/exercise-2/greeting", createGreeting)
  .put("/exercise-2/greeting", updateGreeting)
  .delete("/exercise-2/greeting/:_id", deleteGreeting)

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
