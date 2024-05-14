import {
  listAllTilausSisalto,
  findTilausSisaltoById,
  findTilausSisaltoByTilausId,
  findTilausPvmByTilausId,
  findTilausSisaltoByPvm,
  findTilausSisaltoByDateRange,
  addTilausSisalto,
  removeTilausSisaltoById,
  updateTilausSisaltoById
} from '../models/tilausSisalto-model.js';

const getTilausSisalto = async (req, res) => {
  const tilausSisalto = await listAllTilausSisalto();
  if (!tilausSisalto) {
    res.sendStatus(404);
    return;
  } res
  res.json(tilausSisalto);
};

const getTilausSisaltoById = async (req, res) => {
  const tilausSisalto = await findTilausSisaltoById(req.params.id);
  if (tilausSisalto) {
    res.json(tilausSisalto);
  } else {
    res.sendStatus(404);
  }
};

const getTilausPvmByTilausId = async (req, res) => {
  const tilausSisalto = await findTilausPvmByTilausId(req.params.tilaus_id);
  if (tilausSisalto) {
    res.json(tilausSisalto);
  } else {
    res.sendStatus(404);
  }
}


const getTilausSisaltoByTilausId = async (req, res) => {
  const tilausSisalto = await findTilausSisaltoByTilausId(req.params.tilaus_id);
  if (!tilausSisalto) {
    res.sendStatus(404);
    return;
  }
  res.json(tilausSisalto);
};


const getTilausSisaltoByTilausPvm = async (req, res) => {
  const tilausSisalto = await findTilausSisaltoByPvm(req.params.tilaus_pvm);
  if (tilausSisalto) {
    res.json(tilausSisalto);
  } else {
    res.sendStatus(404);
  }
}

const getTilasSisaltoByDateRange = async (req, res) => {
  const tilausSisalto = await findTilausSisaltoByDateRange(req.params.startDate, req.params.endDate);
  if (tilausSisalto) {
    res.json(tilausSisalto);
  } else {
    res.sendStatus(404);
  }
}

const postTilausSisalto = async (req, res) => {
  try {
    const result = await addTilausSisalto(req.body);

    if (!result) {
      res.status(400).json({ error: 'Invalid or missing fields.' });
    } else {
      res.status(201).json({ message: 'Tilaus sisälto lisätty' });
    }
  } catch (error) {
    console.error("Error in postTilausSisalto:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const putTilausSisaltoById = async (req, res) => {

  console.log("req.body", req.body);
  const result = await updateTilausSisaltoById(req.body, req.params.id, res.locals.tilausSisalto);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

const deleteTilausSisaltoById = async (req, res) => {

  const result = await removeTilausSisaltoById(req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

export {
  getTilausSisalto,
  getTilausSisaltoById,
  getTilausSisaltoByTilausId,
  getTilausPvmByTilausId,
  getTilausSisaltoByTilausPvm,
  getTilasSisaltoByDateRange,
  postTilausSisalto,
  putTilausSisaltoById,
  deleteTilausSisaltoById
};
