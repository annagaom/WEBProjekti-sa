const request = require('supertest');
const bcrypt = require('bcrypt');
import app from '../src/app';
const {
    listAllUsers,
    findUserByUsername,
    findUserById,
    addUser,
    findUserByTunnus,
    updateUser,
    getAlennusRyhma,
} = require('../src/api/models/user-model');

jest.mock('../src/api/models/user-model', () => ({
    listAllUsers: jest.fn(),
    findUserByUsername: jest.fn(),
    findUserById: jest.fn(),
    addUser: jest.fn(),
    findUserByTunnus: jest.fn(),
    updateUser: jest.fn(),
    getAlennusRyhma: jest.fn()
}));

// Testit getUserByUsername
test('getUserByUsername should return a user by username', async () => {
    const mockUser = { id: 69, tunnus: 'sarapap' };
    findUserByUsername.mockResolvedValue(mockUser);

    const response = await request(app).get('/api/v1/asiakas/name/sarapap');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
});

test('getUserByUsername should return 404 if user is not found', async () => {
    findUserByUsername.mockResolvedValue(null);

    const response = await request(app).get('/api/v1/asiakas/name/sarapap');

    expect(response.status).toBe(404);
});

// test getUserById

test('getUserById should return user if user exists', async () => {
    const mockUser = { id: 117, etunimi: 'Test', sukunimi: 'User' };
    findUserById.mockResolvedValue(mockUser);

    const response = await request(app).get('/api/v1/asiakas/117');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
});

test('getUserById should return 404 if user does not exist', async () => {
    findUserById.mockResolvedValue(null);

    const response = await request(app).get('/api/v1/asiakas/117');

    expect(response.status).toBe(404);
});

// test postUser

test('postUser should add user successfully', async () => {
    const mockUser = {
        etunimi: 'Test',
        sukunimi: 'User',
        tunnus: 'testuser',
        salasana: 'hashedpassword',
        email: 'test@example.com',
        puhelin: '123456789',
        syntymapaiva: '1990-01-01',
        ehdot_hyvaksytty: true,
        allennus_ryhma: 'Opiskelija'
    };
    addUser.mockResolvedValue({ asiakas_id: 1 });

    const response = await request(app)
        .post('/api/v1/asiakas')
        .send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
    expect(response.body.asiakas_id).toBe(1);
});


// Testi getUser
test('getUser should return all users from the database', async () => {
    const mockUsers = [{ asiakas_id: 1, etunimi: 'Test', sukunimi: 'User' }];
    listAllUsers.mockResolvedValue(mockUsers);

    const response = await request(app).get('/api/v1/asiakas');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
});

// Testi userLoginPost

test('userLoginPost should return a token if login is successful', async () => {
    const mockUser = {
        asiakas_id: 1,
        tunnus: 'testuser',
        rooli: 'user',
        salasana: bcrypt.hashSync('password', 10)
    };
    findUserByTunnus.mockResolvedValue(mockUser);
    const response = await request(app)
        .post('/api/v1/asiakas/login')
        .send({ tunnus: 'testuser', salasana: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
    expect(response.body.asiakas_id).toBe(1);
}
);

// Testi putUser

test('putUser should update user successfully', async () => {
    const mockUser = {
        etunimi: 'Test',
        sukunimi: 'User',
        tunnus: 'testuser',
        salasana: 'hashedpassword',
        email: 'test@test.fi',
        puhelin: '123456789',
        syntymapaiva: '1990-01-01',
        ehdot_hyvaksytty: true,
        allennus_ryhma: 'Opiskelija'
    };
    updateUser.mockResolvedValue(mockUser);

    const response = await request(app)
        .put('/api/v1/asiakas/1')
        .send(mockUser);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
}
);

// testi checkAlennus
test('checkAlennus should return true if user is eligible for discount', async () => {
    const mockAlennusRyhma = 'Opiskelija';
    getAlennusRyhma.mockResolvedValue(mockAlennusRyhma);

    const response = await request(app).get('/api/v1/asiakas/alennus/69');

    expect(response.status).toBe(200);
    expect(response.body.isEligible).toBe(true);
}
);


