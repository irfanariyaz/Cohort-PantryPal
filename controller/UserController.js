/**@module controller/user */
import mongoose from 'mongoose';
import User from '../model/user.js';
import Fridge from '../model/fridge.js';

async function readUserFromSession(req, res) {
    const userID = req.session.userID;
    if(!userID){
        res.status(302).send("Not logged in");
    } else {
        await mongoose.connect(process.env.DB_URL).catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
    
        await User.find({_id: userID}).exec().then((user) => {
            res.json(user);
        }).catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
    }
}

async function readUserFridgeID(req, res) {
    const userID = req.session.userID;
    if(!userID){
        res.status(302).send("Not logged in");
    }

    await mongoose.connect(process.env.DB_URL).catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });

    await User.find({user_id: userID}).exec().catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });

    await Fridge.find({owner_id: user._id}).select('routeID').exec().then((id) => {
        res.status(200).json(id);
    }).catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });
}

export default {
    readProfile: readUserFromSession,
    readFridge: readUserFridgeID
}