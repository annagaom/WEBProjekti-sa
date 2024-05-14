const {
    listAllUsers,
    findUserById,
    addUser,
    findUserByUsername,
    findUserByTunnus,
    removeUser,
    updateUser,
    updateUserPassword,
    getAlennusRyhma
} = require('../src/api/models/user-model');

// testi listAllUsers
test('listAllUsers returns all users from the database', async () => {
    const users = await listAllUsers();

    expect(users).toBeDefined();
});

// testi findUserById

test('findUserById returns a user by id', async () => {
    const user = await findUserById(1);

    expect(user).toBeDefined();
});

// testi addUser

test('addUser adds a new user to the database', async () => {
    const newUser = {
        etunimi: 'testi',
        sukunimi: 'kayttaja',
        tunnus: 'testi3',
        salasana: 'password',
        rooli: 'user',
        email: 'testi@example.com',
        puhelin: '123456789',
        syntymapaiva: '1990-01-01',
        ehdot_hyvaksytty: true,
        allennus_ryhma: 'Opiskelija'
    };

    const addedUser = await addUser(newUser);
    expect(addedUser).toBeDefined();
});


// testi findUserByUsername

test('findUserByUsername returns a user by username', async () => {
    const user = await findUserByUsername('testi');

    expect(user).toBeDefined();
});

// testi findUserByTunnus

test('findUserByTunnus returns a user by tunnus', async () => {
    const user = await findUserByTunnus('testi');

    expect(user).toBeDefined();
}
);

// testi removeUser

test('removeUser removes a user from the database', async () => {
    const user = await removeUser(1);

    expect(user).toBeDefined();
}
);

// testi updateUser

test('updateUser updates user information in the database', async () => {
    const userId = 1;

    const updatedUser = {
        etunimi: 'Sara',
        sukunimi: 'Pappila',
        email: 'sarapap@example.com',
        puhelin: '12345678'
    };

    const result = await updateUser(updatedUser, userId);
    expect(result).toBeTruthy();
});

// testi updateUserPassword

test('updateUserPassword updates user password in the database', async () => {
    const userId = 117;
    const newPassword = 'newpassword';

    const result = await updateUserPassword(userId, newPassword);
    expect(result).toBeTruthy();
});

// testi get alennusryhma

test('getAlennusRyhma returns the discount group of a user', async () => {
    const userId = 117;

    const alennusRyhma = await getAlennusRyhma(userId);
    expect(alennusRyhma).toBeDefined();
});

