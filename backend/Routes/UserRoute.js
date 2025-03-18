import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/UserSchema.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import Blacklist from '../models/BlackListedSchema.js';

const router = express.Router();
const saltRounds = 10;


//Route for Register New User
router.post('/register', async (req,res)=>{
    const {username, email, password} = req.body;
    try{
        // Check if email already exists
        const emailExist = await User.findOne({email});
        if(emailExist){
            return res.status(400).json({message:'Email already exist try login'});
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create and save the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'New user added' });

    }catch(error){
        console.error('Error registering user', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});


//Route For Loging in existing uaer
router.post('/login',async (req,res) =>{
    const { email, password } = req.body;
    try{
        //check if the user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'User Does not exist'});
        }
        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        //generate access token
        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_AUTH || 'defaultSecret',
            { expiresIn: '1d' }
        );
        res.status(200).json({
            message: 'Logged in successfully',
            token: accessToken,
            user: { id: user._id, username: user.username, email: user.email },
        });
    }catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});


//Route for Logging out existing user
router.post('/logout', passport.authenticate('jwt', {session:false}), async (req,res)=>{
    const token = req.headers.authorization?.split(' ')[1]; // extract the bearer token
    if(!token){
        return res.status(400).json({message: 'No token provided'});
    }
    try{
        //save the token to the blacklist
        await Blacklist.create({token});
        res.status(200).json({ message: 'Logged out successfully' });
    }catch(error){
        console.error('Eror during logout', error);
        res.status(500).json({ message: 'An error occurred during logout' });
    }
})

export default router;