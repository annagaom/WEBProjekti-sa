import express from 'express';
import{
  getTyypit,
  getAlatyyppiByPaatyyppi,
  getTyyppiIDByTyypit,
  postTyyppi,
  deleteTyyppi

  } from '../controllers/tyyppi-controller.js';

  const tyyppiRouter = express.Router();

  tyyppiRouter.route('/').get(getTyypit).post(postTyyppi);
  tyyppiRouter.route('/:tyyppi_id').delete(deleteTyyppi);
  tyyppiRouter.route('/paatyyppi/:paatyyppi').get(getAlatyyppiByPaatyyppi);
  tyyppiRouter.route('/:paatyyppi/:alatyyppi').get(getTyyppiIDByTyypit);

  export default tyyppiRouter;



