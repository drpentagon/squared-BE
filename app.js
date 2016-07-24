var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var ScoreHandler = require('./app/midleware/score');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/test');

var port = process.env.PORT || 8080;
var router = express.Router();

router.use((req, res, next) => {
    next();
});


BestTotal = new ScoreHandler('total');
router.route('/level/:level/score/total/')
  .get((req, res) => {
    const level = req.params.level;
    BestTotal.get(level, res);
  })
  .post((req, res) => {
    const level = req.params.level;
    const user = req.body.user;
    const points = req.body.points;
    BestTotal.post(level, user, points, res);
  });

BestTime = new ScoreHandler('time');
router.route('/level/:level/score/time/')
  .get((req, res) => {
    const level = req.params.level;
    BestTime.get(level, res);
  })
  .post((req, res) => {
    const level = req.params.level;
    const user = req.body.user;
    const points = req.body.points;
    BestTime.post(level, user, points, res);
  });

BestBounces = new ScoreHandler('bounces');
router.route('/level/:level/score/time/')
  .get((req, res) => {
    const level = req.params.level;
    BestBounces.get(level, res);
  })
  .post((req, res) => {
    const level = req.params.level;
    const user = req.body.user;
    const points = req.body.points;
    BestBounces.post(level, user, points, res);
  });

BestRedirects = new ScoreHandler('redirects');
router.route('/level/:level/score/time/')
  .get((req, res) => {
    const level = req.params.level;
    BestRedirects.get(level, res);
  })
  .post((req, res) => {
    const level = req.params.level;
    const user = req.body.user;
    const points = req.body.points;
    BestRedirects.post(level, user, points, res);
  });


app.use('/api', router);
app.listen(port, () => console.log('Square server running on port ' + port));

/*
      mongoose.connection.close();

router.route('/bears')
  .post((req, res) => {
    var bear = new Bear();

    for(const param in req.body) {
      bear[param] = req.body[param];
    }

    bear.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Bear created!' });

    });
  })

  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err);

      res.json(bears);
    });
  });

router.route('/bears/:bear_id')
    .get(function(req, res) {
      Bear.findById(req.params.bear_id, function(err, bear) {
        if (err)
          res.send(err);
        res.json(bear);
      });
    })

  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);

      bear.name = req.body.name;
      bear.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Bear updated!' });
      });
    });
  })

  .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });
  */

//UXJ-M9v-xsa-Qnm
//
