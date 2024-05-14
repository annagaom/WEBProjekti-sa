import path from 'path';
import express from 'express';
import api from './api/index.js';

import cors from 'cors';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', api);
app.use(express.static(path.join(__dirname, '../html')));
app.use('/uploads', express.static('uploads'));

export default app;
