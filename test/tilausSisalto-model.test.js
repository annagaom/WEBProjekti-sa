const {
    listAllTilausSisalto,
    findTilausSisaltoById,
    findTilausSisaltoByTilausId,
    findTilausPvmByTilausId,
    findTilausSisaltoByPvm,
    findTilausSisaltoByDateRange,
    addTilausSisalto,
    removeTilausSisaltoById,
    updateTilausSisaltoById
} = require('../src/api/models/tilausSisalto-model.js');

// test listAllTilausSisalto

test('listAllTilausSisalto returns all orders from the database', async () => {
    const orders = await listAllTilausSisalto();

    expect(orders).toBeDefined();
}
);

// test findTilausSisaltoById

test('findTilausSisaltoById returns an order by id', async () => {

    const order = await findTilausSisaltoById(1);

    expect(order).toBeDefined();
}
);

// test findTilausSisaltoByTilausId

test('findTilausSisaltoByTilausId returns an order by tilaus_id', async () => {

    const order = await findTilausSisaltoByTilausId(1);

    expect(order).toBeDefined();
}
);

// test findTilausPvmByTilausId

test('findTilausPvmByTilausId returns an order by tilaus_id', async () => {

    const order = await findTilausPvmByTilausId(1);

    expect(order).toBeDefined();
}
);

// test findTilausSisaltoByPvm

test('findTilausSisaltoByPvm returns an order by tilaus_pvm', async () => {

    const order = await findTilausSisaltoByPvm('2021-12-12');

    expect(order).toBeDefined();
}
);

// test findTilausSisaltoByDateRange

test('findTilausSisaltoByDateRange returns an order by date range', async () => {

    const order = await findTilausSisaltoByDateRange('2021-12-12', '2021-12-12');

    expect(order).toBeDefined();
}

);

// test addTilausSisalto

test('addTilausSisalto adds a new order to the database', async () => {
    const newOrder = {
        tilaus_id: 1,
        tuote_id: 1,
        tuote_maara: 1
    };

    const addedOrder = await addTilausSisalto(newOrder);
    expect(addedOrder).toBeDefined();
}
);

// test removeTilausSisaltoById

test('removeTilausSisaltoById removes an order by id', async () => {
    const order = await removeTilausSisaltoById(1);

    expect(order).toBeDefined();
}
);

// test updateTilausSisaltoById

test('updateTilausSisaltoById updates an order by id', async () => {
    const updatedOrder = await updateTilausSisaltoById(1, 1, 1);

    expect(updatedOrder).toBeDefined();
}
);
