const {
    listAllYritystoiminta,
    findYritystoimintaById,
    findYritystoimintaByTapahtuPvm,
    findYritystoimintaByDateRange,
    addYritystoiminta,
    removeYritystoimintaById,
    updateYritystoimintaById
} = require('../src/api/models/yritystoiminta-model');

// test listAllYritystoiminta

test('listAllYritystoiminta returns all categories from the database', async () => {
    const yritystoiminta = await listAllYritystoiminta();

    expect(yritystoiminta).toBeDefined();
}
);

// test findYritystoimintaById

test('findYritystoimintaById returns a category by id', async () => {
    const yritystoiminta = await findYritystoimintaById(1);

    expect(yritystoiminta).toBeDefined();
}
);

// test findYritystoimintaByTapahtuPvm

test('findYritystoimintaByTapahtuPvm returns a category by tapahtu_pvm', async () => {
    const yritystoiminta = await findYritystoimintaByTapahtuPvm('2021-12-12');

    expect(yritystoiminta).toBeDefined();
}
);

// test findYritystoimintaByDateRange

test('findYritystoimintaByDateRange returns a category by date range', async () => {
    const yritystoiminta = await findYritystoimintaByDateRange('2021-12-12', '2021-12-12');

    expect(yritystoiminta).toBeDefined();
}
);

// test addYritystoiminta

test('addYritystoiminta adds a new category to the database', async () => {
    const newYritystoiminta = {
        tapahtu_pvm: '2021-12-12',
        tapahtu_kellonaika: '12:00',
        tapahtu_paikka: 'testi',
        tapahtu_kuvaus: 'testi'
    };

    const addedYritystoiminta = await addYritystoiminta(newYritystoiminta);
    expect(addedYritystoiminta).toBeDefined();
}

);

// test removeYritystoimintaById

test('removeYritystoimintaById removes a category by id', async () => {
    const yritystoiminta = await removeYritystoimintaById(1);
    expect(yritystoiminta).toBeDefined();
}
);

// test updateYritystoimintaById

test('updateYritystoimintaById updates a category by id', async () => {

    const updatedYritystoiminta = await updateYritystoimintaById(2, 'testi');
    expect(updatedYritystoiminta).toBeDefined();

}
);