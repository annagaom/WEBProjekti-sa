import {
    listAllUsers,
    findUserById,
    findUserByUsername,
    findUserByTunnus,
    addUser,
    updateUser,
    removeUser,
    updateUserPassword,
    getAlennusRyhma
} from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkPassword } from '../../utils/salasana.js';
import config from '../../config/config.js';
const SECRET_KEY = config.SECRET_KEY;

const getUser = async (req, res) => {
    const users = await listAllUsers();
    if (!users) {
        res.sendStatus(404);
        return;
    } res
    res.json(users);
};

const getUserByUsername = async (req, res) => {
    const user = await findUserByUsername(req.params.tunnus);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
}

const getUserById = async (req, res) => {
    const user = await findUserById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

const postUser = async (req, res) => {
    try {
        const {
            etunimi,
            sukunimi,
            tunnus,
            salasana,
            email,
            puhelin,
            syntymapaiva,
            ehdot_hyvaksytty,
            allennus_ryhma,
        } = req.body;

        const requiredFields = ["etunimi", "sukunimi", "tunnus", "salasana", "email", "puhelin"];
        const missingFields = requiredFields.filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            throw new Error(`Puuttuvat kentät: ${missingFields.join(", ")}`);
        }

        const result = await addUser({
            etunimi,
            sukunimi,
            tunnus,
            salasana: bcrypt.hashSync(salasana, 10),
            rooli: req.body.rooli || 'user',
            email,
            puhelin,
            syntymapaiva,
            ehdot_hyvaksytty,
            allennus_ryhma,
        });

        if (!result) {
            throw new Error("Käyttäjän lisääminen epäonnistui");
        }

        const token = jwt.sign(
            {
                asiakas_id: result.asiakas_id,
                username: tunnus,
                role: result.rooli,
            },
            SECRET_KEY
        );

        res.status(201).json({ success: true, token, asiakas_id: result.asiakas_id });
    } catch (error) {
        console.error('Virhe postUser-toiminnossa:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const userLoginPost = async (req, res) => {
    try {
        const { tunnus, salasana } = req.body;

        if (!tunnus || !salasana) {
            throw new Error('Käyttäjätunnus ja salasana ovat pakollisia');
        }

        const user = await findUserByTunnus(tunnus);

        if (!user) {
            return res.status(401).json({ error: 'Väärä käyttäjätunnus tai salasana' });
        }

        const passwordMatch = checkPassword(salasana, user.salasana);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Väärä käyttäjätunnus tai salasana' });
        }

        const token = jwt.sign(
            { asiakas_id: user.asiakas_id, tunnus: user.tunnus, role: user.rooli },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ success: true, message: 'Kirjautuminen onnistui', token, asiakas_id: user.asiakas_id });

    } catch (error) {
        console.error('Virhe kirjautumisessa:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const postVieras = async (req, res) => {
    try {
        const {
            etunimi,
            sukunimi,
            tunnus,
            salasana,
            email,
            puhelin,
            syntymapaiva,
            ehdot_hyvaksytty,
            allennus_ryhma,
        } = req.body;


        const result = await addUser({
            etunimi,
            sukunimi,
            tunnus,
            salasana: bcrypt.hashSync(salasana, 10),
            rooli: 'vieras',
            email,
            puhelin,
            syntymapaiva,
            ehdot_hyvaksytty,
            allennus_ryhma,
        });

        if (!result) {
            throw new Error("Vierasasiakkaan lisääminen epäonnistui");
        }

        const token = jwt.sign(
            {
                asiakas_id: result.asiakas_id,
                username: tunnus,
                role: result.rooli,
            },
            SECRET_KEY
        );

        res.status(201).json({ success: true, token, asiakas_id: result.asiakas_id });
    } catch (error) {
        console.error('Virhe vierasasiakkaan lisäämisessä:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const putUser = async (req, res) => {
    try {
        const asiakas_id = req.params.id;

        const updatedFields = {
            etunimi: req.body.etunimi || null,
            sukunimi: req.body.sukunimi || null,
            tunnus: req.body.tunnus || null,
            salasana: req.body.salasana ? bcrypt.hashSync(req.body.salasana, 10) : null,
            email: req.body.email || null,
            puhelin: req.body.puhelin || null,
        };

        const sanitizedFields = Object.fromEntries(
            Object.entries(updatedFields).filter(([, value]) => value !== null)
        );

        const result = await updateUser(sanitizedFields, asiakas_id);

        if (!result) {
            res.status(400).send('Päivitys epäonnistui');
            return;
        }

        res.json(result);
    } catch (error) {
        console.error('Virhe päivittäessä käyttäjää:', error);
        res.status(500).send('Sisäinen palvelinvirhe');
    }
};

const deleteUser = async (req, res) => {
    if (
        res.locals.user.user_id !== Number(req.params.id) &&
        res.locals.user.role !== 'admin'
    ) {
        res.sendStatus(403);
        return;
    }
    const result = await removeUser(req.params.id);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

const getUserInfo = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await findUserById(userId);

        if (!userData) {
            return res.status(404).json({ error: "Käyttäjää ei löydy." });
        }

        res.status(200).json({
            nimi: userData.etunimi,
            sukunimi: userData.sukunimi,
            tunnus: userData.tunnus,
            email: userData.email,
            puhelin: userData.puhelin,
            syntymapaiva: userData.syntymapaiva,
            allennus_ryhma: userData.allennus_ryhma,
        });

    } catch (error) {
        console.error("Virhe getUserInfo-funktiossa:", error.message);
        res.status(500).json({ error: "Virhe palvelimella." });
    }
};

const updatePasswordController = async (req, res) => {
    try {
        const newPassword = req.body.salasana;

        if (!newPassword) {
            return res.status(400).send("Uusi salasana on pakollinen.");
        }

        const user = await findUserById(req.params.id);

        if (!user) {
            return res.status(404).send("Käyttäjää ei löydy.");
        }

        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

        const result = await updateUserPassword(req.params.id, hashedNewPassword);

        if (!result) {
            return res.status(400).send("Salasanan päivitys epäonnistui.");
        }

        return res.status(200).send("Salasana päivitetty onnistuneesti.");

    } catch (error) {
        console.error("Virhe salasanan päivityksessä:", error);
        return res.status(500).send("Sisäinen palvelinvirhe.");
    }
};

const checkAlennus = async (req, res) => {
    try {
        const asiakasId = parseInt(req.params.id, 10);

        if (isNaN(asiakasId)) {
            return res.status(400).json({ error: 'Virheellinen asiakas_id' });
        }

        const alennusRyhma = await getAlennusRyhma(asiakasId);

        if (!alennusRyhma) {
            return res.status(404).json({ error: 'Alennusryhmää ei löydy' });
        }

        const isEligible = ['Opiskelija', 'Eläkeläinen'].includes(alennusRyhma);

        res.json({ isEligible });
    } catch (error) {
        console.error('Virhe tarkistettaessa alennusryhmää:', error.message);
        res.status(500).json({ error: 'Sisäinen palvelinvirhe' });
    }
};

export {
    getUser,
    getUserByUsername,
    getUserById,
    postUser,
    userLoginPost,
    putUser,
    deleteUser,
    getUserInfo,
    updatePasswordController,
    checkAlennus,
    postVieras
};
