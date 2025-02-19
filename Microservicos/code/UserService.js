const UserRepository = require("../repositories/UserRepository");
const AuthClient = require("../clients/AuthClient");

class UserService {
    static async createUser(userData) {
        // Verifica se o usuário já existe
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (existingUser) throw new Error("Usuário já cadastrado");

        // Cria usuário no sistema externo de autenticação
        const authUser = await AuthClient.createUser(userData);
        if (!authUser) throw new Error("Erro ao criar usuário");

        // Salva no banco de dados
        return await UserRepository.create(userData);
    }

    static async getUserById(userId) {
        return await UserRepository.findById(userId);
    }
}

module.exports = UserService;
