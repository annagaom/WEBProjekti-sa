const {
    listAllKategorias, findKategoriaById, findKategoriaByname, addKategoria, updateKategoria, removeKategoriaById
} = require('../src/api/models/kategoria-model');
const request = require('supertest');
import app from '../src/app';

jest.mock('../src/api/models/kategoria-model', () => ({
    listAllKategorias: jest.fn(),
    findKategoriaById: jest.fn(),
    findKategoriaByname: jest.fn(),
    addKategoria: jest.fn(),
    updateKategoria: jest.fn(),
    removeKategoriaById: jest.fn()
}));

// test getKategorias
test('getKategorias should return all categories from the database', async () => {
    const mockKategorias = [{ kategoria_id: 1, kategoria_nimi: 'testi' }];
    listAllKategorias.mockResolvedValue(mockKategorias);

    const response = await request(app).get('/api/v1/kategoria');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockKategorias);
});

// test getKategoriaById
test('getKategoriaById should return a category by id', async () => {
    const mockKategoria = { kategoria_id: 1, kategoria_nimi: 'testi' };
    findKategoriaById.mockResolvedValue(mockKategoria);

    const response = await request(app).get('/api/v1/kategoria/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockKategoria);
});

// test getKategoriaByname
test('getKategoriaByname should return a category by kategoria_nimi', async () => {
    const mockKategoria = { kategoria_id: 1, kategoria_nimi: 'testi' };
    findKategoriaByname.mockResolvedValue(mockKategoria);

    const response = await request(app).get('/api/v1/kategoria/name/testi');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockKategoria);
});

// test postKategoria
test('postKategoria should add a new category to the database', async () => {
    const newKategoria = { kategoria_nimi: 'testi' };
    addKategoria.mockResolvedValue(newKategoria);

    const response = await request(app)
        .post('/api/v1/kategoria')
        .send(newKategoria);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newKategoria);
});

// test deleteKategoria
test('deleteKategoria should remove a category by id', async () => {
    const mockKategoria = { kategoria_id: 1, kategoria_nimi: 'testi' };
    removeKategoriaById.mockResolvedValue(mockKategoria);

    const response = await request(app).delete('/api/v1/kategoria/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockKategoria);
});

// test putKategoria
test('putKategoria should update a category by id', async () => {
    const updatedKategoria = { kategoria_id: 1, kategoria_nimi: 'testi' };
    updateKategoria.mockResolvedValue(updatedKategoria);

    const response = await request(app)
        .put('/api/v1/kategoria/1')
        .send({ kategoria_nimi: 'testi' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedKategoria);
});

