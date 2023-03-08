const Joi = require('joi');
const { x } = require('joi');
const express = require('express');
const app = express();

const router = express.Router();

app.use(express.json());
router.use(express.json());

router.get('/',(req,res)=>{
    //res.send('This is the Underground Page');
    res.render('underground');
});

/*
router.put('/edit',(req,res)=>{
    //res.send('This is the Edit Underground Music page');
});

router.post('/add',(req,res)=>{
    //res.send('This is the Add Underground Music page');
});

router.delete('/delete',(req,res)=>{
    //res.send('This is the Delete Underground Music page');
});
*/
module.exports = router;