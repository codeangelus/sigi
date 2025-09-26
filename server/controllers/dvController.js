import { Dv } from "../models/index.js";


//MÉTODOS:
// create, getAll, getById, update, delete, listarMaquinas

// Criar um DV
export const criarDv = async (req, res) => {
  try {
    const { numero, cliente, dt_inicio, dt_fim } = req.body;
    
    const novoDv = await Dv.create({ numero, cliente, dt_inicio, dt_fim });
    res.status(201).json(novoDv);  
  
  }catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os DVs
export const getAll = async (req, res) => {
  try {
    const dvs = await Dv.findAll();
    res.json(dvs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar DV por ID 
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const dv = await Dv.findByPk(id);
    if (!dv) {
      return res.status(404).json({ error: "Dv não encontrada" });
    }
    res.json(dv); // retorna a peça encontrada
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Atualizar um DV
export const update = async (req, res) => {
  try{
    const { id } = req.params;
    const { numero, cliente, dt_inicio, dt_fim  } = req.body;

    const dv = await  Dv.findByPk(id);
    if (!dv) return res.status(404).json({ error: "Não foi possível encontrar a Dv"});

    dv.numero = numero ?? dv.numero;
    dv.cliente = cliente ?? dv.cliente;
    dv.dt_inicio = dt_inicio ?? dv.dt_inicio;
    dv.dt_fim = dt_fim ?? dv.dt_fim;

    
    await dv.save();
    res.json(dv);

  }catch (err) {
    res.status(400).json({ error: err.message});
  }
}

// Deletar um DV

export const deletarDv = async (req, res) => {
  try {
    const { id } = req.params;

    const dv = await Dv.findByPk(id);
    if (!dv) 
      return res.status(404).json({ error: "Dv não encontrada"});

    await dv.destroy();
    res.json({message: "Dv deletado com sucesso"});
  } catch(err) {
    res.status(500).json({ error: err.message});
  }
};



// Listar máquinas associadas a um DV


