import express from "express";

import {
    criarAssociacao,
    listarPecasDeModelo,
    atualizarQuantidade,
    deletarAssociacao,
} from "../controllers/maquinaPecaController.js";

// criarAssociacao, listarPecasDeModelo, atualizarQuantidade, 

const router = express.Router();

// POST /associate → cria perfil
router.post("/", criarAssociacao);

// GET /associate → lista todas os as peças associadas a um modelo
router.get("/:id", listarPecasDeModelo);

// PUT /associate/:id → lista o perfil por id
router.get("/:id", atualizarQuantidade);

// PUT /associate/:id → atualiza  perfil
//router.put("/:id", update);

//DELETE /associate/:id → remove um perfil
router.delete("/:id", deletarAssociacao);

export default router;
