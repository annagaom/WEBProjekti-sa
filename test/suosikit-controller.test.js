const {
    listAllSuosikit,
    findSuosikkiByAsiakasId,
    addSuosikki,
    removeSuosikkiById,
    removeSuosikkiByasiakasIdAndTuoteId
} = require('../src/api/models/suosikit-model');
const request = require('supertest');
import app from '../src/app';

jest.mock('../src/api/models/suosikit-model', () => ({
    listAllSuosikit: jest.fn(),
    findSuosikkiByAsiakasId: jest.fn(),
    addSuosikki: jest.fn(),
    removeSuosikkiById: jest.fn(),
    removeSuosikkiByasiakasIdAndTuoteId: jest.fn()
}));

// testi getSuosikit


test('getSuosikit should return all suosikit from the database', async () => {
    const mockSuosikit = [{ asiakas_id: 1, tuote_id: 1 }];
    listAllSuosikit.mockResolvedValue(mockSuosikit);

    const response = await request(app).get('/api/v1/suosikit');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSuosikit);
}
);

// testi getSuosikkiByAsiakasId

test('getSuosikkiByAsiakasId should return a suosikki by asiakas_id', async () => {
    const mockSuosikki = [{ asiakas_id: 1, tuote_id: 1 }];
    findSuosikkiByAsiakasId.mockResolvedValue(mockSuosikki);

    const response = await request(app).get('/api/v1/suosikit/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSuosikki);
});

// testi postSuosikki

test('postSuosikki should add a new suosikki to the database', async () => {
    const newSuosikki = {
        asiakas_id: 1,
        tuote_id: 1
    };

    addSuosikki.mockResolvedValue(newSuosikki);

    const response = await request(app)
        .post('/api/v1/suosikit')
        .send(newSuosikki);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newSuosikki);
});

// testi deleteSuosikkiById

test('deleteSuosikkiById should remove a suosikki by asiakas_id and tuote_id', async () => {
    const mockSuosikki = { asiakas_id: 1, tuote_id: 1 };
    removeSuosikkiById.mockResolvedValue(mockSuosikki);

    const response = await request(app)
        .delete(`/api/v1/suosikit/${mockSuosikki.asiakas_id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSuosikki);
});


// Testi deleteSuosikkiByasiakasIdAndTuoteId
test('deleteSuosikkiByasiakasIdAndTuoteId should remove a suosikki by asiakas_id and tuote_id', async () => {
    const mockSuosikki = { asiakas_id: 1, tuote_id: 1 };
    removeSuosikkiByasiakasIdAndTuoteId.mockResolvedValue(mockSuosikki);

    const response = await request(app)
        .delete(`/api/v1/suosikit/${mockSuosikki.asiakas_id}/${mockSuosikki.tuote_id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSuosikki);
});