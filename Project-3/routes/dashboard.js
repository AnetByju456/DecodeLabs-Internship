const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const authenticateToken = require("../middleware/auth");

router.get("/:userId", authenticateToken, (req, res) => {
  const userId = req.params.userId;
  if (parseInt(userId) !== req.user.id) {
    return res.status(403).json({
      message: "Access denied"
    });
  }

  const dashboardData = {};

  // Get user details
  connection.query(
    "SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?",
    [userId],
    (err, userResults) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (userResults.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      dashboardData.user = userResults[0];

      // Get user's products
      connection.query(
        "SELECT * FROM products WHERE user_id = ?",
        [userId],
        (err, productResults) => {
          if (err) {
            return res.status(500).json({
              message: "Database error",
            });
          }

          dashboardData.products = productResults;

          // Get user's orders
          connection.query(
            "SELECT * FROM orders WHERE user_id = ?",
            [userId],
            (err, orderResults) => {
              if (err) {
                return res.status(500).json({
                  message: "Database error",
                });
              }

              dashboardData.orders = orderResults;

              // Get activity logs
              connection.query(
                `
                SELECT *
                FROM activity_logs
                WHERE user_id = ?
                ORDER BY created_at DESC
                LIMIT 10
                `,
                [userId],
                (err, activityResults) => {
                  if (err) {
                    return res.status(500).json({
                      message: "Database error",
                    });
                  }

                  dashboardData.activities = activityResults;

                  // Dashboard statistics
                  dashboardData.stats = {
                    totalProducts: productResults.length,
                    totalOrders: orderResults.length,
                    totalActivities: activityResults.length,
                  };

                  res.status(200).json(dashboardData);
                }
              );
            }
          );
        }
      );
    }
  );
});

module.exports = router;