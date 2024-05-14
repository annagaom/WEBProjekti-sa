import {
  getYritystoiminta,
  getYritystoimintaById,
  getYritystoimintaByTapahtuPvm,
  getYritystoimintaByDateRange,
  postYritystoiminta,
  putYritystoimintaById,
  deleteYritystoimintaById
} from '../controllers/yritystoiminta-controller.js';

import express from 'express';

const yritystoimintaRouter = express.Router();

yritystoimintaRouter.route('/').get(getYritystoiminta).post(postYritystoiminta);
yritystoimintaRouter.route('/:id').get(getYritystoimintaById).put(putYritystoimintaById).delete(deleteYritystoimintaById);
yritystoimintaRouter.route('/pvm/:tapahtu_pvm').get(getYritystoimintaByTapahtuPvm);
yritystoimintaRouter.route('/:startDate/:endDate').get(getYritystoimintaByDateRange);

export default yritystoimintaRouter;
