const Joi = require('joi');
const { x } = require('joi');
const express = require('express');
const app = express();

const router = express.Router();

app.use(express.json());
router.use(express.json());

const admins=[
    {
        adminID:001,
        adminFirstName:'Angel',
        adminLastName:'Hopkins',
        adminAccessLevel:'Platinum',
        adminJoinDate:'11/25/2003'},

];

//GET REQUEST

router.get('/',(req,res)=>{
    res.render('admin',{admin:admin});
});

//POST REQUEST

router.post('/add',(req,res)=>{
    
    const schema = Joi.object ({
        firstName:Joi.string().min(3).required(),
        lastName:Joi.string().min(3).required(),
        accessLevel:Joi.string().min(4).required(),
        joinDate:Joi.string().min(6).max(10),
    });

    const result = schema.validate(req.body);
    console.log(result);

    if(result.error){
        res.status(400).send(result.error);
        return;
    };

    const admin = {
        adminID: admins.length + 1,
        adminfisrtName:req.body.firstName,
        adminLastName:req.body.lastName,
        adminAccessLevel:req.bosy.accessLevel,
        adminJoinDate:req.body.joinDate
    };

    admins.push(admin);
    res.send(admin);
});

//PUT REQUEST

router.put('/edit',(req,res)=>{

    const admin = admins.find(a => a.adminID === parseInt(req.params.id));
    if (!admin) res.status(404).send('The Admin with the requested ID was not found.');

    const schema = Joi.object ({
        firstName:Joi.string().min(3).required(),
        lastName:Joi.string().min(3).max(15).required(),
        accessLevel:Joi.string().min(3).max(20).required(),
        joinDate:Joi.string().min(6).max(8).required(),
    });

    const result = schema.validate(req.body);

    if (result.error){
        res.status(400).send(result.error);
        return;
    };

    admin.adminFirstName = req.body.firstName;
    admin.adminLastName = req.body.lastName;
    admin.adminAccessLevel = req.body.accessLevel;
    admin.adminJoinDate = req.body.joinDate;

    res.send(admin);

});

//DELETE REQUEST

router.delete('/delete',(req,res)=>{
    const deleteAdmin = admins.find(a => a.adminID === parseInt(req.params.id));
    if (!deleteAdmin)res.send('An Admin with the provided ID does not exist.');

    const index = admins.indexOf(deleteAdmin);
    admins.splice(index,1);

    res.send(deleteAdmin);
});

//NEW ADMIN GET REQUEST

router.get('/newAdmin',(req,res)=>{
    res.render('admins/admin-join');
});

module.exports = router;