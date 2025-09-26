import { Usuario } from "../models/index.js";


//Métodos:
// create, getAll, getById, excluir, update


//Criar usuario
export const create = async(req, res)  => {
    try{
        const {login, senha} = req.body;

        ////MUDAR A FORMA DE ARMAZENAR SENHAS E IMPLEMENTAR ALGUM MÉTODO DE ENCRIPTAÇÃO.

    const novoUsuario = await Usuario.create({ login, senha });
    res.status(201).json(novoUsuario); 

    res.status(201).json(novoUsuario);          
    } catch (err){
    res.status(400).json({ error: err.message });   
    }
};


///Listar usuarios

export const getAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Atualizar usuario
export const update = async (req, res) => {
  try {
    const { login } = req.params;
    const { senha  } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: "Usuario não encontrada" });

    usuario.login = login ?? usuario.login;

    await usuario.save();
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Deletar uma peça
export const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) 
      return res.status(404).json({ error: "Usuario não encontrado" });

    await usuario.destroy();
    res.json({ message: "Usuario deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Achar um usuario por id
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario não encontrado" });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};