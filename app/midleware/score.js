var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ScoreSchema   = new Schema({
    level: String,
    user: String,
    val: Number,
  });


const Time = mongoose.model('BestTime', ScoreSchema);
const Bounces = mongoose.model('BestBounces', ScoreSchema);
const Redirects = mongoose.model('BestRedirects', ScoreSchema);
const Total = mongoose.model('BestTotal', ScoreSchema);

class ScoreHandler {
  constructor(type_) {
    this.type = type_.toLowerCase();
  }

  getModel() {
    switch(this.type) {
      case 'time':
        return Time;
      case 'bounces':
        return Bounces;
      case 'redirects':
        return Redirects;
      default:
        return Total;
    }
  }

  getNewObject() {
    switch(this.type) {
      case 'time':
        return new Time();
      case 'bounces':
        return new Bounces();
      case 'redirects':
        return new Redirects();
      default:
        return new Total();
    }
  }



  get(level, res) {
    this.getLevelHighScores(level, (err, scores) => {
        if (err)
          res.send(err);

        if(scores.length === 0) {
          res.json({ message: 'no score found'});
        } else {
          res.json(scores);
        }
      });
  }

  post(level, user, val, res) {
    this.getScore(level, user, (err, score) => {
      if (err)
        res.send(err);

      if(score === null) {
        this.addScore(level, user, val, (err) => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'score added', updated: true });
        });
      } else if(score.val < val) {
        this.updateScore(score, val, (err) => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'new highscore', updated: true });
        });
      }
      else {
        res.json({ message: 'nothing updated', updated: false });
      }
    });
  }

  getLevelHighScores(level, callback) {
    this.getModel().find({'level' : level}).
      limit(10).
      sort({val: -1}).
      select({user:1, val:1}).
      exec(callback);
  }

  getScore(level, user, callback) {
      this.getModel().findOne({'level': level, 'user': user}, 'val', callback);
  }

  addScore(level, user, val, callback) {
    var score = this.getNewObject();
    score.level = level;
    score.user = user;
    score.val = val;

    score.save(callback);
  }

  updateScore(score, val, callback) {
    score.val = val;
    score.save(callback);
  }
}

module.exports = ScoreHandler;
