import { listAllKategorias, findKategoriaById, findKategoriaByname, addKategoria, updateKategoria, removeKategoriaById } from '../models/kategoria-model.js';
import bcrypt from 'bcrypt';

const getKategoria = async (req, res) => {
    const kategoriat = await listAllKategorias();
    if (!kategoriat) {
        res.sendStatus(404);
        return;
    }res
    res.json(kategoriat);
};

const getKategoriaByname = async(req, res) => {
    const kategoria = await findKategoriaByname(req.params.kategoria_nimi);
    if (kategoria) {
        res.json(kategoria);
    } else {
        res.sendStatus(404);
    }
}

const getKategoriaById = async(req, res) => {
    const kategoria = await findKategoriaById(req.params.kategoria_id);
    if (kategoria) {
        res.json(kategoria);
    } else {
        res.sendStatus(404);
    }
};

const postKategoria = async (req, res) => {
  console.log(req.body);

  const result = await addKategoria(req.body);
  if (!result) {
      const error = new Error('Invalid or missing fields.');
      error.status = 400;
      return
  }
  res.status(201).json(result);
};

const putKategoria = async (req, res) => {
    console.log("req.body", req.body);
    const result = await updateKategoria(req.body, req.params.kategoria_id, res.locals.kategoria);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

const deleteKategoria = async (req, res) => {
    const result = await removeKategoriaById(req.params.kategoria_id);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

export { getKategoria, getKategoriaByname, getKategoriaById, postKategoria, putKategoria, deleteKategoria };
