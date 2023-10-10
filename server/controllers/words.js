const { MongoClient } = require("mongodb");
const url = 'mongodb+srv://rainywords:rainywordspassword@rainywords-db.g29zlts.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

async function get_easy_words() {
    try {
        const database = client.db('wordsDB');
        const col = database.collection('easy');

        const words = await col.aggregate([ { $sample: { size: 1 } }, { $project: { _id: 0 } }]).toArray();

        return words;
    }
    catch (error) {
        return { status: false, result: "fail"}
    }
}

async function get_medium_words() {
    try {
        const database = client.db('wordsDB');
        const col = database.collection('medium');

        const words = await col.aggregate([ { $sample: { size: 1 } }, { $project: { _id: 0 } }]).toArray();

        return words;
    }
    catch (error) {
        return { status: false, result: "fail"}
    }
}

async function get_hard_words() {
    try {
        const database = client.db('wordsDB');
        const col = database.collection('hard');

        const words = await col.aggregate([ { $sample: { size: 1 } }, { $project: { _id: 0 } }]).toArray();

        return words;
    }
    catch (error) {
        return { status: false, result: "fail"}
    }
}

module.exports = { get_easy_words, get_medium_words, get_hard_words }