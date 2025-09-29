import express from "express";

import {
    create,
    update,
    getAll,
    getById,
    excluir
} from "../controllers/maquinaProducao.js";



const router = express.Router();

// POST /users → cria uma maquina produção
router.post("/", create);

// GET /users → lista todas os as maquinas produção
router.get("/", getAll);

// GET /users/:id → lista a maquina produção por id
router.get("/:id", getById);

// PUT /users/:id → atualiza  a maquina produção
router.put("/:id", update);

// DELETE /users/:id → remove uma maquina produção
router.delete("/:id", excluir);

export default router;
