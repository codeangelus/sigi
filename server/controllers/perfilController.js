import Perfil from "./server/models/index.js"


//MÉTODOS:
// create, update , getAll ,getById, excluir


// Criar um modelo de perfil
export const create = async (req, res) => {
  try {
    const { codigo, nome} = req.body;

    const novoPerfil = await Perfil.create({ codigo, nome});
    res.status(201).json(novoPerfil);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todas as perfis
export const getAll = async (req, res) => {
  try {
    const perfis = await Perfil.findAll();
    res.json(perfis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar uma perfil
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome,  } = req.body;

    const perfil = await Perfil.findByPk(id);
    if (!perfil) return res.status(404).json({ error: "Perfil não encontrada" });

    perfil.nome = nome ?? perfil.nome;

    await perfil.save();
    res.json(perfil);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar uma perfil
export const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    const perfil = await Perfil.findByPk(id);
    if (!perfil) 
      return res.status(404).json({ error: "Perfil  não encontrada" });

    await perfil.destroy();
    res.json({ message: "Perfil  deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// Achar uma perfil por PK
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const perfil = await Perfil.findByPk(id);
    if (!perfil) {
      return res.status(404).json({ error: "Perfil Modelo não encontrada" });
    }
    res.json(perfil); // retorna a Perfil Modelo encontrada
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


