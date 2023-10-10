const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');
const url = 'mongodb+srv://rainywords:rainywordspassword@rainywords-db.g29zlts.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

async function check_user(req) {
    try {
        const database = client.db('usersDB');
        const col = database.collection('user');
        console.log(req.body)

        if (!req || !req.user_name) {
            return { status: false, message: 'require user_name'}
        }

        const existing_user = await col.findOne({ user_name: req.user_name });

        if (existing_user) {
            return existing_user
        } else {
            const newUser = {
                user_name: req.user_name,
                user_id: uuidv4()
            } 
        
        await col.insertOne(newUser);
        return newUser;
        };
    }
    catch (error) {
        return { status: false, result: error}
    }
}

module.exports = { check_user }