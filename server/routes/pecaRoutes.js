import express from "express";

import {
  criarPeca,
  listarPecas,
  atualizarPeca,
  deletarPeca,
  listarPorId,
  associateToMachine,
  associateToProduction
} from "../controllers/pecaController.js";


const router = express.Router();

// POST /pecas → cria peça
router.post("/", criarPeca);

// GET /pecas → lista todas as peças
router.get("/", listarPecas);

// GET /pecas → lista a peça por id
router.get("/:id", listarPorId);

// PUT /pecas/:id → atualiza peça
router.put("/:id", atualizarPeca);

// DELETE /pecas/:id → remove peça
router.delete("/:id", deletarPeca);

// POST /pecas/associar  →  associar peca a um modelo de maquina
router.post("/associar",associateToMachine);

// POST /pecas/linkar  →  associar peca a uma maquina producao
router.post("/linkar", associateToProduction)


export default router;
