/**
 * Module dependencies.
 */
var
  versionator = require('versionator'),
  express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  app = express();

/**
 * Config
 */
app.VERSION = '0.1';
app.ROOT = __dirname;
app.configure(function () {
  basic = versionator.createBasic('v' + app.VERSION);
  app.locals({ versionPath: basic.versionPath });
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('less-middleware')({
    compress: true,
    debug: false,
    force: true,
    once: true,
    prefix: '/stylesheets',
    src: __dirname + '/less',
    dest: __dirname + '/public/stylesheets/'
  }));
  app.use(app.router);
  app.use(express.compress());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * Routes
 */
app.get('/', routes.index);

/**
 * Server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});