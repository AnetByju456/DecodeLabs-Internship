const express = require("express");
const router = express.Router();
const connection = require("../config/db");


// GET all activity for a user
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT *
    FROM activity_logs
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.status(200).json(results);
  });
});


// CREATE activity log
router.post("/", (req, res) => {
  const { user_id, action } = req.body;

  if (!user_id || !action) {
    return res.status(400).json({
      message: "user_id and action are required",
    });
  }

  const query = `
    INSERT INTO activity_logs (user_id, action)
    VALUES (?, ?)
  `;

  connection.query(
    query,
    [user_id, action],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      res.status(201).json({
        message: "Activity logged successfully",
        activityId: result.insertId,
      });
    }
  );
});

module.exports = router;