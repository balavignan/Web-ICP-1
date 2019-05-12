var mongoose = require('mongoose');
var router = require('express').Router();
var Post = mongoose.model('postModel');
const Hr = mongoose.model('hrModel');
var auth = require('../auth');

// const { authenticate } = require('../../_middleware/check-auth');



function send_failure(code, message) {
    return status(code).json({
        success: false,
        errors: {
            message
        }
    })
}


router.put('/shortlist', async (req, res, next) => {
    console.log("upadted AAAAAAAAAAA",req.query.id)
    console.log("upadted AAAAAAAAAAA",req.query.hrRef)
    console.log("upadted AAAAAAAAAAA",req.body)

      const data = await Post.findOneAndUpdate({'_id':req.query.id,'applicants._id': req.query.hrRef},
        { '$set': {
            'applicants.$.isShortlisted': req.body.isShortlisted 
        }
    })
       if(data){
        res.json(data);
       }
 });
router.get('/all/post', async (req, res, next) => {

    try {
        const data = await Post.find()
        if (!data) {
            return res.sendStatus(401);
        }
        return res.json(data);
    }
    catch (error) {
        console.log('Error', error);
    }
});

router.put('/update', async (req, res, next) => {

    try {
        console.log("upadted AAAAAAAAAAA",req.query.id)
        console.log("upadted AAAAAAAAAAA",req.body)
        const data = await Post.findByIdAndUpdate(req.query.id, req.body)
        if(!data){

        }
        console.log(data);
        
        return res.json(data);
    }
    catch (error) {
        console.log('Error', error);
    }
});

router.get('/:post_id', async (req, res, next) => {
    console.log('game over posts ');
    try {
        user_details = JSON.parse(JSON.stringify(req.body));
        const user = await Post.findOne({ _id: req.params.post_id })
        .populate('applicants._id').populate('hrRef')
        if (!user) {
            return res.sendStatus(401);
        }
        return res.json(user);
    }
    catch (error) {
        console.log('Error', error);
    }
});

router.get('/', auth ,(req, res, next) => {
    console.log('game over posts:: ', req.userData)
    // user_details = JSON.parse(JSON.stringify(req.body));
    // if (user_details.isHr && user_details.status) {
        Post.find({hrRef: req.userData.id}).then((user) => {
            if (!user) {
                return res.sendStatus(401);
            }
            return res.json(user);
        }).catch(next);
    // }
});

function send_success(res, data, message) {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    var output = {
        success: true,
        error: null,
        data: data,
        message: message
    };
    res.end(JSON.stringify(output) + "\n");
}




router.put('/new-post', auth, async (req, res, next) => {
    console.log('new post', req.userData);
    // let post = new Post();
    const post_details = JSON.parse(JSON.stringify(req.body));
    
    const user = await Hr.findById(req.userData.id);
    console.log('user is ',user);
        const post = new Post(post_details);
        post.hrRef = user;+
        console.log("postPPPPPPP",post);
        const result = await post.save();

        if (!result) {
            res.send_failure(401, 'Try Again!')
        }
        send_success(res, result, 'Successfully Saved!');

        console.log('result::',result);
        // return post.save().then(() => {
        //     return res.json({
        //         data: post.toJSONFor(req.query.id)
        //     })
        // })
    })

    // post.save().then(() => {
    //     return res.json({
    //         post: post.toJsonFor(req.query.id)
    //     });
    // }).catch();


router.get('/', async (req, res, next) => {
    console.log('game over posts:: ', req.query.hrRef)
    try {
        user_details = JSON.parse(JSON.stringify(req.body));
        const user = await Post.find({ hrRef: req.query.hrRef }).populate('hrRef')
        if (!user) {
            return res.sendStatus(401);
        }
        return res.json(user);
    } catch (error) {
        console.log('Error', error);
    }
});

router.put('/deleteHrPost',async(req,res)=>{
    console.log('id',req.query.id);
  const data=await Post.findByIdAndRemove(req.query.id);
  return res.json(data);
});

module.exports = router;