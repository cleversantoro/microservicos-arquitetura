const express = require("express");
const UserService = require("../services/UserService");
const router = express.Router();

router.post("/users", async (req, res) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: "Usuário não encontrado" });
    }
});

module.exports = router;
