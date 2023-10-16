const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');
const url = 'mongodb+srv://rainywords:rainywordspassword@rainywords-db.g29zlts.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

async function check_user(req) {
    try {
        const database = client.db('usersDB');
        const col = database.collection('user');

        if (!req || !req.name) {
            return { status: false, message: "Require username"}
        }

        const existing_user = await col.findOne({ name: req.name }, { projection: { _id: 0 } });

        if (existing_user) {
            return existing_user
        } else {
            const newUser = {
                name: req.name,
                id: uuidv4(),
                score: 0
            } 
        
        await col.insertOne(newUser);
        return newUser;
        };
    }
    catch (error) {
        return { status: false, result: error}
    }
}

async function add_score(req) {
    try {
        const database = client.db('usersDB');
        const col = database.collection('user');

        const existing_user = await col.findOne({ name: req.name }, { projection: { _id: 0 } });
        console.log(existing_user)

        if (existing_user) {
            const update_score = await col.updateOne(
                { "name" : req.name },
                { $set: { "score" : req.score } })

            if (update_score.modifiedCount === 1) {
                return { status: true, message: "Score updated successfully" };
            } else {
                return { status: false, message: "Score update failed" };
            }
            
        } else {
            return { status: false, message: "Create the user first"}
        };
    }
    catch (error) {
        return { status: false, result: error}
    }
}

async function get_top_three() {
    try {
        const database = client.db('usersDB');
        const col = database.collection('user');

        const userCount = await col.countDocuments();
        console.log(userCount)

        if (userCount < 3) {
            const top_users = await col.find({ score: { $exists: true } }).sort({ score: -1 }).toArray();
            return top_users;
        } else {
            const topThree_users = await col.find().sort({ score: -1 }).limit(3).toArray();
            console.log(topThree_users)
            return topThree_users;
        }

    }
    catch (error) {
        return { status: false, result: error}
    }
}

module.exports = { check_user, add_score, get_top_three }