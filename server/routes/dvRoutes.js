import express from "express";

import {
 criarDv,  
 getById,
 update,
 deletarDv,
 getAll, 
 //listarMaquinas
} from "../controllers/dvController.js";

const router = express.Router();

// POST /dvs → cria DV
router.post("/", criarDv);

//GET /dvs  → lista todos os dvs
router.get("/", getAll);

//GET /dvs/:id  →  lista dv por id
router.get("/:id", getById);

//PUT /dvs/:id   → atualiza o dv
router.put("/:id", update);

//DELETE /dvs/:id  → deletar um dv
router.delete("/:id", deletarDv)





export default router;

