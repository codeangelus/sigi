import express from "express";

import {
    create,
    update,
    getAll,
    getById,
    excluir
} from "../controllers/usuarioController.js";



const router = express.Router();

// POST /users → cria usuario
router.post("/", create);

// GET /users → lista todas os usuarios
router.get("/", getAll);

// GET /users/:id → lista o usuario por id
router.get("/:id", getById);

// PUT /users/:id → atualiza  usuario
router.put("/:id", update);

// DELETE /users/:id → remove um usuario
router.delete("/:id", excluir);

export default router;
