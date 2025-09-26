import express from "express";

import {
  criarPeca,
  listarPecas,
  atualizarPeca,
  deletarPeca,
  listarPorId
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

export default router;
