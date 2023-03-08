const Joi = require('joi');
const { x } = require('joi');
const express = require('express');
const app = express();

const multer = require('multer');

const router = express.Router();
const Album = require('./../models/album');

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

const { Router } = require('express');
app.use(express.json());
router.use(express.json());

//GET REQUESTS ARE AS FOLLOWS
//ROOT GET REQUEST
router.get('/', async(req,res)=>{
    const albums= await Album.find();
    res.render('albums', {albums:albums});
});

//NEWLY CREATED ALBUM GET REQUEST
router.get('/new', async (req,res) =>{
    res.render('albums/new', {album: new Album()});
});

//EDIT GET REQUEST
router.get('/edit/:id', async(req,res)=>{
    const album = await Album.findById(req.params.id)
    res.render('albums/edit', {album:album});
});

//SAVED ALBUM GET REQUEST
router.get('/:id', async(req,res) =>{
    const album = await Album.findById(req.params.id)
    if(!album) res.redirect('/')
    res.render('albums/show',{album:album})
});

//POST REQUEST
router.post('/',upload.single('albumImage'), async (req,res)=>{
    let album= new Album ({
        albumTitle: req.body.albumTitle,
        artistName: req.body.artistName,
        albumImage: req.file.path,
        albumLabel: req.body.albumLabel,
    })
    try {
        album = await album.save();
        res.redirect(`/albums/${album.id}`);
    }
    catch (e){
        console.log(e)
        res.render('albums/new', {album:album})
    }    
});   

//PUT REQUEST
router.put('/:id', upload.single('albumImage'), async (req,res, next)=>{
    req.album = await Album.findById(req.params.id);
    if(!req.album)
    console.log("Cannot locate the requested album.");
    console.log(`The requested album has been located. ${req.album}.`);
    next()
}, saveAlbumAndRedirect('edit'));

//DELETE REQUEST
router.delete('/:id', async(req,res)=>{
    await Album.findByIdAndDelete(req.params.id)
    res.render('albums/delete')
});

//SAVE AND REDIRECT FUNCTION
function saveAlbumAndRedirect(path) {
    return async(req, res)=>{
        let album = req.album;
        album.albumTitle=req.body.albumTitle,
        album.artistName=req.body.artistName,
        album.albumImage=req.file.path,
        album.albumLabel=req.body.albumLabel
        
        try {
            album = await album.save();
            res.redirect(`/albums/${album.id}`)
        } catch (e){
            console.log(e)
            res.render(`albums/${path}`, {album:req.album})
        }
    }
}

module.exports = router;