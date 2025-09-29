import express from "express";

import {
    create,
    update,
    getAll,
    getById,
    excluir
} from "../controllers/maqModelController.js";



const router = express.Router();

// POST /users → cria uma maquina
router.post("/", create);

// GET /users → lista todas os as maquinas
router.get("/", getAll);

// GET /users/:id → lista a maquina por id
router.get("/:id", getById);

// PUT /users/:id → atualiza  a maquina
router.put("/:id", update);

// DELETE /users/:id → remove uma maquina
router.delete("/:id", excluir);

export default router;
