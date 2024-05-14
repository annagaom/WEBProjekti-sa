const { listAllTuote,
    findTuoteById,
    findTuoteByTyyppeId,
    findTuoteByname,
    findLastTuoteId,
    addTuote,
    removeTuoteById,
    updateTuote,
} = require('../src/api/models/tuote-model');


// testi listAllTuote

test('listAllTuote returns all products from the database', async () => {
    const products = await listAllTuote();

    expect(products).toBeDefined();
}
);

// testi findTuoteById

test('findTuoteById returns a product by id', async () => {
    const product = await findTuoteById(1);

    expect(product).toBeDefined();
}
);

// testi findTuoteByTyyppeId

test('findTuoteByTyyppeId returns a product by tyyppi_id', async () => {
    const product = await findTuoteByTyyppeId(1);

    expect(product).toBeDefined();
}
);

// testi findTuoteByname

test('findTuoteByname returns a product by tuote_nimi', async () => {
    const product = await findTuoteByname('testi');

    expect(product).toBeDefined();
}
);

// testi findLastTuoteId

test('findLastTuoteId returns the last product id', async () => {
    const lastProductId = await findLastTuoteId();

    expect(lastProductId).toBeDefined();
}
);

// testi addTuote

test('addTuote adds a new product to the database', async () => {
    const newProduct = {
        tuote_nimi: 'testi',
        tuote_kuvaus: 'testi',
        tuote_hinta: 10.00,
        tuote_kustannus: 2.00,
        tyyppi_id: 1,
    };
    const file = { filename: 'kuva.jpg' };

    const addedProduct = await addTuote(newProduct, file);
    expect(addedProduct).toBeDefined();
}
);

// testi removeTuoteById

test('removeTuoteById removes a product from the database', async () => {
    const product = await removeTuoteById(1);

    expect(product).toBeDefined();
}
);

// testi updateTuote

test('updateTuote updates a product in the database', async () => {
    const updatedProduct = {
        tuote_nimi: 'testi2',
        tuote_kuvaus: 'testi',
        tuote_hinta: 10.00,
        tuote_kustannus: 2.00,
        tyyppi_id: 1,
    };
    const file = { filename: 'kuva.jpg' };

    const product = await updateTuote(1, updatedProduct, file);

    expect(product).toBeDefined();
}
);

