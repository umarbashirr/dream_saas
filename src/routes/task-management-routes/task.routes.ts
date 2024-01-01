import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../../controllers/task-management-controllers/task.controllers";

const router = Router();

// Secure routes
router.route("/").get(verifyJWT, getAllTasks);
router.route("/").post(verifyJWT, createTask);
router.route("/:id").get(verifyJWT, getTaskById);
router.route("/:id").put(verifyJWT, updateTask);
router.route("/:id").delete(verifyJWT, deleteTask);

export default router;
