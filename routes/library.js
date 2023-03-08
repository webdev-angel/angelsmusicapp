const Joi = require('joi');
const { x } = require('joi');
const express = require('express');
const app = express();

const router = express.Router();

app.use(express.json());
router.use(express.json());

router.get('/',(req,res)=>{
    //res.send('This is the Library Page');
    res.render('library');
});

router.post('/api',(req,res)=>{
    res.send('This is the Add to Library page');
});

router.delete('/delete',(req,res)=>{
    res.send('This is the Delete Library Item page');
});

module.exports = router;