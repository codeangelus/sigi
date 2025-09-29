import { MaquinaProducao } from "../models/index.js";

//MÉTODOS:
// create,update,getAll, getById, excluir


// Criar uma maquina da produção
export const create = async (req, res) => {
  try {
    const { codigo, nome} = req.body;

    const novaMaquina = await MaquinaProducao.create({ codigo, nome});
    res.status(201).json(novaMaquina);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todas as Maquina Produçãos
export const getAll = async (req, res) => {
  try {
    const maquinas = await MaquinaProducao.findAll();
    res.json(maquinas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar uma Maquina Produção
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome,  } = req.body;

    const maquina = await MaquinaProducao.findByPk(id);
    if (!maquina) return res.status(404).json({ error: "Maquina não encontrada" });

    maquina.nome = nome ?? maquina.nome;

    await maquina.save();
    res.json(maquina);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar uma Maquina Produção
export const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    const maquina = await MaquinaProducao.findByPk(id);
    if (!maquina) 
      return res.status(404).json({ error: "Maquina Produção não encontrada" });

    await maquina.destroy();
    res.json({ message: "Maquina Produção deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// Achar uma maquina por PK
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const maquina = await MaquinaProducao.findByPk(id);
    if (!maquina) {
      return res.status(404).json({ error: "Maquina Produção não encontrada" });
    }
    res.json(maquina); // retorna a Maquina Produção encontrada
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


