const express = require("express")
const {genratetoken, veryfitoken} = require('../JWT/jwt')
const {alluserData, insertUserData, loginUser, updateUserData, deleteUserData, logoutUserData} = require("../CONTROLLER/loginSignup");
const {signup_Validation,login_Validation} = require("../Validation");

const router =express.Router();

router.get('/alldata', alluserData)     // all user data show
router.post('/signup',signup_Validation,insertUserData)   // signup user 
router.get('/login',login_Validation, loginUser)         // login user 
router.put('/update',veryfitoken, updateUserData)   // update current login user data 
router.delete('/delete',veryfitoken,deleteUserData) // delete currnent login user data 
router.get('/logout',veryfitoken, logoutUserData)   // logout current login user data

module.exports =router