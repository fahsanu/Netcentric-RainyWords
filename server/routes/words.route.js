const route = require('express').Router();
const { get_easy_words, get_medium_words, get_hard_words } = require("../controllers/words");

route.get('/easy', async (req, res) => {
    try {
        const _out = await get_easy_words();
        console.log(_out)
        return res.json(_out);
    } catch(error) {
        return res.json(error);
    }
})

route.get('/medium', async (req, res) => {
    try {
        const _out = await get_medium_words();
        console.log(_out)
        return res.json(_out);
    } catch(error) {
        return res.json(error);
    }
})

route.get('/hard', async (req, res) => {
    try {
        const _out = await get_hard_words();
        console.log(_out)
        return res.json(_out);
    } catch(error) {
        return res.json(error);
    }
})

module.exports = route;