const route = require('express').Router();
const { check_user } = require('../controllers/user');

route.post('/check', async (req, res) => {
    try {
        const _out = await check_user(req.body);
        console.log(_out)
        return res.json(_out);
    } catch(error) {
        return res.json(error);
    }
})

module.exports = route;