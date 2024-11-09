import prisma from '../DB/db.config.js'
export const FetchComment = async (req, res) => {
    try {
        const comment = await prisma.comment.findMany()
        if (comment.length > 0) {
            return res.json({ data: comment, status: 400, message: "comment found" })
        }
        else {
            return res.json({ status: 404, message: "comment not Found" })
        }


    }
    catch (error) {
        return res.json({ status: 500, message: "Internal server Error" })
    }

}
export const createComment = async (req, res) => {
    const { user_id, post_id, comment } = req.body;

    try {
        // Validate user_id and post_id
        if (isNaN(user_id) || isNaN(post_id)) {
            return res.status(400).json({ status: 400, message: "Invalid user_id or post_id" });
        }
        // increase the comment count
        await prisma.post.update({
            where: {
                id: Number(post_id)
            }
            ,
            data: {
                comment_count: {
                    increment: 1
                }
            }
        })
        // Check if the user exists
        const userExists = await prisma.user.findUnique({
            where: { id: Number(user_id) }
        });

        // Check if the post exists
        const postExists = await prisma.post.findUnique({
            where: { id: Number(post_id) }
        });

        // Handle user or post not found
        if (!userExists) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        if (!postExists) {
            return res.status(404).json({ status: 404, message: "Post not found" });
        }

        // Create the comment if both user and post exist
        const newComment = await prisma.comment.create({
            data: {
                user_id: Number(user_id),
                post_id: Number(post_id),
                comment: comment
            }
        });

        return res.status(201).json({ status: 201, message: "Comment posted successfully", data: newComment });

    } catch (error) {
        // Handle any other errors
        return res.status(500).json({ status: 500, message: "An error occurred", error: error.message });
    }
};
export const deleteCommentById = async (req, res) => {
    const commentId = req.params.id

    try {
        // decrement  the comment count
        await prisma.post.update({
            where: {
                id: Number(post_id)
            }
            ,
            data: {
                comment_count: {
                    decrement: 1
                }
            }
        })
        const findComment = await prisma.comment.findUnique({
            where: {
                id: commentId
            }
        })

        if (!findComment) {
            return res.json({ status: 404, message: "comment not found" })

        }
        else {
            await prisma.comment.delete({
                where: {
                    id: commentId
                }
            })
            return res.json({ status: 200, message: "message Delete Successfully" })
        }

    } catch (error) {

    }

}
