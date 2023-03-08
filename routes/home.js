const { urlencoded } = require('express');
const Joi = require('joi');
const { x } = require('joi');
const express = require('express');
const app = express();

const router = express.Router();

app.use(express.json());
router.use(express.json());
//TESTING
app.use(express.urlencoded({ extended: true }))

//ALBUM API MODEL
const Album = require('./../models/album');
const { find } = require('./../models/album');
//ROOT GET REQUEST
router.get('/', async(req,res)=>{
    const albums = await Album.find()
    res.render('index',{albums:albums});
});
//LOGIN GET REQUEST
router.get('/login', async(req,res)=>{
    res.render('logins/member-login');
});

//SEARCH GET REQUEST



//FORM GET REQUEST

router.get('/signup', async(req,res)=>{
    res.render('members/member-join');
});

//GET ALL ARTISTS REQUEST
router.get('/api/artists', async(req,res)=>{
    Artist.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

router.get('/artistView', async(req,res)=>{
    res.render('artistView');
});

router.get('/albumView', async(req,res)=>{
    res.render('albumView');
});

module.exports = router;