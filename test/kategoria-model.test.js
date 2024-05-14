const {
    listAllKategorias, findKategoriaById, findKategoriaByname, addKategoria, updateKategoria, removeKategoriaById
} = require('../src/api/models/kategoria-model');

// test listAllKategorias

test('listAllKategorias returns all categories from the database', async () => {
    const categories = await listAllKategorias();

    expect(categories).toBeDefined();
}
);

// test findKategoriaById

test('findKategoriaById returns a category by id', async () => {
    const category = await findKategoriaById(1);

    expect(category).toBeDefined();
}
);

// test findKategoriaByname

test('findKategoriaByname returns a category by kategoria_nimi', async () => {
    const category = await findKategoriaByname('testi');

    expect(category).toBeDefined();
}
);

// test addKategoria

test('addKategoria adds a new category to the database', async () => {
    const newCategory = {
        kategoria_nimi: 'testi'
    };

    const addedCategory = await addKategoria(newCategory);
    expect(addedCategory).toBeDefined();
}

);

// test removeKategoriaById

test('removeKategoriaById removes a category by id', async () => {
    const category = await removeKategoriaById(1);

    expect(category).toBeDefined();
}
);

// test updateKategoria

test('updateKategoria updates a category by id', async () => {

    const updatedCategory = await updateKategoria(2, 'testi');

    expect(updatedCategory).toBeDefined();

}

);

// test removeKategoriaById

test('removeKategoriaById removes a category by id', async () => {
    const category = await removeKategoriaById(1);

    expect(category).toBeDefined();
}
);

// test updateKategoria

test('updateKategoria updates a category by id', async () => {
    const updatedCategory = await updateKategoria(2, 'testi');

    expect(updatedCategory).toBeDefined();

}

);