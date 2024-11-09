import { Router } from "express";
const router = Router();
import { createComment, deleteCommentById, FetchComment } from "../Controller/CommentController.js";

router.get("/get",FetchComment)
router.post("/add",createComment)
router.delete("/delete/:id",deleteCommentById)



export default router