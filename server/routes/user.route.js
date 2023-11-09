const route = require('express').Router();
const { check_user, add_score, get_top_three, random_name } = require('../controllers/user');

route.post('/check', async (req, res) => {
    try {
        const _out = await check_user(req.body);
        // console.log(_out)
        return res.json(_out);
    } catch(error) {
        return res.json({ status: false, message: "error" });
    }
})

route.put('/add_score', async (req, res) => {
    try {
        console.log(req.body)
        const _out = await add_score(req.body);
        console.log('out', _out)
        return res.json(_out);
    } catch(error) {
        return res.json({ status: false, message: "error" })
    }
})

route.get('/random', async (req, res) => {
    try {
        const _out = await random_name();
        // console.log(_out)
        return res.json(_out);
    } catch(error) {
        return res.json({ status: false, message: "error" })
    }
})

route.get('/top_three', async (req, res) => {
    try {
        const _out = await get_top_three();
        // console.log(_out)
        return res.status(200).json(_out);
    } catch(error) {
        return res.json({ status: false, message: "error" });
    }
})

module.exports = route;