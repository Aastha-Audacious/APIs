const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;
// const http = require('http');
// const app= require('./app')
// const server = http.createServer(app);

const donarRoute = require('./api/routes/donar');
const userRoute = require('./api/routes/user');


mongoose.connect('mongodb+srv://aasthapanwar0710:aastha07@merncluster.yba4x6w.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.on('error', err=>{
    console.log(`connection failed`);
});

mongoose.connection.on('connected', connected=>{
    console.log(`connected with database...`);
});
//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/donar', donarRoute);
app.use('/user', userRoute);

app.use((req, res)=>{
    res.status(404).json({
        error: `bad request`
    })
})

// post listing
app.listen(port, console.log("server is running"));

module.exports= app;