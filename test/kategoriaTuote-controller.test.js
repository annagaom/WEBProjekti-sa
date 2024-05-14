const {
    listAllKategoriaTuote,
    findKategoriaTuoteById,
    findKategoriaTuoteByTuoteId,
    findKategoriaTuoteByKategoriaId,
    addKategoriaTuote,
    updateKategoriaTuoteById,
    findKategoriatuoteIdByTuoteAndKategoria
} = require('../src/api/models/kategoriaTuote-model.js');
const request = require('supertest');
import app from '../src/app';

jest.mock('../src/api/models/kategoriaTuote-model.js', () => ({
    listAllKategoriaTuote: jest.fn(),
    findKategoriaTuoteById: jest.fn(),
    findKategoriaTuoteByTuoteId: jest.fn(),
    findKategoriaTuoteByKategoriaId: jest.fn(),
    addKategoriaTuote: jest.fn(),
    updateKategoriaTuoteById: jest.fn(),
    findKategoriatuoteIdByTuoteAndKategoria: jest.fn()
}));

// test getKategoriaTuote
test('getKategoriaTuote should return all categories from the database', async () => {
    const mockKategoriaTuote = [{ kategoria_id: 1, tuote_id: 1 }];
    listAllKategoriaTuote.mockResolvedValue(mockKategoriaTuote);

    const response = await request(app).get('/api/v1/kategoria_tuote');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockKategoriaTuote);
});

// test getKategoriaTuoteById
test('getKategoriaTuoteById should return a category by id', async () => {
    const mockKategoriaTuote = { kategoria_id: 1, tuote_id: 1 };
    findKategoriaTuoteById.mockResolvedValue(mockKategoriaTuote);

    const response = await request(app).get('/api/v1/kategoria_tuote/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockKategoriaTuote);
});

// test getKategoriaTuoteByTuoteId
test('getKategoriaTuoteByTuoteId should return a category by tuote_id', async () => {
    const mockKategoriaTuote = [{ kategoria_id: 1, tuote_id: 1 }];
    findKategoriaTuoteByTuoteId.mockResolvedValue(mockKategoriaTuote);

    const response = await request(app).get('/api/v1/kategoria_tuote/tuote/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockKategoriaTuote);
});

// test getKategoriaTuoteByKategoriaId
test('getKategoriaTuoteByKategoriaId should return a category by kategoria_id', async () => {
    const mockKategoriaTuote = [{ kategoria_id: 1, tuote_id: 1 }];
    findKategoriaTuoteByKategoriaId.mockResolvedValue(mockKategoriaTuote);

    const response = await request(app).get('/api/v1/kategoria_tuote/kategoria/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockKategoriaTuote);
});

// test getKategoriatuoteIdByTuoteAndKategoria
test('getKategoriatuoteIdByTuoteAndKategoria should return a category by tuote_id and kategoria_id', async () => {
    const mockKategoriaTuote = { kategoria_id: 1, tuote_id: 1 };
    findKategoriatuoteIdByTuoteAndKategoria.mockResolvedValue(mockKategoriaTuote);

    const response = await request(app).get('/api/v1/kategoria_tuote/1/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockKategoriaTuote);
});

// test postKategoriaTuote
test('postKategoriaTuote should add a new category to the database', async () => {
    const newKategoriaTuote = { kategoria_id: 1, tuote_id: 1 };
    addKategoriaTuote.mockResolvedValue(newKategoriaTuote);

    const response = await request(app)
        .post('/api/v1/kategoria_tuote')
        .send(newKategoriaTuote);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newKategoriaTuote);
});

// test putKategoriaTuote
test('putKategoriaTuote should update a category in the database', async () => {
    const updatedKategoriaTuote = { kategoria_id: 1, tuote_id: 1 };
    updateKategoriaTuoteById.mockResolvedValue(updatedKategoriaTuote);

    const response = await request(app)
        .put('/api/v1/kategoria_tuote/1')
        .send(updatedKategoriaTuote);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedKategoriaTuote);
});
