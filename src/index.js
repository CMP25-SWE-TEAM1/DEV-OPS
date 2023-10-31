 


const express = require("express");
const redis = require("redis");
const { default: mongoose, connect } = require("mongoose");

//init app
const PORT = process.env.PORT || 5500;
const app = express();


const DB_USERNAME='root'
const DB_PASSWORD='example'
const DB_HOST='mongo-app'
const DB_PORT='27017'
const URI=`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
console.log(URI)
mongoose.connect(URI)
.then(()=>console.log("Successfuly connected!"))
.catch((err)=>console.log("Failed to connect! : ",err));

const REDIS_PORT=6379
const REDIS_HOST='redis-app'
const redisClient=redis.createClient({url:`redis://${REDIS_HOST}:${REDIS_PORT}`})
redisClient.connect().then(()=>console.log("Success with Redis")).catch((err)=>console.log("Error with redis: ",err));


app.get('/',(req,res)=>{
    redisClient.set("Product","NginX")
    res.send("<h1>Hello there : hola    !</h1>")
})


app.get('/data',async (req,res)=>{
    const Product= await redisClient.get("Product")
    res.send(`<h1>Hello there : test!</h1>  <h2> ${Product}</h2>`)
})

app.listen(PORT,()=>console.log('Weve made it on port: %d!!',PORT));


 