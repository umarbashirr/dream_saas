import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../../controllers/task-management-controllers/tag.controllers";

const router = Router();

// Secure routes
router.route("/").get(verifyJWT, getAllTags);
router.route("/:id").get(verifyJWT, getTagById);
router.route("/").post(verifyJWT, createTag);
router.route("/:id").put(verifyJWT, updateTag);
router.route("/:id").delete(verifyJWT, deleteTag);

export default router;
