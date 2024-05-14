const { listAllTyypit,
    findAlatyypitByPaatyyppi,
    addTyyppi,
    removeTyyppiById
} = require('../src/api/models/tyyppi-model.js');
const request = require('supertest');
import app from '../src/app';

jest.mock('../src/api/models/tyyppi-model.js', () => ({
    listAllTyypit: jest.fn(),
    findTyyppiIdByTyypit: jest.fn(),
    findAlatyypitByPaatyyppi: jest.fn(),
    addTyyppi: jest.fn(),
    removeTyyppiById: jest.fn()
}));

// test getTyypit

test('getTyypit should return all types from the database', async () => {
    const mockTyypit = [{ id: 1, paatyyppi: 'testi', alatyyppi: 'testi' }];
    listAllTyypit.mockResolvedValue(mockTyypit);

    const response = await request(app).get('/api/v1/tyyppi');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTyypit);
});

// test getAlatyyppiByPaatyyppi

test('getAlatyyppiByPaatyyppi should return a type by paatyyppi', async () => {
    const mockTyypit = [{ id: 1, paatyyppi: 'testi', alatyyppi: 'testi' }];
    findAlatyypitByPaatyyppi.mockResolvedValue(mockTyypit);

    const response = await request(app).get('/api/v1/tyyppi/paatyyppi/testi');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTyypit);
}
);

// test postTyyppi
test('postTyyppi should add a new type to the database', async () => {
    const newType = {
        paatyyppi: 'testi',
        alatyyppi: 'testi',
    };

    addTyyppi.mockResolvedValue(newType);

    const response = await request(app)
        .post('/api/v1/tyyppi')
        .send(newType);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newType);
});


// test deleteTyyppi

test('deleteTyyppi should remove a type by id', async () => {
    const mockTyypit = [{ id: 1, paatyyppi: 'testi', alatyyppi: 'testi' }];
    removeTyyppiById.mockResolvedValue(mockTyypit);

    const response = await request(app).delete('/api/v1/tyyppi/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTyypit);
}
);
