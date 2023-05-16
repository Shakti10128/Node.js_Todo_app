import mongoose from 'mongoose';

// connecting mongoose
export const connectDB = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
    dbName:"BackendAPI"
}).then((c)=>{
    console.log(`database connected with ${c.connection.host}`);
}).catch((err)=>{
    console.log("Eroor Occur",err);
})
}

