import { listAllpalaute, findPalauteByPvm, findPalauteByDateRange, addPalaute, removePalauteById } from '../models/palaute-model.js';

const getPalaute = async (req, res) => {
    const palaute = await listAllpalaute();
    if (!palaute) {
        res.sendStatus(404);
        return;
    } res
    res.json(palaute);
};

const getPalauteByPvm = async (req, res) => {
    const palaute = await findPalauteByPvm(req.params.pvm);
    if (palaute) {
        res.json(palaute);
    } else {
        res.sendStatus(404);
    }
};

const getPalauteByDateRange = async (req, res) => {
    const { startDate, endDate } = req.params;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: "Aloitus- ja lopetuspäivämäärä ovat pakollisia" });
    }

    try {
        const palaute = await findPalauteByDateRange(startDate, endDate);

        if (!palaute) {
            return res.status(404).json({ message: "Ei löydy palautetta tälle ajanjaksolle" });
        }

        res.status(200).json(palaute);

    } catch (error) {
        console.error("Error getting palaute by date range:", error);
        res.status(500).json({ message: "Palvelinvirhe" });
    }
};


const postPalaute = async (req, res) => {
    console.log(req.body);

    const result = await addPalaute(req.body);
    if (!result) {
        const error = new Error('Invalid or missing fields.');
        error.status = 400;
        return
    }
    res.status(201).json(result);
};


const deletePalaute = async (req, res) => {
    const result = await removePalauteById(req.params.id);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

export { getPalaute, getPalauteByPvm, getPalauteByDateRange, postPalaute, deletePalaute };
