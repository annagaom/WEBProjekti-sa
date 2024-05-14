const {
    listAllostokset,
    findOstosByAsiakasId,
    findTuoteMaaraByAsiakasIdAndTuoteId,
    addOstoskoriin,
    updateOstosTuoteenMaara,
    removeOstosById,
    removeOstosByUserId
} = require('../src/api/models/ostoskori-model.js');
const request = require('supertest');
import app from '../src/app';

jest.mock('../src/api/models/ostoskori-model.js', () => ({
    listAllostokset: jest.fn(),
    findOstosByAsiakasId: jest.fn(),
    findTuoteMaaraByAsiakasIdAndTuoteId: jest.fn(),
    addOstoskoriin: jest.fn(),
    updateOstosTuoteenMaara: jest.fn(),
    removeOstosById: jest.fn(),
    removeOstosByUserId: jest.fn()
}));

// Testi getOstokset
test('getOstokset should return all products from the database', async () => {
    const mockOstokset = [{ asiakas_id: 1, tuote_id: 1, tuote_maara: 1 }];
    listAllostokset.mockResolvedValue(mockOstokset);

    const response = await request(app).get('/api/v1/ostoskori');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOstokset);
});

// Testi getOstosByAsiakasId
test('getOstosByAsiakasId should return a product by asiakas_id', async () => {
    const mockOstos = [{ asiakas_id: 1, tuote_id: 1, tuote_maara: 1 }];
    findOstosByAsiakasId.mockResolvedValue(mockOstos);

    const response = await request(app).get('/api/v1/ostoskori/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOstos);
});

// Testi getTuoteMaaraByAsiakasIdAndTuoteId
test('getTuoteMaaraByAsiakasIdAndTuoteId should return a product by asiakas_id and tuote_id', async () => {
    const mockTuoteMaara = [{ asiakas_id: 1, tuote_id: 1, tuote_maara: 1 }];
    findTuoteMaaraByAsiakasIdAndTuoteId.mockResolvedValue(mockTuoteMaara);

    const response = await request(app).get('/api/v1/ostoskori/1/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTuoteMaara);
});

// Testi postOstos
test('postOstos should add a new product to the database', async () => {
    const newOstos = { asiakas_id: 1, tuote_id: 1, tuote_maara: 1 };
    addOstoskoriin.mockResolvedValue(newOstos);

    const response = await request(app)
        .post('/api/v1/ostoskori')
        .send(newOstos);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newOstos);
});

// Testi putOstosTuoteenMaara
test('putOstosTuoteenMaara should update a product amount in the database', async () => {
    const updatedOstos = { asiakas_id: 1, tuote_id: 1, tuote_maara: 2 };
    updateOstosTuoteenMaara.mockResolvedValue(updatedOstos);

    const response = await request(app)
        .put('/api/v1/ostoskori/1/1')
        .send(updatedOstos);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(updatedOstos);
});

// Testi deleteOstosById
test('deleteOstosById should remove a product by asiakas_id and tuote_id', async () => {
    const mockOstos = { asiakas_id: 1, tuote_id: 1, tuote_maara: 1 };
    removeOstosById.mockResolvedValue(mockOstos);

    const response = await request(app).delete('/api/v1/ostoskori/1/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOstos);
});

// Testi deleteOstosByUserId
test('deleteOstosByUserId should remove all products by asiakas_id', async () => {
    const mockOstos = [{ asiakas_id: 1, tuote_id: 1, tuote_maara: 1 }];
    removeOstosByUserId.mockResolvedValue(mockOstos);

    const response = await request(app).delete('/api/v1/ostoskori/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOstos);
});