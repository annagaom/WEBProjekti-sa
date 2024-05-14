import express from 'express';
import userRouter from './routes/user-router.js';
import palauteRouter from './routes/palaute-router.js';
import kategoriaRouter from './routes/kategoria-router.js';
import tuoteRouter from './routes/tuote-router.js';
import KategoriaTuoteRouter from './routes/kategoriaTuote-router.js';
import tilausRouter from './routes/tilaus-router.js';
import tilausSisaltoRouter from './routes/tilausSisalto-router.js';
import yritystoimintaRouter from './routes/yritystoiminta-router.js';
import suosikitRouter from './routes/suosikit-router.js';
import ostoskoriRouter from './routes/ostoskori-router.js';
import tyyppiRouter from './routes/tyyppi-router.js';

const router = express.Router();

// bind base url for all cat routes to catRouter

router.use('/asiakas', userRouter);
router.use('/palaute', palauteRouter);
router.use('/kategoria', kategoriaRouter);
router.use('/tuote', tuoteRouter);
router.use('/kategoria_tuote', KategoriaTuoteRouter);
router.use('/tilaus', tilausRouter);
router.use('/tilaus_sisalto', tilausSisaltoRouter);
router.use('/yritystoiminta', yritystoimintaRouter);
router.use('/suosikit', suosikitRouter);
router.use('/ostoskori', ostoskoriRouter);
router.use('/tyyppi', tyyppiRouter);

export default router;
