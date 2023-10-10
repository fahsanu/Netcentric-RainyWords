const route = require('express').Router();
const { check_user, add_score, get_top_five } = require('../controllers/user');

route.post('/check', async (req, res) => {
    try {
        const _out = await check_user(req.body);
        console.log(_out)
        return res.json(_out);
    } catch(error) {
        return res.json({ status: false, message: "error" });
    }
})

route.put('/add_score', async (req, res) => {
    try {
        const _out = await add_score(req.body);
        console.log(_out)
        return res.json(_out);
    } catch(error) {
        return res.json({ status: false, message: "error" })
    }
})

route.get('/top_five', async (req, res) => {
    try {
        const _out = await get_top_five();
        console.log(_out)
        return res.json(_out);
    } catch(error) {
        return res.json({ status: false, message: "error" });
    }
})

module.exports = route;