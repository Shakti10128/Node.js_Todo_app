import { app } from "./app.js";
import { connectDB } from "./database/database.js";

// connectDB is function which we'r calling
connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`server is working on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})