const { MongoClient } = require("mongodb");
const url = 'mongodb+srv://rainywords:rainywordspassword@rainywords-db.g29zlts.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

async function get_easy_words() {
    try {
        const database = client.db('wordsDB');
        const col = database.collection('easy');

        const words = await col.aggregate([ { $sample: { size: 100 } }, { $project: { _id: 0 } }]).toArray();

        let easy = []

        for (let ans = 0; ans< 100; ans++) {
            // console.log(words[ans].easy)
            easy.push(words[ans].easy)
        }

        return easy;
    }
    catch (error) {
        return { status: false, result: error}
    }
}

async function get_medium_words() {
    try {
        const database = client.db('wordsDB');
        const col = database.collection('medium');

        const words = await col.aggregate([ { $sample: { size: 100 } }, { $project: { _id: 0 } }]).toArray();

        let easy = []

        for (let ans = 0; ans< 100; ans++) {
            // console.log(words[ans].easy)
            easy.push(words[ans].easy)
        }

        return easy;
    }
    catch (error) {
        return { status: false, result: error}
    }
}

async function get_hard_words() {
    try {
        const database = client.db('wordsDB');
        const col = database.collection('hard');

        const words = await col.aggregate([ { $sample: { size: 100 } }, { $project: { _id: 0 } }]).toArray();

        let easy = []

        for (let ans = 0; ans< 100; ans++) {
            // console.log(words[ans].easy)
            easy.push(words[ans].easy)
        }

        return easy;
    }
    catch (error) {
        return { status: false, result: error}
    }
}

module.exports = { get_easy_words, get_medium_words, get_hard_words }