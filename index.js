var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

let port = process.env.PORT || 3000

app.use(require('./router.js'))

app.listen(port, (err)=>{
    if(err) console.log(err);
    else console.log(`Connected success with port: ${port}`);
})