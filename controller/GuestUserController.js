/**@module controller/user */
import mongoose from 'mongoose';
import User from '../model/user.js';
import Fridge from '../model/fridge.js';
import RouteID from '../model/util/RouteID.js';
import { ObjectId } from 'mongodb';


//const newObjectId = new ObjectId();

async function readguestUser(req, res) {
    try {
        const userID = "1234";
      //  console.log("user ID in google controller",userID)
        await mongoose.connect(process.env.DB_URL).catch((err) => {throw err});
    
        /** Performs a query to the database to see if the user already
         * exists. If the user does not already exist, create a new one and store it within their
         * session data. Otherwise, do not create a new user, but still put the user data into
         * the session.
         * @var checkForDupe {User} 
         */
        const checkForDupe = await User.find({userID: {$eq: userID}}).catch((err) => {throw err});
       // console.log("check dupe",checkForDupe);
        if (checkForDupe.length === 0) {          
            const user = new User({
                name:"Guest",
                userID: userID,
                profile_pic: '',
                is_guest:true
            });
            
            await user.save().then(async (result) => {
                //For every new user, create new fridge.
                //Assigns new userID to fridge.
                const fridge = new Fridge({
                    routeID: RouteID(11),
                    owner_id: result._id
                });

                //Save fridge to DB.
                await fridge.save().then((fridgeID) => {
                    req.session.userID = user._id;
                    const profile = {
                        profile: user,
                        fridgeID: fridgeID
                    }
        //            console.log(profile);
                   // res.json(profile);
                    res.redirect(process.env.HOME_REDIRECT);
                }).catch((error) => {
       //             console.log(fridge);
                    console.error(error);
                });
            }).catch((err) => {throw err});
            
        } else {
            const user = checkForDupe[0];
            req.session.userID = user._id;
            await Fridge.findOne({owner_id: user._id}).select("routeID").exec().then((fridgeID) => {
                const profile = {
                    profile: user,
                    fridgeID: fridgeID
                }
         //       console.log(profile);
               // res.json(profile);
            }).catch((error) => {
                console.error(error);
                res.status(500).send(error);
            });
            res.redirect(process.env.HOME_REDIRECT);
        }
            
    } catch (error) {
        console.log(error);
        res.status(400);
    }
    }
        
  

export default {
    readProfile: readguestUser
}
