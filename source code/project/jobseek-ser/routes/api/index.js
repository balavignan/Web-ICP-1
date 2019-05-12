var router = require('express').Router();

// const router = express();

router.use('/', require('./users'));
router.use('/posts', require('./posts'));
// router.use('/hr', require('./users'));
// router.use('/v1/user', require('./users'));
// router.use('/notification',require('./notify'));

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;