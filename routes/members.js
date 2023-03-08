const Joi = require('joi');
const { x } = require('joi');
const express = require('express');
const app = express();

const router = express.Router();

app.use(express.json());
router.use(express.json());

const members = [
    {
        memberID:001,
        memberFirstName:'Angel',
        memberLastName:'Hopkins',
        dateJoined:'08/16/2018',
        memberBirthDate:'11/25/1987'
    },
];

//GET REQUEST

router.get('/',(req,res)=>{;
    res.render('members');
});

//POST REQUEST

router.post('/api',(req,res)=>{

    const schema = Joi.object ({
        firstName:Joi.string().min(3).required(),
        lastName:Joi.string().min(3).max(20),
        birthDate:Joi.date().min(1).max(10),
        username:Joi.string().min(4).max(15).required(),
        passcode:Joi.string().min(6).max(20).required(),
        verifyPasscode:Joi.string().min(6).max(20).required(),

        
    });

    const result = schema.validate(req.body);
    console.log(result);

    if(result.error){
        res.status(400).send(result.error);
        return;
    };
    const member = {
        memberID: members.length + 1,
        memberFirstName:req.body.firstName,
        memberLastName:req.body.lastName,
        memberBirthdate:req.body.birthDate,
        memberUsername:req.body.username,
        memberPassword:req.body.passcode,
        memberVerifyPassword:req.body.verifyPasscode,  
    };

    members.push(member);
    res.send(member);
});

//PUT REQUEST

router.put('/edit',(req,res)=>{

    const member = members.find(m => m.memberID === parseInt(req.params.id));
    if (!member) res.status(404).send('The fan with the requested ID does not exist.');

    const schema = Joi.object ({
        firstName:Joi.string().min(3).max(15).required(),
        lastName:Joi.string().min(2).max(15),
        passcode:Joi.string().min(6).max(20),
        verifyPasscode:Joi.string().min(6).max(20)
    })

    const result = schema.validate(req.body);

    if(result.error){
        res.status(400).send(result.error);
        return;
    };

    member.memberFirstName = req.body.firstName;
    member.memberLastName = req.body.lastName;
    member.passcode = req.body.memberPassword;
    member.verifyPasscode = req.body.memberVerifyPassword;

    res.send(member);
    
});

//DELETE REQUEST

router.delete('/delete',(req,res)=>{
    const deleteMember = members.find(m => m.memberID === parseInt(req.params.id));
    if (!deleteMember)res.send('A Member with the provided ID does not exist.');

    const index = members.indexOf(deleteMember);
    members.splice(index,1);

    res.send(deleteMember);
});

//SEARCH BY ID REQUEST

router.get('/profile/:id',(req,res)=>{
    if (!profile) res.status(404).send('The profile you are looking for does not exist.');
    res.send('This is the Profile page');
});

//FORM POST REQUEST

router.get('/signup',(req,res)=>{
    res.render('memberViews/member-join');
});

module.exports = router;