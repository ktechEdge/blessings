
var express = require('express');
const dotenv = require('dotenv');
var path = require('path');
const morgan = require('morgan');
dotenv.config();
var database = require('../database');
 const port = 5656;

var app = express();

app.use(express.json());
app.use(morgan('dev'));
const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath));


const viewsPath = path.join(__dirname, "../views");
app.set("views", viewsPath)

// app.set('src', path.join(__dirname, 'views'));


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Server is running on 
  http://localhost:${port}`)
})

global.UID      =require("../gen_params").UID      ;
global.UN       =require("../gen_params").UN       ;
global.FROM     =require("../gen_params").FROM     ;
global.HOST     =require("../gen_params").HOST     ;
global.USER     =require("../gen_params").USER     ;
global.PASSWORD =require("../gen_params").PASSWORD ;
global.DATABASE =require("../gen_params").DATABASE ;
global.USER2    =require("../gen_params").USER2    ;
global.DATABASE2=require("../gen_params").DATABASE2;


var indexRouter = require('../routes/index');
app.use('/', indexRouter);

var blessingdataRouter = require('../routes/blessing_data');
app.use('/blessing_data', blessingdataRouter);


var blessingdetailsRouter = require('../routes/blessing_details');
app.use('/blessing_details', blessingdetailsRouter);

const managed_video_R = require('../routes/managed_video_R');
app.use('/managed_video', managed_video_R);









module.exports = app;
