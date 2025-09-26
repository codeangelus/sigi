import { Peca } from "../models/index.js";


//MÉTODOS:
// criarPeca, listarPecas, atualizarPeca, deletarPeca , associarMaquina, listarPorId


// Criar uma peça
export const criarPeca = async (req, res) => {
  try {
    const { codigo, nome, setor, quantidade } = req.body;

    const novaPeca = await Peca.create({ codigo, nome, setor, quantidade });
    res.status(201).json(novaPeca);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todas as peças
export const listarPecas = async (req, res) => {
  try {
    const pecas = await Peca.findAll();
    res.json(pecas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar uma peça
export const atualizarPeca = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome,  } = req.body;

    const peca = await Peca.findByPk(id);
    if (!peca) return res.status(404).json({ error: "Peça não encontrada" });

    peca.nome = nome ?? peca.nome;

    await peca.save();
    res.json(peca);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar uma peça
export const deletarPeca = async (req, res) => {
  try {
    const { id } = req.params;

    const peca = await Peca.findByPk(id);
    if (!peca) 
      return res.status(404).json({ error: "Peça não encontrada" });

    await peca.destroy();
    res.json({ message: "Peça deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// Achar uma peça por PK
export const listarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const peca = await Peca.findByPk(id);
    if (!peca) {
      return res.status(404).json({ error: "Peça não encontrada" });
    }
    res.json(peca); // retorna a peça encontrada
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Associar a uma maquina
export const associarMaquina = async ( req , res) => {

};
