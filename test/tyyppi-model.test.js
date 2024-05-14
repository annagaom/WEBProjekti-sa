const { listAllTyypit,
    findTyyppiIdByTyypit,
    findAlatyypitByPaatyyppi,
    addTyyppi,
    removeTyyppiById
} = require('../src/api/models/tyyppi-model.js');

// test listAllTyypit

test('listAllTyypit returns all types from the database', async () => {
    const types = await listAllTyypit();

    expect(types).toBeDefined();
}
);

// test findTyyppiIdByTyypit

test('findTyyppiIdByTyypit returns a type by paatyyppi and alatyyppi', async () => {
    const type = await findTyyppiIdByTyypit('testi', 'testi');

    expect(type).toBeDefined();
}

);

// test findAlatyypitByPaatyyppi

test('findAlatyypitByPaatyyppi returns a type by paatyyppi', async () => {
    const type = await findAlatyypitByPaatyyppi('testi');

    expect(type).toBeDefined();
}

);

// test addTyyppi

test('addTyyppi adds a new type to the database', async () => {
    const newType = {
        paatyyppi: 'testi',
        alatyyppi: 'testi'
    };

    const addedType = await addTyyppi(newType);
    expect(addedType).toBeDefined();
}

);

// test removeTyyppiById

test('removeTyyppiById removes a type by id', async () => {
    const type = await removeTyyppiById(1);

    expect(type).toBeDefined();
}
);