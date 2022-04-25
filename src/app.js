var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');

//Swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Voice recorder API",
      version: "1.0.0",
      description:"Welcome to my voice recorder service! you can record a voice mail, then set a title and a addressee and save it. Also you can see a list of all the records you've saved, edit their title and delete them. Check out the list below to test any endpoint."
    },
    servers:[
      {
        url:`http://localhost:${process.env.PORT || '3000'}`
      }
      
    ]
  },
  apis: [`${path.join(__dirname,"./routes/*.js")}`]
};

var viewsRouter = require('./routes/viewsRouter');
let recordsRouter = require('./routes/recordsRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', viewsRouter);
app.use('/api/v1/records', recordsRouter);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerConfig)));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
