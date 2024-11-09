import express from "express"
import "dotenv/config"

const app = express()
const port = process.env.port || 8003


app.get("/",(req,res)=>{
    return res.send("Hi Everyone , server is running")
})

// middleware 

app.use(express.json())
app.use(express.urlencoded({extended:false}))


// * Routes file
import routes from "./routes/index.js";
app.use(routes);




app.listen(port,()=>console.log(`server running on port ${port}`))