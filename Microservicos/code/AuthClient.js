const axios = require("axios");

class AuthClient {
    static async createUser(user) {
        try {
            const response = await axios.post("http://authservice:4000/auth/register", {
                email: user.email,
                password: user.password
            });
            return response.data;
        } catch (err) {
            return null;
        }
    }
}

module.exports = AuthClient;
