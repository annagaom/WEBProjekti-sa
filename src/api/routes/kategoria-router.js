import express from 'express';
import {
 getKategoria,
  getKategoriaByname,
  getKategoriaById,
  postKategoria,
  putKategoria,
  deleteKategoria,

} from '../controllers/kategoria-controller.js';

const kategoriaRouter = express.Router();

kategoriaRouter.route('/').get(getKategoria).post(postKategoria);
kategoriaRouter.route('/:kategoria_id').get(getKategoriaById).put(putKategoria).delete(deleteKategoria);
kategoriaRouter.route('/name/:kategoria_nimi').get(getKategoriaByname);

export default kategoriaRouter;
