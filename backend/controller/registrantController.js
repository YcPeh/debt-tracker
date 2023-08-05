import asyncHandler from 'express-async-handler';

export const authRegistrant = asyncHandler(async (req,res) => {
    // res.status(401);
    // throw new Error('Not Authorized');
    res.status(200).json({message:'Auth registrant'})
});

export const registerRegistrant = asyncHandler(async (req,res) => {
    res.status(200).json({message:'Register registrant'})
});
export const logOutRegistrant = asyncHandler(async (req,res) => {
    res.status(200).json({message:'Logout registrant'})
});
export const getRegistrantProfile = asyncHandler(async (req,res) => {
    res.status(200).json({message:'Registrant profile'})
});
export const updateRegistrantProfile = asyncHandler(async (req,res) => {
    res.status(200).json({message:'Update registrant profile'})
});