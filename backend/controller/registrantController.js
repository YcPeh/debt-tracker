import asyncHandler from 'express-async-handler';
import registrantModel from '../models/Registrant.js';
import generateToken from '../utils/generateToken.js';


export const authRegistrant = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    // console.log('email')
    // console.log(email)
    const registrant = await registrantModel.findOne({email});
    // console.log('registrant')
    // console.log(registrant)
    if(registrant && (await registrant.matchPassword(password))) {
        generateToken(res,registrant._id);
        res.status(201).json({
            _id:registrant._id,
            name:registrant.name,
            email:registrant.email,
            // token:generateToken(res,registrant._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    };
});

export const registerRegistrant = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body;
    const registrantExists = await registrantModel.findOne({email});

    if (registrantExists) {
        res.status(400);
        throw new Error('Registrant already exists');
    }

    const registrant = await registrantModel.create({
        name,
        email,
        password
    });

    if(registrant) {
        generateToken(res,registrant._id);
        res.status(201).json({
            _id:registrant._id,
            name:registrant.name,
            email:registrant.email,
            // password:registrant.password,
            // token:generateToken(registrant._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid registrant data');
    };
});

export const logOutRegistrant = asyncHandler(async (req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    })
    res.status(200).json({message:'Registrant logged out'})
});

export const getRegistrantProfile = asyncHandler(async (req,res) => {
    // console.log('req.registrant')
    // console.log(req.registrant)
    const registrant = {
        _id:req.registrant._id,
        name:req.registrant.name,
        email:req.registrant.email,
        password:req.registrant.password,
    }
    res.status(200).json(registrant)
});

export const updateRegistrantProfile = asyncHandler(async (req,res) => {
    const registrant = await registrantModel.findById(req.registrant._id);
    if(registrant) {
        registrant.name = req.body.name || registrant.name;
        registrant.email = req.body.email || registrant.email;
        registrant.password = req.body.password || registrant.password;
        const updatedRegistrant = await registrant.save();
        res.status(200).json({
            _id:updatedRegistrant._id,
            name:updatedRegistrant.name,
            email:updatedRegistrant.email,
            // password:updatedRegistrant.password,
        });
    } else {
        res.status(404);
        throw new Error('Registrant not found');
    }
    
});