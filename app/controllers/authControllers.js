const db = require('../models');
const jwt = require('jsonwebtoken');
var storage = require('local-storage');
const mailer = require('../middlewares/mailer');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// Create Main Model
const User = db.user;
const Role = db.role;

const login = async (req, res) => {
    const {body} = req
    if(!body.email || !body.password) throw Error('Fill the all fields to login')
    const login_user = await User.findOne({email: body.email})
    if(!login_user || !(await bcrypt.compare(body.password, login_user.password))) throw Error('Email or password is incorect')
    if(!login_user.verification) throw Error('Check your email to active your account')
    const login_role = await Role.findById(login_user.roles)
    const token = await jwt.sign({_id: login_user._id}, process.env.TOKEN_KEY)
    storage('token', token)
    res.json({role: login_role.name, username: login_user.username, token: storage('token')})
}

const register = async (req, res) => {
    const {body} = req
    if(!body.username || !body.email || !body.password || body.password != body.cofirm_password)
        throw Error('Fill the all fields to register')
    const findEmail = await User.findOne({email: body.email})
    if(findEmail) throw Error('Email already exist')
    const hash = await bcrypt.hash(body.password, saltRounds);
    const user = await User.create({
        ...body, password: hash, roles: '637de58c1c73d7e2ef657a45', verification: false
    })
    if(user) {
        mailer.main('verify-email',body.email)
        res.json({message: 'Successfully, Check your email to active your account', email: body.email, password: body.password})
    }
    if(!user) throw Error('User not created try again')
}

const addLivreur = async (req, res) => {
    const {body} = req
    if(!body.username || !body.email || !body.password || body.password != body.confirm_password)
        throw Error('Fill the all fields to register')
    const findEmail = await User.findOne({email: body.email})
    if(findEmail) throw Error('Email already exist')
    const hash = await bcrypt.hash(body.password, saltRounds);
    const user = await User.create({
        ...body, password: hash, roles: '637de58c1c73d7e2ef657a46', verification: true
    })
    if(user) {
        mailer.main('verify-email',body.email)
        res.json({message: 'Successfully, Livreur is created.'})
    }
    if(!user) throw Error('User not created try again')
}

const verifyEmail = async (req, res) => {
    const verify_email = await jwt.verify(req.params.token, process.env.TOKEN_KEY)
    const verify_user = await User.findOne({email: verify_email.email})
    if(verify_user.verification == true) 
        res.redirect('http://localhost:3000/login')
        // throw Error('Your account is already actived')
    const verification_email = await User.updateOne({email: verify_email.email}, {$set: {verification: true}})
    if(verification_email) res.redirect('http://localhost:3000/login')
    if(!verification_email) throw Error("You can't to active your account")
}

const resetPassword = async (req, res) => {
    const {body} = req
    if(!body.last_password || !body.new_password || body.confirm_new_password != body.new_password)
        throw Error('Fill the all fields to reset your password')
    const token_reset = storage('token');
    const user_reset = await jwt.verify(token_reset, process.env.TOKEN_KEY)
    const find_user_reset = await User.findById(user_reset._id)
    const verify_last_password = await bcrypt.compare(body.last_password, find_user_reset.password)
    if(!verify_last_password) throw Error('Your password is incorrect')
    const hash_new_password = await bcrypt.hash(body.new_password, saltRounds)
    const update_reset_password = await User.updateOne({_id: find_user_reset._id}, {$set: {password: hash_new_password}})
    res.send('Your password is changed')
}

const forgetPassword = async (req, res) => {
    const email = req.body.email
    if(!email) throw Error('Enter your email')
    const forget_password_email = await User.findOne({email: email})
    if(!forget_password_email) throw Error('User not found')
    mailer.main('verify-forget-password', email)
    res.json({message: 'Check your email'})
}

const verifyForgetPassword = async (req, res) => {
    const token = req.params.token
    const verify_token = await jwt.verify(token, process.env.TOKEN_KEY)
    const verify_token_email = await User.findOne({email: verify_token.email})
    const new_token = await jwt.sign({id: verify_token_email._id}, process.env.TOKEN_KEY)
    storage('new_token', new_token)
    res.redirect('http://localhost:3000/form-forget-password')
}

const formForgetPassword = async (req, res) => {
    const {body} = req
    if(!body.password || body.password != body.cofirm_password)
        throw Error('Fill the all fields to Change your password')
    const verify_form_token = await jwt.verify(storage('new_token'), process.env.TOKEN_KEY)
    const find_forget_user = await User.findById(verify_form_token.id)
    if(!find_forget_user) Error('Error, User not found, replay to check your email')
    const hash_forget_password = await bcrypt.hash(body.password, saltRounds)
    const update_forget_password = await User.updateOne({_id: find_forget_user._id}, {$set: {password: hash_forget_password}})
    res.json({message: 'Your password is changed'})
}

const logout = async (req, res) => {
    storage.clear();
    res.send('You are logout')
}

module.exports = {
    login,
    register,
    addLivreur,
    verifyEmail,
    resetPassword,
    forgetPassword,
    verifyForgetPassword,
    formForgetPassword,
    logout
}