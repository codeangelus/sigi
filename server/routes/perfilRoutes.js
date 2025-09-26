import express from "express";

import {
    create,
    update,
    getAll,
    getById,
    excluir
} from "../controllers/perfilController.js";



const router = express.Router();

// POST /users → cria perfil
router.post("/", create);

// GET /users → lista todas os perfils
router.get("/", getAll);

// GET /users/:id → lista o perfil por id
router.get("/:id", getById);

// PUT /users/:id → atualiza  perfil
router.put("/:id", update);

// DELETE /users/:id → remove um perfil
router.delete("/:id", excluir);

export default router;
