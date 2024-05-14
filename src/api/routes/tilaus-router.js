import {
  getTilaus,
  getTilausByTilausId,
  getTilausByAsiakasId,
  postTilaus,
  putTilausByTilausId,
  deleteTilausByTilausId
} from '../controllers/tilaus-controller.js';
import express from 'express';

const tilausRouter = express.Router();

tilausRouter.route('/').get(getTilaus).post(postTilaus);
tilausRouter.route('/:tilaus_id').get(getTilausByTilausId).put(putTilausByTilausId).delete(deleteTilausByTilausId)  ;
tilausRouter.route('/asiakas/:asiakas_id').get(getTilausByAsiakasId);

export default tilausRouter;
