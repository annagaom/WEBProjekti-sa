import {
  getsuosikit,
getsuosikkiByAsiakasId,
postsuosikki,
deletesuosikkiById,
deletesuosikkiByasiakasIdAndTuoteId
} from '../controllers/suosikit-controller.js';
import express from 'express';


const suosikitRouter = express.Router();

suosikitRouter.route('/').get(getsuosikit).post(postsuosikki);
suosikitRouter.route('/:asiakas_id').get(getsuosikkiByAsiakasId).delete(deletesuosikkiById);
suosikitRouter.route('/:asiakas_id/:tuote_id').delete(deletesuosikkiByasiakasIdAndTuoteId);

export default suosikitRouter;
