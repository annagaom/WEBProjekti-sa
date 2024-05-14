const {
    listAllTilaukset,
    findTilausByTilausId,
    findTilausByAsiakasId,
    addTilaus,
    removeTilausByTilausId,
    updateTilausByTilausId
} = require('../src/api/models/tilaus-model');

// testi listAllTilaukset

test('listAllTilaukset returns all orders from the database', async () => {
    const orders = await listAllTilaukset();

    expect(orders).toBeDefined();
}
);

// testi findTilausByTilausId

test('findTilausByTilausId returns an order by tilaus_id', async () => {

    const order = await findTilausByTilausId(1);

    expect(order).toBeDefined();
}
);

// testi findTilausByAsiakasId

test('findTilausByAsiakasId returns an order by asiakas_id', async () => {

    const order = await findTilausByAsiakasId(1);

    expect(order).toBeDefined();
}
);

// testi addTilaus

test('addTilaus adds a new order to the database', async () => {
    const newOrder = {
        asiakas_id: 1,
        tilaus_pvm: '2021-12-12',
        toimitusosoite: 'testi',
        toimitustapa: 'testi',
        toimituskulut: 1,
        tilaus_summa: 1,
        tilaus_tila: 'testi'
    };

    const addedOrder = await addTilaus(newOrder);
    expect(addedOrder).toBeDefined();
}
);

// testi removeTilausByTilausId

test('removeTilausByTilausId removes an order by tilaus_id', async () => {
    const order = await removeTilausByTilausId(1);

    expect(order).toBeDefined();
}
);

// testi updateTilausByTilausId

test('updateTilausByTilausId updates an order by tilaus_id', async () => {
    const updatedOrder = await updateTilausByTilausId(1, 'testi');

    expect(updatedOrder).toBeDefined();
}
);