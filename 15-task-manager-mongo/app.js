var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
const dbConnection = require('./utils/dbUtils');
const { checkToken, generateToken } = require('./middlewares/auth');

var app = express();


module.exports = async function (){
  //wait for the db connection to be established
  await dbConnection.connect();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');


  app.use(logger('combined'));


  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  //check whether the user is logged in or not

  app.post('/login', generateToken)
  app.use(checkToken)   //extracts the userinfo from the token and adds it to req.decoded
  
  app.use('/users', (req, res, next )=>{
    //authorization logic goes here
    const userName = req.decoded.username;
    if (userName === 'admin'){
      res.send(403).json({
          success: false,
          message: 'Not authorized'
        });
    } else {
      next();
    }
  }, usersRouter);

  app.use('/tasks', tasksRouter);
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

  return app;
}



