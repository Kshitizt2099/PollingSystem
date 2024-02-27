const express = require('express');
const app = express();
const db = require('./config/config');

app.use(express.urlencoded());
app.set("view engine","ejs");
app.set("views",'./view')

app.use(require('./routes/routes'))

app.listen(8000, (err)=>{
    if(err){
        console.log("Error Connecting to Server!");
        return
    }

    console.log("Successfully Connected to Server! 8000");
})