const express = require("express");

// const {getJobFilters} = require("../controllers/jobs/filters");
const {getUsers, createUser, updateUser, deleteUser, userById} = require("../controllers/users/users");
// const {createTask, getTasks, taskComplete} = require("../controllers/task");
const router = express.Router();

//users
router.get("/users", getUsers);
router.post("/users",  createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/users/:id", userById);

module.exports = router;
