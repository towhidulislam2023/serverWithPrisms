import prisma from "../DB/db.config.js"

//fetch user 
export const fetchUser = async (req, res) => {
    const user = await prisma.user.findMany({
        include: {
            post: true, // Include user's posts
            comments: { // Include user's comments
                select: {
                    comment: true, // Select only the 'comment' field
                    post: true,    // Include the related post for each comment
                }
            }
        }
    })
    
    return res.json({ status: 200, data: user })
}
//create user 
export const createUser = async (req, res) => {
    const { name, email, password } = req.body
    const findUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    console.log(findUser);

    if (findUser) {
        return res.json({ status: 400, message: "Email already taken. Please use another one" })

    }
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
    return res.json({ status: 200, message: "New User Created", newUser })
}
// update the user 

export const updateUser = async (req, res) => {
    const { name, email, password } = req.body
    const userId = req.params.id
    const findUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    console.log(findUser);

    if (findUser) {
        return res.json({ status: 400, message: "Email already taken. Please use another one" })

    }
    await prisma.user.update({
        where: {
            id: Number(userId)
        },
        data: {
            name,
            email,
            password
        }
    })
    return res.json({ status: 200, message: "User Update Successfully" })
}

// show user  

export const showUser = async (req, res) => {
    const userId = req.params.id
    const user = await prisma.user.findFirst({
        where: {
            id: Number(userId)
        }

    })
    return res.json({ status: 400, data: user })
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        })
        if (!user) {
            return res.json({ status: 404, message: "user not found" })

        }
        else {
            await prisma.user.delete({
                where: {
                    id: Number(userId)
                }
            })
            return res.json({ status: 200, message: " user Delete Successfully " })
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "internal Server Error " })

    }


}