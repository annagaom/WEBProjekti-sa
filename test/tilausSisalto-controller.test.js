const {
    listAllTilausSisalto,
    findTilausSisaltoById,
    findTilausSisaltoByTilausId,
    findTilausPvmByTilausId,
    findTilausSisaltoByPvm,
    findTilausSisaltoByDateRange,
    addTilausSisalto,
} = require('../src/api/models/tilausSisalto-model.js');
const request = require('supertest');
import app from '../src/app';

jest.mock('../src/api/models/tilausSisalto-model.js', () => ({
    listAllTilausSisalto: jest.fn(),
    findTilausSisaltoById: jest.fn(),
    findTilausSisaltoByTilausId: jest.fn(),
    findTilausPvmByTilausId: jest.fn(),
    findTilausSisaltoByPvm: jest.fn(),
    findTilausSisaltoByDateRange: jest.fn(),
    addTilausSisalto: jest.fn(),
    removeTilausSisaltoById: jest.fn(),
    updateTilausSisaltoById: jest.fn()
}));

// test getTilausSisalto

test('getTilausSisalto should return all orders from the database', async () => {
    const mockTilausSisalto = [{ tilaus_id: 1, tuote_id: 1, maara: 1 }];
    listAllTilausSisalto.mockResolvedValue(mockTilausSisalto);

    const response = await request(app).get('/api/v1/tilaus_sisalto');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTilausSisalto);
});

// test getTilausSisaltoById

test('getTilausSisaltoById should return an order by id', async () => {
    const mockTilausSisalto = [{ tilaus_id: 1, tuote_id: 1, maara: 1 }];
    findTilausSisaltoById.mockResolvedValue(mockTilausSisalto);

    const response = await request(app).get('/api/v1/tilaus_sisalto/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTilausSisalto);
});

// test getTilausSisaltoByTilausId

test('getTilausPvmByTilausId should return an order by id', async () => {
    const mockTilausSisalto = [{ tilaus_id: 1, tuote_id: 1, maara: 1 }];
    findTilausPvmByTilausId.mockResolvedValue(mockTilausSisalto);

    const response = await request(app).get('/api/v1/tilaus_sisalto/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTilausSisalto);
});

// test getTilausPvmByTilausId

test('getTilausSisaltoByTilausId should return an order by tilaus_id', async () => {
    const mockTilausSisalto = [{ tilaus_id: 1, tuote_id: 1, maara: 1 }];
    findTilausSisaltoByTilausId.mockResolvedValue(mockTilausSisalto);

    const response = await request(app).get('/api/v1/tilaus_sisalto/tilaus/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTilausSisalto);
});

// test getTilausSisaltoByPvm

test('getTilausSisaltoByTilausPvm should return an order by tilaus_pvm', async () => {
    const mockTilausSisalto = [{ tilaus_id: 1, tuote_id: 1, maara: 1 }];
    findTilausSisaltoByPvm.mockResolvedValue(mockTilausSisalto);

    const response = await request(app).get('/api/v1/tilaus_sisalto/pvm/2021-12-12');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTilausSisalto);
});

// test getTilausSisaltoByDateRange

test('getTilausSisaltoByDateRange should return an order by date range', async () => {
    const mockTilausSisalto = [{ tilaus_id: 1, tuote_id: 1, maara: 1 }];
    findTilausSisaltoByDateRange.mockResolvedValue(mockTilausSisalto);

    const response = await request(app).get('/api/v1/tilaus_sisalto/2021-12-12/2021-12-12');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTilausSisalto);
});

// test postTilausSisalto
test('postTilausSisalto should add a new order to the database', async () => {
    const newTilausSisalto = {
        tilaus_id: 1,
        tuote_id: 1,
        maara: 1
    };

    addTilausSisalto.mockResolvedValue(newTilausSisalto);

    const response = await request(app)
        .post('/api/v1/tilaus_sisalto')
        .send(newTilausSisalto);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Tilaus sisälto lisätty' });
});
