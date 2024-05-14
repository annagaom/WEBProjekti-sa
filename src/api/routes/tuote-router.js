import express from 'express';
import {
  getTuote,
  getTuoteByname,
  getTuoteById,
  getTuoteByTyyppiId,
  getLastTuoteId,
  postTuote,
  putTuote,
  deleteTuote,
  getTuoteByKuva
} from '../controllers/tuote-controller.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    console.log("file in multer filename", file);
    cb(null, file.fieldname + '-' + Date.now() + ".png");
  }
});

const upload = multer({ storage: storage });
const tuoteRouter = express.Router();

tuoteRouter.route('/')
  .get(getTuote)
  .post(upload.single('tuote_kuva'), (req, res, next) => {
    console.log("req.file", req.file);
    const inputFile = req.file.path;
    const outputFile = req.file.filename;
    postTuote(req, res, next);
  });

tuoteRouter.route('/:tuote_id')
  .get(getTuoteById)
  .delete(deleteTuote)

tuoteRouter
  .route("/:id")
  .put(upload.single("tuote_kuva"), putTuote);

tuoteRouter.route('/name/:tuote_nimi').get(getTuoteByname);
tuoteRouter.route('/lastid/').get(getLastTuoteId);
tuoteRouter.route('/tyyppi_id/:tyyppi_id').get(getTuoteByTyyppiId);

tuoteRouter.route('/:tuote_kuva/:kieli').get((req, res) => {
  const { tuote_kuva, kieli } = req.params;
  return getTuoteByKuva({ query: { tuote_kuva, kieli } }, res);
});


export default tuoteRouter;
