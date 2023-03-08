const Joi = require('joi');
const { x } = require('joi');
const express = require('express');
const app = express();

const router = express.Router();

app.use(express.json());
router.use(express.json());

router.get('/',(req,res)=>{
    res.render('view-song');
});

module.exports = router;