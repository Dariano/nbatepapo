var express = require('express')
  , cfg = require('./config.json')
  , load = require('express-load')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , methodOverride = require('method-override')
  , error = require('./middlewares/error')
  , expressSession = require('express-session')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , cookie = cookieParser(cfg.SECRET)
  , store = new expressSession.MemoryStore();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(expressSession({
  secret: cfg.SECRET,
  name: cfg.KEY,
  resave: true,
  saveUninitialized: true,
  store: store
}));

io.set('authorization', function (data, accept) {
  cookie(data, {}, function (err) {
    var sessionId = data.signedCookies[cfg.Key];
    console.log(sessionId);
    store.get(sessionId, function (err, session) {
      if (err || !session) {
        accept(null, false);
      } else {
        data.session = session;
        accept(null, true);
      }
    });
  });
});

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

load('sockets')
  .into(io);

app.use(error.notFound);
//app.use(error.serverError);

server.listen(3000, function () {
  console.log("NBatePapo no ar.");
});


