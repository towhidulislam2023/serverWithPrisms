import { Router } from "express";
import { createPost, deletePostById, deletePostByUser, fetchPost, findByUserId, showPost, updatePost } from "../Controller/PostController.js";
const router = Router()

router.post("/add",createPost)
router.get("/get",fetchPost)
router.get("/get/:id",showPost)
router.get("/get/by_user/:user_id",findByUserId)
router.put("/update/:id",updatePost)
router.delete("/delete/:id",deletePostById)
router.delete("/delete/user/:id",deletePostByUser)

export default router 