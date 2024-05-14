import {
  getOstokset,
  geOstosByAsiakasId,
  getTuoteMaaraByAsiakasIdAndTuoteId,
  postOstos,
  putOstosTuoteenMaara,
  deleteOstosById,
  deleteOstosByUserId

} from '../controllers/ostoskori-controller.js';
import express from 'express';


const ostoskoriRouter = express.Router();

ostoskoriRouter.route('/').get(getOstokset).post(postOstos);
ostoskoriRouter.route('/:asiakas_id').get(geOstosByAsiakasId).delete(deleteOstosByUserId);
ostoskoriRouter.route('/:asiakas_id/:tuote_id').get(getTuoteMaaraByAsiakasIdAndTuoteId).put(putOstosTuoteenMaara).delete(deleteOstosById);

export default ostoskoriRouter;
