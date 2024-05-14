import express from 'express';
import { getPalaute, getPalauteByPvm, getPalauteByDateRange, postPalaute, deletePalaute } from '../controllers/palaute-controller.js';


const palauteRouter = express.Router();

palauteRouter.route('/').get(getPalaute).post(postPalaute);
palauteRouter.route('/:id').delete(deletePalaute);
palauteRouter.route('/:pvm').get(getPalauteByPvm);
palauteRouter.route('/:startDate/:endDate').get(getPalauteByDateRange);

export default palauteRouter;
