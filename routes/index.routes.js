const express = require('express');
const { showHome } = require('../controllers/index.controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({success: true, msg: 'Api working fine'});
});

router.get('/home', auth, showHome);
module.exports = router;