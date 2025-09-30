import express from "express";

import {
    create,
    update,
    getAll,
    getById,
    excluir
} from "../controllers/maquinaProducao.js";



const router = express.Router();

// POST /prod → cria uma maquina produção
router.post("/", create);

// GET /prod → lista todas os as maquinas produção
router.get("/", getAll);

// GET /prod/:id → lista a maquina produção por id
router.get("/:id", getById);

// PUT /prod/:id → atualiza  a maquina produção
router.put("/:id", update);

// DELETE /prod/:id → remove uma maquina produção
router.delete("/:id", excluir);

export default router;
