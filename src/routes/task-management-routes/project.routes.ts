import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../../controllers/task-management-controllers/project.controllers";

const router = Router();

// Secure routes
router.route("/").get(verifyJWT, getAllProjects);

router.route("/:id").get(verifyJWT, getProjectById);

router.route("/").post(verifyJWT, createProject);

router.route("/:id").put(verifyJWT, updateProject);

router.route("/:id").delete(verifyJWT, deleteProject);

export default router;
