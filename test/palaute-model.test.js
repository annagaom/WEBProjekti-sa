const {
    listAllpalaute, findPalauteByPvm, findPalauteByDateRange, addPalaute, removePalauteById
} = require('../src/api/models/palaute-model');

// test listAllpalaute

test('listAllpalaute returns all feedbacks from the database', async () => {
    const feedbacks = await listAllpalaute();

    expect(feedbacks).toBeDefined();
}
);

// test findPalauteByPvm

test('findPalauteByPvm returns a feedback by palaute_pvm', async () => {

    const feedback = await findPalauteByPvm('2021-12-12');

    expect(feedback).toBeDefined();
}
);

// test findPalauteByDateRange

test('findPalauteByDateRange returns a feedback by date range', async () => {

    const feedback = await findPalauteByDateRange('2021-12-12', '2021-12-12');

    expect(feedback).toBeDefined();
}
);

// test addPalaute

test('addPalaute adds a new feedback to the database', async () => {
    const newFeedback = {
        nimi: 'testi',
        email: 'testi',
        title: 'testi',
        pvm: '2021-12-12',
        teksti: 'testi',
    };

    const addedFeedback = await addPalaute(newFeedback);
    expect(addedFeedback).toBeDefined();
}

);

// test removePalauteById

test('removePalauteById removes a feedback by id', async () => {
    const feedback = await removePalauteById(1);
    expect(feedback).toBeDefined();
}
);

