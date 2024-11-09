import prisma from "../DB/db.config.js"

export const createPost = async (req, res) => {

    const { user_id, title, description } = req.body
    try {
        const userExists = await prisma.user.findUnique({
            where: {
                id: Number(user_id)
            }
        })

        if (!userExists) {
            return res.json({ status: 404, message: "User cannot found" })

        }
        else {
            const newPost = await prisma.post.create({
                data: {
                    user_id,
                    title,
                    description,
                }
            })
            return res.json({ status: 201, message: "Post added Successfully", data: newPost })
        }
    }
    catch (error) {
        return res.status(500).json({ status: 500, message: "Internal server error" });

    }

}
export const fetchPost = async (req, res) => {
    const posts = await prisma.post.findMany({
        include:{
            comments:{
                include:{
                    user:{
                        select:{
                            name: true,
                            post:true
                        }
                    }
                }
            },
        }
    })
    
    return res.json({ status: 400, message: "Post Found", data: posts })
}
export const showPost = async (req, res) => {
    const postId = req.params.id
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: Number(postId)
            },
        })
        if (!post) {
            return res.json({ status: 404, message: "Post not found " })

        }
        else {
            return res.json({ status: 200, message: "Post found successfully", data: post })

        }
    }
    catch (error) {
        return res.json({ status: 500, message: "Internal server error" })
    }

}

export const findByUserId = async (req, res) => {
    const userId = req.params.user_id;

    try {
        const posts = await prisma.post.findMany({
            where: {
                user_id: Number(userId)
            }
        });

        // Check if posts array is not empty
        if (posts.length > 0) {
            return res.json({ status: 200, data: posts, message: "Posts found" });
        } else {
            return res.status(404).json({ status: 404, message: "No posts found" });
        }
    } catch (error) {
        console.error("Error finding posts:", error);
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
};


export const updatePost = async (req, res) => {
    const { title, description } = req.body;
    const postId = req.params.id;

    await prisma.post.update({
        where: {
            id: Number(postId)
        },
        data: {
            title: title,
            description: description
        }
    });
    return res.json({ status: 200, message: "post updated successfully" });
};
export const deletePostById = async (req, res) => {
    const post_id = req.params.id

    try {
        const findPost = await prisma.post.findUnique({
            where: {
                id: Number(post_id)
            }
        })
        if (!findPost) {
            return res.json({ status: 404, message: 'POST not found' })

        }
        else {
            await prisma.post.delete({
                where: {
                    id: Number(post_id)
                }
            })
            return res.json({ status: 200, message: "post delete successfully" })
        }

    }
    catch (error) {
        return res.json({ Status: 500, message: "Internal Server Error" })
    }
}
export const deletePostByUser = async (req, res) => {
    const user_id = req.params.id

    try {
        const findPost = await prisma.post.findMany({
            where: {
                id: Number(user_id)
            }
        })
        if (findPost.length < 0) {
            return res.json({ status: 404, message: 'POST not found' })

        }
        else {
            await prisma.post.deleteMany({
                where: {
                    user_id: Number(user_id)
                }
            })
            return res.json({ status: 200, message: "post delete successfully" })
        }

    }
    catch (error) {
        return res.json({ Status: 500, message: "Internal Server Error" })
    }
}