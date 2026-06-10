const express = require("express");
const router = express.Router();
const users = require("../data/users");

// GET all users
router.get("/", (req, res) => {
  res.json(users);
});

// GET user by id
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// REGISTER USER
router.post("/register", (req, res) => {
  const { name, email, phone, password, role } = req.body;

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    phone,
    password,
    role: role || "Buyer",
  };

  users.push(newUser);

  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
  });
});

// LOGIN USER (simple simulation)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user,
  });
});

// UPDATE USER
router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, phone, password, role } = req.body;

  user.name = name ?? user.name;
  user.phone = phone ?? user.phone;
  user.password = password ?? user.password;
  user.role = role ?? user.role;

  res.json({
    message: "User updated successfully",
    user,
  });
});

// DELETE USER
router.delete("/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deleted = users.splice(index, 1);

  res.json({
    message: "User deleted successfully",
    user: deleted[0],
  });
});

module.exports = router;