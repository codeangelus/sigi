import { MaquinaModeloPeca, Peca, MaquinaModelo } from "../models/index.js";


//métodos:
// criarAssociacao, listarPecasDeModelo, atualizarQuantidade, 

// Criar associação com quantidade
export const criarAssociacao = async (req, res) => {
  try {
    const { pecaId, maquinaModeloId, quantidade } = req.body;

    const associacao = await MaquinaModeloPeca.create({
      pecaId,
      maquinaModeloId,
      quantidade
    });

    res.status(201).json(associacao);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todas as peças de um modelo de máquina
export const listarPecasDeModelo = async (req, res) => {
  try {
    const { maquinaModeloId } = req.params;

    const pecas = await MaquinaModeloPeca.findAll({
      where: { maquinaModeloId },
      include: [Peca]
    });

    res.json(pecas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar quantidade
export const atualizarQuantidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    const associacao = await MaquinaModeloPeca.findByPk(id);
    if (!associacao) return res.status(404).json({ error: "Associação não encontrada" });

    associacao.quantidade = quantidade;
    await associacao.save();

    res.json(associacao);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remover associação
export const deletarAssociacao = async (req, res) => {
  try {
    const { id } = req.params;

    const associacao = await MaquinaModeloPeca.findByPk(id);
    if (!associacao) return res.status(404).json({ error: "Associação não encontrada" });

    await associacao.destroy();
    res.json({ message: "Associação removida com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


