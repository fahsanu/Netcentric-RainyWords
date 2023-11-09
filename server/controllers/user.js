const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');
const url = 'mongodb+srv://rainywords:rainywordspassword@rainywords-db.g29zlts.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

async function check_user(req) {
    try {
        const database = client.db('usersDB');
        const col = database.collection('user');
        // console.log(req)

        if (!req || !req.username) {
            return { status: false, message: "Require username"}
        }

        const existing_user = await col.findOne({ name: req.username }, { projection: { _id: 0 } });

        if (existing_user) {
            return {status: true, result: existing_user}
        } else {
            const newUser = {
                name: req.username,
                id: uuidv4(),
                score: 0
            } 
        
        await col.insertOne(newUser);
        return {result: true, result: newUser};
        };
    }
    catch (error) {
        return { status: false, result: error}
    }
}

async function random_name() {
    try {
        const database = client.db('usersDB');
        const col = database.collection('random');

        const random = await col.aggregate([{ $sample: { size: 1 }}]).toArray()
        // console.log(random[0].name)
        const ans = random[0].name

        const del = await col.deleteOne({ name: ans })
        console.log(del)

        return ans
    }  
    catch (error) {
        return { status: false, result: error}
    }
}

async function add_score(req) {
    try {
        const database = client.db('usersDB');
        const col = database.collection('user');
        console.log('req', req.name, req.score)

        const existing_user = await col.findOne({ name: req.name }, { projection: { _id: 0 } });
        console.log('player', existing_user)

        if (req.score > existing_user.score) {
            const update_score = await col.updateOne(
                { "name" : req.name },
                { $set: { "score" : req.score } })

            console.log('updated', update_score)
            return { status: true, message: "Score updated successfully" };
            
        } else {
            return { status: false, message: "Not your best"}
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
            return topThree_users;
        }

    }
    catch (error) {
        return { status: false, result: error}
    }
}

module.exports = { check_user, add_score, get_top_three, random_name }