const db = require('../config'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const saltRounds = 10;

class UserController {
    async createUser(req, res){
        let {name, email, password} = req.body; 
        try {
            password =  await bcrypt.hash(password, saltRounds)
            const newUser = await db.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [name, email, password]
            );
            res.json({
                message: "User created successfully",
                user: newUser.rows[0]
            });
        } catch (err) {
            if (err.code === '23505') { // Unique violation
                return res.status(409).json({ message: "Email already exists" });
            }
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    async loginUser(req, res) {
        function generateAccessToken(user) {
            return jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                "ssecccrretyyKEy",
                { expiresIn: '1h' }
            );
        }

        const user = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.rows[0].password);

        if (!user || !comparePassword) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const token = generateAccessToken(user.rows[0]);

        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000, //MS
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            sameSite: "strict", // CSRF attacks cross-site request forgery attacks
            secure: process.env.NODE_ENV !== "development",
        });

        res.status(200).json({
            token,
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email,
            message: "Login successful"
        });
    }

    async getUsers(req, res){
        const users = await db.query('SELECT * FROM users')
        res.json(users.rows)
    }

    async getOneUser(req, res){
        const id = req.params.id
        const users = await db.query('SELECT * FROM users where id = $1', [id])
        res.json(users.rows[0])
    }

    async updateUser(req, res){
        const {id, name, email, password} = req.body;
        const user = await db.query(
            'UPDATE users set name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [name, email, password, id]
        );
        res.json({
            message: "User updated successfully",
            user: user.rows[0]
        });
    }

    async deleteUser(req, res){
        const id = req.params.id;
        const user = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        res.json({
            message: "User deleted successfully",
            user: user.rows[0]
        });
    }
}

module.exports = new UserController();