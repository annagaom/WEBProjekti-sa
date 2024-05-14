const {
    listAllpalaute, findPalauteByPvm, findPalauteByDateRange, addPalaute, removePalauteById
} = require('../src/api/models/palaute-model');
const request = require('supertest');
import app from '../src/app';

jest.mock('../src/api/models/palaute-model', () => ({
    listAllpalaute: jest.fn(),
    findPalauteByPvm: jest.fn(),
    findPalauteByDateRange: jest.fn(),
    addPalaute: jest.fn(),
    removePalauteById: jest.fn()
}));

// test getPalaute
test('getPalaute should return all feedbacks from the database', async () => {
    const mockPalaute = [{ palaute_id: 1, nimi: 'testi', email: 'testi', title: 'testi', pvm: '2021-12-12', teksti: 'testi' }];
    listAllpalaute.mockResolvedValue(mockPalaute);

    const response = await request(app).get('/api/v1/palaute');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPalaute);
});

// test getPalauteByPvm
test('getPalauteByPvm should return a feedback by pvm', async () => {
    const mockPalaute = { palaute_id: 1, nimi: 'testi', email: 'testi', title: 'testi', pvm: '2021-12-12', teksti: 'testi' };
    findPalauteByPvm.mockResolvedValue(mockPalaute);

    const response = await request(app).get('/api/v1/palaute/2021-12-12');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPalaute);
});

// test getPalauteByDateRange
test('getPalauteByDateRange should return a feedback by date range', async () => {
    const mockPalaute = [{ palaute_id: 1, nimi: 'testi', email: 'testi', title: 'testi', pvm: '2021-12-12', teksti: 'testi' }];
    findPalauteByDateRange.mockResolvedValue(mockPalaute);

    const response = await request(app).get('/api/v1/palaute/2021-12-12/2021-12-12');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPalaute);
});

// test postPalaute
test('postPalaute should add a new feedback to the database', async () => {
    const newPalaute = { nimi: 'testi', email: 'testi', title: 'testi', pvm: '2021-12-12', teksti: 'testi' };
    addPalaute.mockResolvedValue(newPalaute);

    const response = await request(app)
        .post('/api/v1/palaute')
        .send(newPalaute);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newPalaute);
});

// test deletePalaute
test('deletePalaute should remove a feedback by id', async () => {
    const mockPalaute = { palaute_id: 1, nimi: 'testi', email: 'testi', title: 'testi', pvm: '2021-12-12', teksti: 'testi' };
    removePalauteById.mockResolvedValue(mockPalaute);
    const response = await request(app).delete('/api/v1/palaute/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPalaute);
});
