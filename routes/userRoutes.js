import { Router } from "express";
import { createUser, deleteUser, fetchUser, showUser, updateUser } from "../Controller/UserController.js";
import asyncHandler from 'express-async-handler'; // Middleware to handle async errors
import { validateUser } from "../Middleware/validateUser.js";

const router = Router(); 

// Fetch all users with optional pagination (GET)
router.get("/get", asyncHandler(fetchUser));

// Fetch a single user by ID (GET)
router.get("/get/:id", asyncHandler(showUser));

// Create a new user (POST)
router.post("/add", validateUser, asyncHandler(createUser));

// Update an existing user (PUT)
router.put("/update/:id", validateUser, asyncHandler(updateUser));

// Delete a user by ID (DELETE)
router.delete("/delete/:id", asyncHandler(deleteUser));

export default router;
