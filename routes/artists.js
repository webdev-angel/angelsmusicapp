const Joi = require('joi');
const { x } = require('joi');
const express = require('express');
const app = express();

const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage ({
    destination: (req, file, cb) =>{
        cb(null, './uploads/');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) =>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

const upload = multer({
    fileFilter: fileFilter,
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5}
});

const Artist = require('./../models/artist');
const { Router } = require('express');
app.use(express.json());
router.use(express.json());

//GET REQUESTS ARE AS FOLLOWS
//ROOT GET REQUEST
router.get('/', async(req,res)=>{
    res.render('artists');
});
//NEWLY CREATED ARTIST GET REQUEST
router.get('/new', async (req,res) =>{
    res.render('artists/new', {artist: new Artist()});
});
//SAVED ARTIST GET REQUEST
router.get('/:id', async(req,res) =>{
    const artist = await Artist.findById(req.params.id)
    if(!artist) res.redirect('/')
    res.render('artists/show',{artist:artist})
})

//POST REQUEST
router.post('/',upload.single('artistImage'), async (req,res)=>{
    let artist= new Artist ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        stageName:req.body.stageName,
        genre:req.body.genre,
        albums:req.body.albums,
        label:req.body.label,
        followers:req.body.followers,
        fans:req.body.fans,
        memberSince:req.body.memberSince,
        artistImage: req.file.path,
    }) 
    try {
        artist = await artist.save();
        res.redirect(`/artists/${artist.id}`)
    }
    catch (e){
        console.log(e)
        res.render('artists/new', {artist:artist})
    }
}),


//PUT REQUEST

router.put('/:id',(req,res)=>{

    const artist = artists.find(a => a.artistid === parseInt(req.params.id));
    if (!artist) res.status(404).send('The artist with the requested ID was not found.');

    const schema = Joi.object({
        firstName:Joi.string().min(3).max(15).required(),
        lastName:Joi.string().min(3).max(15).required(),
        stageName:Joi.string().min(3).max(15),
        genre:Joi.string().min(3).max(15),
        albums:Joi.array(),
        label:Joi.string().min(3).max(20),
        //RADIO BUTTON?!?!?!?!
        followers:Joi.number().min(1).max(10),
        fans:Joi.number().min(1).max(10),
    });
    const result = schema.validate(req.body);

    if (result.error){
        res.status(400).send(result.error);
        return;
    };

    artist.artistFirstName = req.body.firstName;
    artist.artistLastName = req.body.lastName;
    artist.artistStageName = req.body.stageName;
    artist.primaryGenre = req.body.genre;
    artist.artistAlbums = req.body.albums;
    artist.artistLabel = req.body.label;
    //RADIO BUTTONS!?!?!?!
    artist.artistFollowers = req.body.followers;
    artist.artistFans = req.body.fans;

    res.send(artist);

});

//DELETE REQUEST

router.delete('/api/delete',(req,res)=>{
    const deleteArtist = artists.find(a => a.artistid === parseInt(req.params.id));
    if (!deleteArtist)res.send('An artist with the provided ID does not exist.');

    const index = artists.indexOf(deleteArtist);
    artists.splice(index,1);

    res.send(deleteArtist);
});

module.exports = router;