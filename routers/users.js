const express = require('express');
const router = new express.Router();
const UsersModel  = require('../models/users');

router.get('/users', async(req,res)=>{
    try {
        const users = await UsersModel.find({})
        res.send(users)
    } catch (error) {
        res.send({error: true})
    }
    UsersModel.find()
})

router.post('/user', async(req, res)=>{
    try {
        const user = new UsersModel({name: req.body.name, age: req.body.age});
        let userSaved = await user.save()
        res.status(200).send({success: true, userSaved})
    } catch (error) {
        res.send({error: true, msg: error.message})
    }
})
router.patch('/user/:id', async(req, res)=>{
    try {
        let userEdited = await UsersModel.findOneAndUpdate({_id: req.params.id}, req.body)
        res.status(200).send({success: true, userEdited})
    } catch (error) {
        res.send({error: true, msg: error.message})
    }
})
router.delete('/user/:id', async(req, res)=>{
    try {
        let userDeleted = await UsersModel.findOneAndDelete({_id: req.params.id})
        res.status(200).send({success: true, userDeleted})
    } catch (error) {
        res.send({error: true, msg: error.message})
    }
})

module.exports = router;