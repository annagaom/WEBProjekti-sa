const {
    listAllYritystoiminta,
    findYritystoimintaById,
    findYritystoimintaByTapahtuPvm,
    findYritystoimintaByDateRange,
    addYritystoiminta,
    removeYritystoimintaById,
    updateYritystoimintaById,
} = require('../src/api/models/yritystoiminta-model');
const request = require('supertest');
import app from '../src/app';

jest.mock('../src/api/models/yritystoiminta-model', () => ({
    listAllYritystoiminta: jest.fn(),
    findYritystoimintaById: jest.fn(),
    findYritystoimintaByTapahtuPvm: jest.fn(),
    findYritystoimintaByDateRange: jest.fn(),
    addYritystoiminta: jest.fn(),
    removeYritystoimintaById: jest.fn(),
    updateYritystoimintaById: jest.fn(),
}));

// test getYritystoiminta

test('getYritystoiminta should return all categories from the database', async () => {
    const mockYritystoiminta = [{ id: 1, tapahtu_pvm: '2021-12-12', tapahtu_kellonaika: '12:00', tapahtu_paikka: 'testi', tapahtu_kuvaus: 'testi' }];
    listAllYritystoiminta.mockResolvedValue(mockYritystoiminta);

    const response = await request(app).get('/api/v1/yritystoiminta');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockYritystoiminta);
});

// test getYritystoimintaById

test('getYritystoimintaById should return a category by id', async () => {
    const mockYritystoiminta = { id: 1, tapahtu_pvm: '2021-12-12', tapahtu_kellonaika: '12:00', tapahtu_paikka: 'testi', tapahtu_kuvaus: 'testi' };
    findYritystoimintaById.mockResolvedValue(mockYritystoiminta);

    const response = await request(app).get('/api/v1/yritystoiminta/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockYritystoiminta);
});

// test getYritystoimintaByTapahtuPvm
test('getYritystoimintaByTapahtuPvm should return a category by tapahtu_pvm', async () => {
    const mockYritystoiminta = [{ id: 1, tapahtu_pvm: '2021-12-12', tapahtu_kellonaika: '12:00', tapahtu_paikka: 'testi', tapahtu_kuvaus: 'testi' }];
    findYritystoimintaByTapahtuPvm.mockResolvedValue(mockYritystoiminta);

    const response = await request(app).get('/api/v1/yritystoiminta/pvm/2021-12-12');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockYritystoiminta);
});

// test getYritystoimintaByDateRange
test('getYritystoimintaByDateRange should return a category by date range', async () => {
    const mockYritystoiminta = [{ id: 1, tapahtu_pvm: '2021-12-12', tapahtu_kellonaika: '12:00', tapahtu_paikka: 'testi', tapahtu_kuvaus: 'testi' }];
    findYritystoimintaByDateRange.mockResolvedValue(mockYritystoiminta);

    const response = await request(app).get('/api/v1/yritystoiminta/2021-12-12/2021-12-12');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockYritystoiminta);
});


// test postYritystoiminta

test('postYritystoiminta should add a new category to the database', async () => {
    const newYritystoiminta = {
        tapahtu_pvm: '2021-12-12',
        tapahtu_kellonaika: '12:00',
        tapahtu_paikka: 'testi',
        tapahtu_kuvaus: 'testi'
    };

    addYritystoiminta.mockResolvedValue(newYritystoiminta);

    const response = await request(app)
        .post('/api/v1/yritystoiminta')
        .send(newYritystoiminta);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newYritystoiminta);
});

// test deleteYritystoimintaById

test('deleteYritystoimintaById should remove a category by id', async () => {
    const mockYritystoiminta = { id: 1, tapahtu_pvm: '2021-12-12', tapahtu_kellonaika: '12:00', tapahtu_paikka: 'testi', tapahtu_kuvaus: 'testi' };
    removeYritystoimintaById.mockResolvedValue(mockYritystoiminta);

    const response = await request(app).delete('/api/v1/yritystoiminta/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockYritystoiminta);
});


// testi putYritystoimintaById
test('putYritystoimintaById should update a category by id', async () => {
    const updatedYritystoiminta = {
        id: 1,
        tapahtu_pvm: '2021-12-12',
        tapahtu_kellonaika: '12:00',
        tapahtu_paikka: 'testi',
        tapahtu_kuvaus: 'testi'
    };

    updateYritystoimintaById.mockResolvedValue(updatedYritystoiminta);

    const response = await request(app)
        .put('/api/v1/yritystoiminta/1')
        .send(updatedYritystoiminta);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedYritystoiminta);
});
