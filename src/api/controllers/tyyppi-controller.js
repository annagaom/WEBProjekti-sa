import {
    listAllTyypit,
    findTyyppiIdByTyypit,
    findAlatyypitByPaatyyppi,
    addTyyppi,
    removeTyyppiById
} from '../models/tyyppi-model.js';

const getTyypit = async (req, res) => {
    const tyypit = await listAllTyypit();
    if (!tyypit) {
        res.sendStatus(404);
        return;
    } res
    res.json(tyypit);
};

const getAlatyyppiByPaatyyppi = async (req, res) => {
    const tyyppi = await findAlatyypitByPaatyyppi(req.params.paatyyppi);
    if (tyyppi) {
        res.json(tyyppi);
    } else {
        res.sendStatus(404);
    }
}

const getTyyppiIDByTyypit = async (req, res) => {
    const tyyppiId = await findTyyppiIdByTyypit(req.params.paatyyppi, req.params.alatyyppi);
    if (tyyppiId) {
        res.json(tyyppiId);
    } else {
        res.sendStatus(404);
    }
};

const postTyyppi = async (req, res) => {
    console.log(req.body);

    const result = await addTyyppi(req.body);
    if (!result) {
        const error = new Error('Invalid or missing fields.');
        error.status = 400;
        return
    }
    res.status(201).json(result);
};

const deleteTyyppi = async (req, res) => {
    const result = await removeTyyppiById(req.params.tyyppi_id);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

export {
    getTyypit,
    getAlatyyppiByPaatyyppi,
    getTyyppiIDByTyypit,
    postTyyppi,
    deleteTyyppi
};
