import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware";
import {
  createComment,
  deleteComment,
  getAllCommentsForTask,
  updateComment,
} from "../../controllers/task-management-controllers/comment.controllers";

const router = Router();

// Create a new comment
router.route("/").post(verifyJWT, createComment);
router.route("/").get(verifyJWT, getAllCommentsForTask);
router.route("/:commentId").delete(verifyJWT, deleteComment);
router.route("/:commentId").put(verifyJWT, updateComment);

export default router;
