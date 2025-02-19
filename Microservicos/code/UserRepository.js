const db = require("../config/database");

class UserRepository {
    static async create(userData) {
        const { email, name } = userData;
        const result = await db.query("INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *", [email, name]);
        return result.rows[0];
    }

    static async findById(userId) {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0];
    }
}

module.exports = UserRepository;
