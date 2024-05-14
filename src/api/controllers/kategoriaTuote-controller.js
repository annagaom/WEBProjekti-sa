import {
    listAllKategoriaTuote,
    findKategoriaTuoteById,
    findKategoriaTuoteByTuoteId,
    findKategoriaTuoteByKategoriaId,
    addKategoriaTuote,
    removeKategoriaTuoteById,
    updateKategoriaTuoteById,
    findKategoriatuoteIdByTuoteAndKategoria
} from '../models/kategoriaTuote-model.js';

const getKategoriaTuoteeet = async (req, res) => {
    const kategoriatuoteet = await listAllKategoriaTuote();
    if (!kategoriatuoteet) {
        res.sendStatus(404);
        return;
    } res
    res.json(kategoriatuoteet);
};
const getKategoriaTuoteById = async (req, res) => {
    const kategoriatuote_id = req.params.id;
    const kategoriaTuote = await findKategoriaTuoteById(kategoriatuote_id);
    if (kategoriaTuote) {
        res.json(kategoriaTuote);
    } else {
        res.sendStatus(404);
    }
};

const getKategoriaTuoteByTuoteId = async (req, res) => {
    const kategoriaTuote = await findKategoriaTuoteByTuoteId(req.params.tuote_id);
    if (kategoriaTuote) {
        res.json(kategoriaTuote);
    } else {
        res.sendStatus(404);
    }
};

const getKategoriaTuoteByKategoriaId = async (req, res) => {
    const kategoriaTuote = await findKategoriaTuoteByKategoriaId(req.params.kategoria_id);
    if (kategoriaTuote) {
        res.json(kategoriaTuote);
    } else {
        res.sendStatus(404);
    }
}

const getKategoriatuoteIdByTuoteAndKategoria = async (req, res) => {
    const kategoriaTuote = await findKategoriatuoteIdByTuoteAndKategoria(req.params.tuote_id, req.params.kategoria_id);
    if (kategoriaTuote) {
        res.json(kategoriaTuote);
    } else {
        res.sendStatus(404);
    }
}

const postKategoriaTuote = async (req, res) => {
    console.log(req.body);

    const result = await addKategoriaTuote(req.body);
    if (!result) {
        const error = new Error('Invalid or missing fields.');
        error.status = 400;
        return
    }
    res.status(201).json(result);
};


const putKategoriaTuoteById = async (req, res) => {

    console.log("req.body", req.body);
    const result = await updateKategoriaTuoteById(req.body, req.params.kategoriatuote_id, res.locals.kategoriaTuote);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

const deleteKategoriaTuoteById = async (req, res) => {
    const { kategoriatuote_id } = req.params;

    if (!kategoriatuote_id) {
        return res.status(400).json({ error: "Kategoriatuote ID puuttuu tai on määrittelemätön" });
    }

    try {
        const success = await removeKategoriaTuoteById(kategoriatuote_id);
        if (!success) {
            return res.status(404).json({ error: "Kategoriatuotea ei löydy" });
        }

        res.status(200).json({ message: "Kategoriatuote poistettu onnistuneesti" });
    } catch (error) {
        console.error("Virhe tietueen poistamisessa:", error);
        res.status(500).json({ error: "Sisäinen palvelinvirhe" });
    }
};


export {
    getKategoriaTuoteeet,
    getKategoriaTuoteById,
    getKategoriaTuoteByKategoriaId,
    getKategoriaTuoteByTuoteId,
    postKategoriaTuote,
    putKategoriaTuoteById,
    deleteKategoriaTuoteById,
    getKategoriatuoteIdByTuoteAndKategoria
};
