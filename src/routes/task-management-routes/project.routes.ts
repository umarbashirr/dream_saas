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
router.route("/projects").get(verifyJWT, getAllProjects);

router.route("/projects/:id").get(verifyJWT, getProjectById);

router.route("/projects").post(verifyJWT, createProject);

router.route("/projects/:id").put(verifyJWT, updateProject);

router.route("/projects/:id").delete(verifyJWT, deleteProject);

export default router;