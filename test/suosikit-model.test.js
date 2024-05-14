const {
    listAllSuosikit,
    findSuosikkiByAsiakasId,
    addSuosikki,
    removeSuosikkiById,
    removeSuosikkiByasiakasIdAndTuoteId
} = require('../src/api/models/suosikit-model');

// testi listAllSuosikit

test('listAllSuosikit returns all suosikit from the database', async () => {
    const suosikit = await listAllSuosikit();

    expect(suosikit).toBeDefined();
}
);

// testi findSuosikkiByAsiakasId

test('findSuosikkiByAsiakasId returns a suosikki by asiakas_id', async () => {
    const suosikki = await findSuosikkiByAsiakasId(1);

    expect(suosikki).toBeDefined();
}
);

// testi addSuosikki

test('addSuosikki adds a new suosikki to the database', async () => {
    const newSuosikki = {
        asiakas_id: 1,
        tuote_id: 1
    };

    const addedSuosikki = await addSuosikki(newSuosikki);
    expect(addedSuosikki).toBeDefined();
}
);

// testi removeSuosikkiById

test('removeSuosikkiById removes a suosikki by asiakas_id and tuote_id', async () => {
    const suosikki = await removeSuosikkiById(1, 1);

    expect(suosikki).toBeDefined();

}
);

// testi removeSuosikkiByasiakasIdAndTuoteId

test('removeSuosikkiByasiakasIdAndTuoteId removes a suosikki by asiakas_id and tuote_id', async () => {
    const suosikki = await removeSuosikkiByasiakasIdAndTuoteId(1, 1);

    expect(suosikki).toBeDefined();

}
);