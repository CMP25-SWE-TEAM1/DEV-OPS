 


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
    res.send(`<html>
    <head>
      <style>
        @keyframes buttonAnimation {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #BFEFFF;
        }

        button {
          animation: buttonAnimation 2s infinite;
          padding: 20px 40px;
          font-size: 24px;
          color: white;
          background: linear-gradient(to bottom right, #2980b9, #3498db);
          border: none;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }

        button:hover {
          transform: scale(1.05);
          transition: transform 0.2s ease-in-out;
        }

        p {
          font-size: 48px;
          opacity: 0;
          animation: fadeIn 1s forwards;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      </style>
    </head>
    <body>
      <button onclick="showMessage()" id="button">
        Click here if you are manly enough
      </button>
      <script>
        function showMessage() {
          const button = document.getElementById('button');
          button.style.display = 'none';

          const message = document.createElement('p');
          message.textContent = 'You are beautiful';
          document.body.appendChild(message);
        }
      </script>
    </body>
  </html>`)
})


app.get('/data',async (req,res)=>{
    const Product= await redisClient.get("Product")
    res.send(`<h1>Hello there : test!</h1>  <h2> ${Product}</h2>`)
})

app.listen(PORT,()=>console.log('Weve made it on port: %d!!',PORT));


 