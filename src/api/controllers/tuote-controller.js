import {
  listAllTuote,
  findTuoteById,
  findTuoteByTyyppeId,
  findTuoteByname,
  findLastTuoteId,
  addTuote,
  removeTuoteById,
  updateTuote,
  findTuoteByKuva
} from '../models/tuote-model.js';

const getTuote = async (req, res) => {
  const tuoteet = await listAllTuote();
  if (!tuoteet) {
    res.sendStatus(404);
    return;
  } res
  res.json(tuoteet);
};

const getTuoteByname = async (req, res) => {
  const tuote = await findTuoteByname(req.params.tuote_nimi);
  if (tuote) {
    res.json(tuote);
  } else {
    res.sendStatus(404);
  }
}

const getTuoteById = async (req, res) => {
  const tuote = await findTuoteById(req.params.tuote_id);
  if (tuote) {
    res.json(tuote);
  } else {
    res.sendStatus(404);
  }
};

const getTuoteByTyyppiId = async (req, res) => {
  const tuote = await findTuoteByTyyppeId(req.params.tyyppi_id);
  if (tuote) {
    res.json(tuote);
  } else {
    res.sendStatus(404);
  }
};

const getLastTuoteId = async (req, res) => {
  try {
    const tuote_id = await findLastTuoteId();
    console.log('tuote_id', tuote_id);
    if (!tuote_id) {
      res.sendStatus(404);
      return;
    }
    res.json(tuote_id);
  } catch (error) {
    console.error('Error getting last tuote_id:', error);
    res.status(500).send('Internal Server Error');
  }
};


const postTuote = async (req, res) => {
  try {
    const result = await addTuote(req.body, req.file);

    if (!result) {
      console.error("Tuotteen lisääminen epäonnistui");
      res.sendStatus(400);
    } else {
      console.log("Tuote lisätty onnistuneesti:", result);
      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Virhe POST-pyynnössä:", error);
    res.sendStatus(500);
  }
};


const putTuote = async (req, res) => {
  const tuoteId = req.params.id;

  try {
    const updateSuccess = await updateTuote(tuoteId, req.body, req.file);

    if (!updateSuccess) {
      console.error("Tuotteen päivittäminen epäonnistui");
      return res.sendStatus(400);
    }

    console.log("Tuote päivitetty onnistuneesti");
    return res.sendStatus(200);
  } catch (error) {
    console.error("Virhe PATCH-pyynnössä:", error);
    return res.sendStatus(500);
  }
};

const deleteTuote = async (req, res) => {
  const result = await removeTuoteById(req.params.tuote_id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

const getTuoteByKuva = async (req, res) => {
  const { tuote_kuva, kieli } = req.query;

  if (!tuote_kuva || !kieli) {
    return res.status(400).json({ message: 'Puuttuvat parametrit: tuote_kuva tai kieli.' });
  }

  try {
    const tuotteet = await findTuoteByKuva(tuote_kuva, kieli);

    if (!tuotteet) {
      return res.status(404).json({ message: 'Tuotetta ei löytynyt.' });
    }

    return res.status(200).json(tuotteet);
  } catch (error) {
    console.error('Virhe tuotteen haussa:', error);
    return res.status(500).json({ message: 'Virhe tuotteen haussa.', error });
  }
};



export {
  getTuote,
  getTuoteByname,
  getTuoteById,
  getTuoteByTyyppiId,
  getLastTuoteId,
  postTuote,
  putTuote,
  deleteTuote,
  getTuoteByKuva
};
