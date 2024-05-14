const {
    listAllostokset,
    findOstosByAsiakasId,
    findTuoteMaaraByAsiakasIdAndTuoteId,
    addOstoskoriin,
    updateOstosTuoteenMaara,
    removeOstosById,
    removeOstosByUserId
} = require('../src/api/models/ostoskori-model.js');

// testi listAllostokset

test('listAllostokset returns all products from the database', async () => {
    const ostokset = await listAllostokset();

    expect(ostokset).toBeDefined();
}
);

// testi findOstosByAsiakasId

test('findOstosByAsiakasId returns a product by asiakas_id', async () => {
    const ostos = await findOstosByAsiakasId(1);

    expect(ostos).toBeDefined();
}
);

// testi findTuoteMaaraByAsiakasIdAndTuoteId

test('findTuoteMaaraByAsiakasIdAndTuoteId returns a product by asiakas_id and tuote_id', async () => {
    const tuotemaara = await findTuoteMaaraByAsiakasIdAndTuoteId(1, 1);

    expect(tuotemaara).toBeDefined();
}
);

// testi addOstoskoriin

test('addOstoskoriin adds a new product to the database', async () => {
    const newOstos = {
        asiakas_id: 1,
        tuote_id: 1,
        tuote_maara: 1
    };

    const addedOstos = await addOstoskoriin(newOstos);
    expect(addedOstos).toBeDefined();
}

);

// testi updateOstosTuoteenMaara

test('updateOstosTuoteenMaara updates a product amount in the database', async () => {
    const updatedOstos = await updateOstosTuoteenMaara(2, 1, 1);

    expect(updatedOstos).toBeDefined();

}
);

// testi removeOstosById

test('removeOstosById removes a product by id', async () => {
    const ostos = await removeOstosById(1);

    expect(ostos).toBeDefined();

}
);

// testi removeOstosByUserId

test('removeOstosByUserId removes a product by user id', async () => {
    const ostos = await removeOstosByUserId(1);

    expect(ostos).toBeDefined();

}
);