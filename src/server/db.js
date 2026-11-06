// so can i read if a user is on the db and can i save that user on the users pc ?

import mongoose from "mongoose";

export async function connectDb(){
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected successfully");
    }catch(error){
        console.log("error"+ " " + error.message)
        throw error;
    }
    
}
