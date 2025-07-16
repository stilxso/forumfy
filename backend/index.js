const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')

const app = express();

const port = 8080;

app.use(cors())
app.use(express.json()) 
app.use('/api', userRouter)
app.use('/api', postRouter)

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))