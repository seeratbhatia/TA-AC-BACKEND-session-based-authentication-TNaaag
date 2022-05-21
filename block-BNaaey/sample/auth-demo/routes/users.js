var express = require('express');
var router = express.Router();
var User = require('../models/User')


router.get('/', function (req, res, next) {
  res.send('response with a resource');
});


router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err)
    res.redirect('/users/login')
  })
})


router.get('/login', (req, res) => {
  res.render('login')
})


router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.redirect('/users/login');
  }
    User.findOne({ email }, (err, user) => {
      console.log(req.body, user);
      if (err) return next(err);
      if (!user) {
        return res.redirect('/users/login')
      }
        user.varifyPassword(password, (err, result) => {
          if (err) return next(err);
          if (!result) {
            return res.redirect('/users/login')
          }
          req.session.userId = user.id;
          res.redirect('/dashboard')
        })
      })
    })
  


module.exports = router;