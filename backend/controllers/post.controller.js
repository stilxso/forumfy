const db = require('../config')

class PostController {
    async createPost(req, res){
        const {user_id, title, content, created_at} = req.body;
        const newPost = await db.query(
            'INSERT INTO posts (user_id, title, content, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, title, content, created_at]
        );
        res.json({
            message: "Post created successfully",
            post: newPost.rows[0]
        });
    }
   
    async editPost(req, res){
        const {id, user_id, title, content} = req.body
        const post = await db.query('Update posts set title = $1, content = $2 where id = $3 and user_id = $4 RETURNING *', 
            [title, content, id, user_id]
        )
        res.json({message: "Post updated successfully", post: post.rows[0]})
    }

    async deletePost(req, res){
        const id = req.params.id
        const post = await db.query('DELETE FROM posts WHERE id == $1 RETURNING *', [id])
        res.json({
            message: "post deleted successfully",
            post: post.rows[0]
        })
    }

    async getPosts(req, res){
        const posts = await db.query('SELECT * FROM posts')
        res.json(posts.rows[0])
    }

    async getOnePost(req, res){
        const id = req.params.id
        const post = await db.query('SELECT * FROM posts WHERE id = $1', [id])
        res.json(post.rows[0])
    }
}

module.exports = new PostController()