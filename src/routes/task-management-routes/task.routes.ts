import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getAllTasksByProject,
  getTaskById,
  updateTask,
  updateTaskAssignedTo,
} from "../../controllers/task-management-controllers/task.controllers";

const router = Router();

// Secure routes
router.route("/").get(verifyJWT, getAllTasksByProject);
router.route("/all").get(verifyJWT, getAllTasks);
router.route("/").post(verifyJWT, createTask);
router.route("/:id").get(verifyJWT, getTaskById);
router.route("/:id").put(verifyJWT, updateTask);
router.route("/update-team/:id").patch(verifyJWT, updateTaskAssignedTo);
router.route("/:id").delete(verifyJWT, deleteTask);

export default router;
