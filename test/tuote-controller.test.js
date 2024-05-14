import request from 'supertest';
import app from '../src/app.js';
const fs = require('fs');
const path = require('path');
import {
    listAllTuote,
    findTuoteById,
    findTuoteByTyyppeId,
    findTuoteByname,
    addTuote,
    removeTuoteById,
    updateTuote,
    findTuoteByKuva
} from '../src/api/models/tuote-model.js';

jest.mock('../src/api/models/tuote-model.js', () => ({
    listAllTuote: jest.fn(),
    findTuoteById: jest.fn(),
    findTuoteByTyyppeId: jest.fn(),
    findTuoteByname: jest.fn(),
    addTuote: jest.fn(),
    removeTuoteById: jest.fn(),
    updateTuote: jest.fn(),
    findTuoteByKuva: jest.fn()
}));

// Testi getTuote
test('getTuote should return all products from the database', async () => {
    const mockTuote = [{ tuote_id: 1, tuote_nimi: 'testi', hinta: 1 }];
    listAllTuote.mockResolvedValue(mockTuote);

    const response = await request(app).get('/api/v1/tuote');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTuote);
});

// Testi getTuoteById
test('getTuoteById should return a product by id', async () => {
    const mockTuote = { tuote_id: 1, tuote_nimi: 'testi', hinta: 1 };
    findTuoteById.mockResolvedValue(mockTuote);

    const response = await request(app).get('/api/v1/tuote/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTuote);
});

// Testi getTuoteByTyyppiId
test('getTuoteByTyyppiId should return a product by tyyppi_id', async () => {
    const mockTuote = [{ tuote_id: 1, tuote_nimi: 'testi', hinta: 1 }];
    findTuoteByTyyppeId.mockResolvedValue(mockTuote);

    const response = await request(app).get('/api/v1/tuote/tyyppi_id/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTuote);
});

// Testi getTuoteByname
test('getTuoteByname should return a product by tuote_nimi', async () => {
    const mockTuote = { tuote_id: 1, tuote_nimi: 'testi', hinta: 1 };
    findTuoteByname.mockResolvedValue(mockTuote);

    const response = await request(app).get('/api/v1/tuote/name/testi');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTuote);
});

// Testi getTuoteByKuva
test('getTuoteByKuva should return a product by kuva', async () => {
    const mockTuote = [{ tuote_id: 1, tuote_nimi: 'testi', hinta: 1 }];
    findTuoteByKuva.mockResolvedValue(mockTuote);

    const response = await request(app).get('/api/v1/tuote/kuva/testi?kieli=fi');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTuote);
});

// Testi postTuote
test('postTuote should add a new product to the database', async () => {
    const newProduct = {
        tuote_nimi: 'testi',
        tuote_kuvaus: 'Testituote',
        tuote_hinta: 1,
        tuote_kustannus: 0,
        tyyppi_id: 1
    };

    const tempImagePath = path.join(__dirname, 'testimage.jpg');

    fs.writeFileSync(tempImagePath, 'Testikuva');

    addTuote.mockResolvedValue({ tuote_id: 1 });

    const response = await request(app)
        .post('/api/v1/tuote')
        .field('tuote_nimi', newProduct.tuote_nimi)
        .field('tuote_kuvaus', newProduct.tuote_kuvaus)
        .field('tuote_hinta', newProduct.tuote_hinta)
        .field('tuote_kustannus', newProduct.tuote_kustannus)
        .field('tyyppi_id', newProduct.tyyppi_id)
        .attach('tuote_kuva', tempImagePath);

    fs.unlinkSync(tempImagePath);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ tuote_id: 1 });
});

// Testi putTuote

test('putTuote should update a product in the database', async () => {
    const updatedProduct = {
        tuote_nimi: 'testi',
        tuote_kuvaus: 'Testituote',
        tuote_hinta: 1,
        tuote_kustannus: 0,
        tyyppi_id: 1
    };

    const mockFile = {
        filename: 'testimage.jpg'
    };

    const tempImagePath = path.join(__dirname, 'testimage.jpg');

    fs.writeFileSync(tempImagePath, 'Testikuva');

    updateTuote.mockResolvedValue(true);

    const response = await request(app)
        .put('/api/v1/tuote/1')
        .field('tuote_nimi', updatedProduct.tuote_nimi)
        .field('tuote_kuvaus', updatedProduct.tuote_kuvaus)
        .field('tuote_hinta', updatedProduct.tuote_hinta)
        .field('tuote_kustannus', updatedProduct.tuote_kustannus)
        .field('tyyppi_id', updatedProduct.tyyppi_id)
        .attach('tuote_kuva', tempImagePath);

    fs.unlinkSync(tempImagePath);

    expect(response.status).toBe(200);
});


// Testi deleteTuoteById
test('deleteTuoteById should remove a product from the database', async () => {
    const product = { tuote_id: 1, tuote_nimi: 'testi', hinta: 1 };
    removeTuoteById.mockResolvedValue(product);

    const response = await request(app).delete('/api/v1/tuote/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(product);
});