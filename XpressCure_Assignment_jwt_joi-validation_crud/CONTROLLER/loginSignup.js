const express = require('express')
const jwt = require('jsonwebtoken')
const knex = require('../config_DATABASE/database')
// const {genratetoken, veryfitoken} = require('../JWT/jwt')

alluserData = async (req, res) => {
    try {
        const data = await knex('Employee_data')
        res.send(data)
    }
    catch (err) {
        res.send('user not loged in ');
    }
}

insertUserData = async (req, res) => {
    try {
        const data = await knex('Employee_data').insert(req.body)
        res.send({ 'user data inserted successfully ': req.body })
    }
    catch (err) {
        res.send('user data not added;');
    }
}

loginUser = async (req, res) => {
    try {
        const { Name,Email} = req.body
        const data = await knex('Employee_data').where({ Name,Email})
        // console.log(data);
        if (data.length > 0) {
            let id = data[0].Employee_ID   // Employee_ID AUTO increments Employee_data(table)
            console.log(id);  // print id on terminal 
            const token = jwt.sign({ id: id }, "amit")  // generatetoken here
            res.cookie('token', token)
            res.send({
                'login user data': data,
                "token": token
            })
            console.log(data);
        }
        else {
            res.send('invalid email and password...')
        }
    }
    catch (error) {
        res.send(error.message)
    }
}


updateUserData = async (req, res) => {
    try {
        const id = req.id.id // find id with jwt logn user data
        // console.log(id);
        const data = await knex('Employee_data').where({Employee_ID:id}).update(req.body)
        res.send({
            'update user data successfully ': req.body,
            "user id": id
        })
        console.log({
            "user id": id, 'update user data successfully ': req.body,
        });         // updated data on terminal 
    }
    catch (error) {
        res.send(error.message)
    }
}

deleteUserData = async (req, res) => {
    try {
        const id = req.id.id  // find id with jwt login user data
        const data = await knex('Employee_data').where({ Employee_ID: id }).delete(req.body)
        res.send('user data delete ')
    }
    catch {
        res.send('user data not find...')
    }
}

logoutUserData = async (req, res) => {
    try {
        const id = req.id.id  // find id with jwt login user data
        const data = await knex('Employee_data').where({ Employee_ID: id })
        res.clearCookie('token')
        res.send({ 'you are logout': data[0]['Name'], "login user id": id })
        console.log('login user id :-', id);
    }
    catch {
        res.send('user not logout...')
    }
}


module.exports = { alluserData, insertUserData, loginUser, updateUserData, deleteUserData, logoutUserData }