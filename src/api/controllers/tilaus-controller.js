import {
    listAllTilaukset,
    findTilausByTilausId,
    findTilausByAsiakasId,
    addTilaus,
    removeTilausByTilausId,
    updateTilausByTilausId
} from '../models/tilaus-model.js';

const getTilaus = async (req, res) => {
    const tilaus = await listAllTilaukset();
    if (!tilaus) {
        res.sendStatus(404);
        return;
    } res
    res.json(tilaus);
};

const getTilausByTilausId = async (req, res) => {
    const tilaus = await findTilausByTilausId(req.params.tilaus_id);
    if (tilaus) {
        res.json(tilaus);
    } else {
        res.sendStatus(404);
    }
};

const getTilausByAsiakasId = async (req, res) => {
    const tilaus = await findTilausByAsiakasId(req.params.asiakas_id);
    if (tilaus) {
        res.json(tilaus);
    } else {
        res.sendStatus(404);
    }
}

const postTilaus = async (req, res) => {
    console.log(req.body);

    const result = await addTilaus(req.body);
    if (!result) {
        const error = new Error('Invalid or missing fields.');
        error.status = 400;
        return
    }
    res.status(201).json(result);
};

const putTilausByTilausId = async (req, res) => {

    console.log("req.body", req.body);
    const result = await updateTilausByTilausId(req.body, req.params.tilaus_id, res.locals.tilaus);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

const deleteTilausByTilausId = async (req, res) => {

    const result = await removeTilausByTilausId(req.params.tilaus_id);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

export {
    getTilaus,
    getTilausByTilausId,
    getTilausByAsiakasId,
    postTilaus,
    putTilausByTilausId,
    deleteTilausByTilausId
};
