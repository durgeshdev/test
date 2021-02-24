const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
const slug = require('slug');
const moment = require('moment')
const _ = require('lodash')
const HttpStatus = require('http-status-codes');


const UserModel = mongoose.model('User');


module.exports = {
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser,
    userById
}

async function getUsers(req, res) {
    let conditions = {};
    let result = await UserModel.find(conditions, null, {})

    let total = await UserModel.countDocuments(conditions);
    return res.json({
        data: result,
        total: total
    });

}

async function createUser(req, res) {
    let inputData = req.body;

    let record = new UserModel(inputData);
    await record.save();

    return res.status(HttpStatus.CREATED).json({message: 'User created successfully', data: record});
}

async function updateUser(req, res) {
    let id = req.params.id;
    const data = req.body;
    
    let conditions = {
        _id: id
    }

    let info = await UserModel.findOneAndUpdate(conditions, data);

    if (info) {
        return res.status(HttpStatus.OK).json({message: 'Classified updated successfully'});
    }

    return res.status(HttpStatus.NOT_FOUND).json({message: 'Classified not found'});
}

async function deleteUser(req, res){
    let id = req.params.id;

    let userInfo = await UserModel.findByIdAndRemove(id);
    if(!userInfo){
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({message: 'User not found'});
    }
    return res.status(HttpStatus.ACCEPTED).json({message: 'User delete successfully'});
}

async function userById(req, res) {
    let id = req.params.id;
    
    let conditions = {
        _id: id
    }

    let info = await UserModel.findOne(conditions);

    if (info) {
        return res.status(HttpStatus.OK).json({data: info});
    }

    return res.status(HttpStatus.NOT_FOUND).json({message: 'Classified not found'});
}