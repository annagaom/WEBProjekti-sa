import {
  listAllYritystoiminta,
  findYritystoimintaById,
  findYritystoimintaByTapahtuPvm,
  findYritystoimintaByDateRange,
  addYritystoiminta,
  removeYritystoimintaById,
  updateYritystoimintaById
} from '../models/yritystoiminta-model.js';

const getYritystoiminta = async (req, res) => {
  const yritystoiminta = await listAllYritystoiminta();
  if (!yritystoiminta) {
      res.sendStatus(404);
      return;
  }res
  res.json(yritystoiminta);
};

const getYritystoimintaById = async(req, res) => {
  const yritystoiminta = await findYritystoimintaById(req.params.id);
  if (yritystoiminta) {
      res.json(yritystoiminta);
  } else {
      res.sendStatus(404);
  }
};
const getYritystoimintaByTapahtuPvm = async(req, res) => {
  const suosikit = await findYritystoimintaByTapahtuPvm(req.params.tapahtu_pvm);
  if (suosikit) {
      res.json(suosikit);
  } else {
      res.sendStatus(404);
  }
}

const getYritystoimintaByDateRange = async (req, res) => {
  const yritystoiminta = await findYritystoimintaByDateRange(req.params.startDate, req.params.endDate);
  if (yritystoiminta) {
      res.json(yritystoiminta);
  } else {
      res.sendStatus(404);
  }
}

const postYritystoiminta = async (req, res) => {
  console.log(req.body);
  const result = await addYritystoiminta(req.body);
  if (!result) {
      const error = new Error('Invalid or missing fields.');
      error.status = 400;
      return
  }
res.status(201).json(result);
};

const putYritystoimintaById = async (req, res) => {
  console.log("req.body", req.body);
  const result = await updateYritystoimintaById(req.body, req.params.id, res.locals.yritystoiminta);
  if (!result) {
      res.sendStatus(400);
      return;
  }
  res.json(result);
};

const deleteYritystoimintaById = async (req, res) => {
  const result = await removeYritystoimintaById(req.params.id);
  if (!result) {
      res.sendStatus(400);
      return;
  }
  res.json(result);
};

export {
getYritystoiminta,
getYritystoimintaById,
getYritystoimintaByTapahtuPvm,
getYritystoimintaByDateRange,
postYritystoiminta,
putYritystoimintaById,
deleteYritystoimintaById
};
