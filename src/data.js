const users = [
    {
        id: '32f629e1-e485-40f2-b61d-10684309c3f6',
        name: 'Eric Cartman',
        age: 9,
        address: {
            city: 'South Park',
            country: 'USA',
            countryCode: 1,
        },
        followerIds: ['aa6ec183-8648-446b-a49a-019a71c20d97'],
    },
    {
        id: 'aa6ec183-8648-446b-a49a-019a71c20d97',
        name: 'Butters Stotch',
        age: 9,
        address: {
            city: 'South Park',
            country: 'USA',
            countryCode: 1,
        },
        followerIds: [],
    },
    {
        id: '9fcb6d80-2166-40aa-aebc-302f8678827d',
        name: 'Randy Marsh',
        age: 38,
        address: {
            city: 'South Park',
            country: 'USA',
            countryCode: 1,
        },
        followerIds: [
            '32f629e1-e485-40f2-b61d-10684309c3f6',
            'aa6ec183-8648-446b-a49a-019a71c20d97',
        ],
    },
];

const posts = [
    {
        id: '1247fe95-cc62-4c60-9442-22b10bd1c92a',
        userId: '32f629e1-e485-40f2-b61d-10684309c3f6',
        title: 'Hello world',
        content: 'Respect my authoritah!',
    },
    {
        id: '4d271447-0069-4110-8d06-214235c32ed0',
        userId: '32f629e1-e485-40f2-b61d-10684309c3f6',
        title: 'I\'m a teacher now',
        content: 'How do I reeeach these kiiids?',
    },
    {
        id: 'c17d740d-cbb9-428d-ab98-894442b37d40',
        userId: '9fcb6d80-2166-40aa-aebc-302f8678827d',
        title: 'Where is my freedom?',
        content: 'I thought this was America!',
    },
];

module.exports = {
    users,
    posts,
};
