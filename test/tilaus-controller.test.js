const {
    listAllTilaukset,
    findTilausByTilausId,
    findTilausByAsiakasId,
    addTilaus,
    removeTilausByTilausId,
    updateTilausByTilausId
} = require('../src/api/models/tilaus-model');
const request = require('supertest');
import app from '../src/app';

jest.mock('../src/api/models/tilaus-model', () => ({
    listAllTilaukset: jest.fn(),
    findTilausByTilausId: jest.fn(),
    findTilausByAsiakasId: jest.fn(),
    addTilaus: jest.fn(),
    removeTilausByTilausId: jest.fn(),
    updateTilausByTilausId: jest.fn()
}));

// testi getTilaukset

test('getTilaukset should return all orders from the database', async () => {
    const mockTilaukset = [{ asiakas_id: 1, tilaus_pvm: '2021-12-12', toimitusosoite: 'testi', toimitustapa: 'testi', toimituskulut: 1, tilaus_summa: 1, tilaus_tila: 'testi' }];
    listAllTilaukset.mockResolvedValue(mockTilaukset);

    const response = await request(app).get('/api/v1/tilaus');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTilaukset);
}
);

// testi getTilausByTilausId

test('getTilausByTilausId should return an order by tilaus_id', async () => {
    const mockTilaus = [{ asiakas_id: 1, tilaus_pvm: '2021-12-12', toimitusosoite: 'testi', toimitustapa: 'testi', toimituskulut: 1, tilaus_summa: 1, tilaus_tila: 'testi' }];
    findTilausByTilausId.mockResolvedValue(mockTilaus);

    const response = await request(app).get('/api/v1/tilaus/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTilaus);
}
);

// testi getTilausByAsiakasId

test('getTilausByAsiakasId should return an order by asiakas_id', async () => {
    const mockTilaus = [{ asiakas_id: 1, tilaus_pvm: '2021-12-12', toimitusosoite: 'testi', toimitustapa: 'testi', toimituskulut: 1, tilaus_summa: 1, tilaus_tila: 'testi' }];
    findTilausByAsiakasId.mockResolvedValue(mockTilaus);

    const response = await request(app).get('/api/v1/tilaus/asiakas/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTilaus);
}
);

// testi postTilaus
test('postTilaus should add a new order to the database', async () => {
    const newTilaus = {
        asiakas_id: 1,
        tilaus_pvm: '2021-12-12',
        toimitusosoite: 'testi',
        toimitustapa: 'testi',
        toimituskulut: 1,
        tilaus_summa: 1,
        tilaus_tila: 'testi'
    };

    addTilaus.mockResolvedValue(newTilaus);

    const response = await request(app)
        .post('/api/v1/tilaus')
        .send(newTilaus);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newTilaus);
});

// test deleteTilausByTilausId
test('deleteTilausByTilausId removes an order by tilaus_id', async () => {
    const mockTilaus = { asiakas_id: 1, tilaus_pvm: '2021-12-12', toimitusosoite: 'testi', toimitustapa: 'testi', toimituskulut: 1, tilaus_summa: 1, tilaus_tila: 'testi' };
    removeTilausByTilausId.mockResolvedValue(mockTilaus);

    const response = await request(app).delete('/api/v1/tilaus/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTilaus);
});

// test putTilausByTilausId

test('putTilausByTilausId updates an order by tilaus_id', async () => {
    const updatedTilaus = {
        asiakas_id: 1,
        tilaus_pvm: '2021-12-12',
        toimitusosoite: 'testi',
        toimitustapa: 'testi',
        toimituskulut: 1,
        tilaus_summa: 1,
        tilaus_tila: 'testi'
    };

    const mockTilaus = { asiakas_id: 1, tilaus_pvm: '2021-12-12', toimitusosoite: 'testi', toimitustapa: 'testi', toimituskulut: 1, tilaus_summa: 1, tilaus_tila: 'testi' };
    updateTilausByTilausId.mockResolvedValue(mockTilaus);

    const response = await request(app)
        .put('/api/v1/tilaus/1')
        .send(updatedTilaus);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTilaus);
});