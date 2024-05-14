const {
    listAllKategoriaTuote,
    findKategoriaTuoteById,
    findKategoriaTuoteByTuoteId,
    findKategoriaTuoteByKategoriaId,
    addKategoriaTuote,
    removeKategoriaTuoteById,
    updateKategoriaTuoteById,
    findKategoriatuoteIdByTuoteAndKategoria
} = require('../src/api/models/kategoriaTuote-model.js');

// test listAllKategoriaTuote

test('listAllKategoriaTuote returns all categories from the database', async () => {
    const kategoriatuoteet = await listAllKategoriaTuote();

    expect(kategoriatuoteet).toBeDefined();
}
);

// test findKategoriaTuoteById

test('findKategoriaTuoteById returns a category by id', async () => {
    const kategoriatuote = await findKategoriaTuoteById(1);

    expect(kategoriatuote).toBeDefined();
}
);

// test findKategoriaTuoteByTuoteId

test('findKategoriaTuoteByTuoteId returns a category by tuote_id', async () => {
    const kategoriatuote = await findKategoriaTuoteByTuoteId(1);

    expect(kategoriatuote).toBeDefined();
}
);

// test findKategoriaTuoteByKategoriaId

test('findKategoriaTuoteByKategoriaId returns a category by kategoria_id', async () => {
    const kategoriatuote = await findKategoriaTuoteByKategoriaId(1);

    expect(kategoriatuote).toBeDefined();
}
);

// test findKategoriatuoteIdByTuoteAndKategoria

test('findKategoriatuoteIdByTuoteAndKategoria returns a category by tuote_id and kategoria_id', async () => {
    const kategoriatuote = await findKategoriatuoteIdByTuoteAndKategoria(1, 1);

    expect(kategoriatuote).toBeDefined();
}
);

// test addKategoriaTuote

test('addKategoriaTuote adds a new category to the database', async () => {
    const newKategoriaTuote = {
        kategoria_id: 1,
        tuote_id: 1
    };

    const addedKategoriaTuote = await addKategoriaTuote(newKategoriaTuote);
    expect(addedKategoriaTuote).toBeDefined();
}
);

// test updateKategoriaTuoteById

test('updateKategoriaTuoteById updates a category by id', async () => {

    const updatedKategoriaTuote = await updateKategoriaTuoteById(1, 1);

    expect(updatedKategoriaTuote).toBeDefined();

}
);

// test removeKategoriaTuoteById

test('removeKategoriaTuoteById removes a category by id', async () => {
    const kategoriatuote = await removeKategoriaTuoteById(1);

    expect(kategoriatuote).toBeDefined();
}
);