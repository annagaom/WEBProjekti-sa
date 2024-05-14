
import {
  listAllostokset,
  findOstosByAsiakasId,
  findTuoteMaaraByAsiakasIdAndTuoteId,
  addOstoskoriin,
  updateOstosTuoteenMaara,
  removeOstosById,
  removeOstosByUserId
} from '../models/ostoskori-model.js';

const getOstokset = async (req, res) => {
  const ostokset = await listAllostokset();
  if (!ostokset) {
    res.sendStatus(404);
    return;
  } res
  res.json(ostokset);
};

const geOstosByAsiakasId = async (req, res) => {
  const ostokset = await findOstosByAsiakasId(req.params.asiakas_id);
  if (ostokset) {
    res.json(ostokset);
  } else {
    res.sendStatus(404);
  }
};

const getTuoteMaaraByAsiakasIdAndTuoteId = async (req, res) => {
  const tuotemaara = await findTuoteMaaraByAsiakasIdAndTuoteId(req.params.asiakas_id, req.params.tuote_id);
  if (tuotemaara) {
    res.json(tuotemaara);

  } else {
    res.sendStatus(404);
  }
};

const postOstos = async (req, res) => {
  console.log(req.body);

  const result = await addOstoskoriin(req.body);
  if (!result) {
    const error = new Error('Invalid or missing fields.');
    error.status = 400;
    return
  }
  res.status(201).json(result);
};

const putOstosTuoteenMaara = async (req, res) => {
  console.log(req.body);

  const result = await updateOstosTuoteenMaara(req.body.tuote_maara, req.params.asiakas_id, req.params.tuote_id, res.locals.tuotemaara);
  if (!result) {
    const error = new Error('Invalid or missing fields.');
    error.status = 400;
    return
  }
  res.status(201).json(result);
};

const deleteOstosById = async (req, res) => {

  const result = await removeOstosById(req.params.asiakas_id, req.params.tuote_id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

const deleteOstosByUserId = async (req, res) => {
  const result = await removeOstosByUserId(req.params.asiakas_id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

export {
  getOstokset,
  geOstosByAsiakasId,
  getTuoteMaaraByAsiakasIdAndTuoteId,
  postOstos,
  deleteOstosById,
  putOstosTuoteenMaara,
  deleteOstosByUserId
};
