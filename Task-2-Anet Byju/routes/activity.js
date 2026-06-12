const express = require("express");
const router = express.Router();

const activityLogs = require("../data/activityLogs");


// GET ALL ACTIVITIES
router.get("/", (req, res) => {
  res.json(activityLogs);
});


// GET ACTIVITIES BY USER
router.get("/user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  const logs = activityLogs.filter((a) => a.userId === userId);

  res.json(logs);
});


// CREATE ACTIVITY LOG
router.post("/", (req, res) => {
  const { userId, action } = req.body;

  if (!userId || !action) {
    return res.status(400).json({ message: "userId and action required" });
  }

  const newLog = {
    id: activityLogs.length + 1,
    userId,
    action,
    timestamp: new Date().toISOString(),
  };

  activityLogs.push(newLog);

  res.status(201).json({
    message: "Activity logged",
    log: newLog,
  });
});


// DELETE ACTIVITY (ADMIN / DEBUG)
router.delete("/:id", (req, res) => {
  const index = activityLogs.findIndex(
    (a) => a.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Activity not found" });
  }

  const deleted = activityLogs.splice(index, 1);

  res.json({
    message: "Activity deleted",
    log: deleted[0],
  });
});

module.exports = router;