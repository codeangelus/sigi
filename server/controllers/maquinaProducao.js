import { MaquinaProducao } from "../models";

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

// Listar todas as peças
export const getAll = async (req, res) => {
  try {
    const maquinas = await MaquinaProducao.findAll();
    res.json(maquinas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar uma peça
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

// Deletar uma peça
export const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    const maquina = await MaquinaProducao.findByPk(id);
    if (!maquina) 
      return res.status(404).json({ error: "Peça não encontrada" });

    await maquina.destroy();
    res.json({ message: "Peça deletada com sucesso" });
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
      return res.status(404).json({ error: "Peça não encontrada" });
    }
    res.json(maquina); // retorna a peça encontrada
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


