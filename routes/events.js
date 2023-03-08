const Joi = require('joi');
const { x } = require('joi');
const express = require('express');
const app = express();

const router = express.Router();

app.use(express.json());
router.use(express.json());

const events=[
    {eventID:001,eventName:'Presentation by Angel',eventDate:'06/26/2022',eventHost:'Angel Hopkins',eventTime:'12:00pm',eventVenue:'Mall C, Downtown Cleveland'},


]

//GET REQUEST

router.get('/',(req,res)=>{
    res.render('events');
});

//POST REQUEST

router.post('/api',(req,res)=>{

    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        date:Joi.date().min(6).max(10).required(),
        host:Joi.string().min(3).max(30).required(),
        venue:Joi.string().min(3).max(20),
        time:Joi.time()
    });

    const result = schema.validate(req.body);
    console.log(result);

    if (result.error){
        res.status(400).send(result.error);
    };

    const event ={
        eventid:events.length + 1,
        eventName:req.body.name,
        eventDate:req.body.date,
        eventHost:req.body.host,
        eventVenue:req.body.venue,
        eventTime:req.body.time
    }; 
    
    events.push(event);
    res.send(event);
});


//PUT REQUEST

router.put('/edit',(req,res)=>{
    
    const event = events.find(e => e.eventID === parseInt(req.params.id));
    if (!event) res.status(404).send('The evnet with the requested ID was not found.');

    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        date:Joi.date().min(6).max(10).required(),
        host:Joi.string().min(3).max(30).required(),
        venue:Joi.string().min(3).max(20),
        time:Joi.time()
    });
    const result = schema.validate(req.body);

    if (result.error){
        res.status(400).send(result.error);
        return;
    };

    event.eventName = req.body.name;
    event.eventDate = req.body.date;
    event.eventHost = req.body.host;
    event.eventVenue = req.bosy.venue;
    event.eventTime = req.body.time;

    res.send(event);

});

//DELETE REQUEST

router.get('/delete',(req,res)=>{
    const deleteEvent = events.find(e => e.eventID === parseInt(req.params.id));
    if (!deleteEvent)res.send('An event with the provided ID does not exist.');

    const index = events.indexOf(deleteEvent);
    events.splice(index,1);

    res.send(deleteEvent)
   
});

//FORM POST REQUEST 
router.get('/add',(req,res)=>{
    res.render('events/event-add');
});

module.exports = router;