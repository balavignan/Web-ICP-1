var mongoose = require('mongoose');
var Post = mongoose.model('postModel');
var Hr = mongoose.model('hrModel');


function send_failure(code, message) {
    return status(code).json({
        success: false,
        errors: {
            message
        }
    })
}

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

// shortlist applicant by HR
exports.shortlist_applicant = async (req, res, next) => {
    console.log("upadted AAAAAAAAAAA", req.query.id)
    console.log("upadted AAAAAAAAAAA", req.query.hrRef)
    console.log("upadted AAAAAAAAAAA", req.body)

    var data = await Post.findByIdAndUpdate(req.query.id, {
        $set: {
            applicants: {
                _id: req.query.hrRef,
                isShortlisted: req.body.isShortlisted
            }
        }
    })
    if (data) {
        res.json(data)
    }
};

// get all post at once
exports.get_all_posts = async (req, res, next) => {

    try {
        var data = await Post.find()
        if (!data) {
            return res.sendStatus(401);
        }
        return res.json({
            data: data
        });
    } catch (error) {
        console.log('Error', error);
    }
}

// any update on post
exports.update_post = async (req, res, next) => {

    try {
        console.log("upadted AAAAAAAAAAA", req.query.id)
        console.log("upadted AAAAAAAAAAA", req.body)
        var data = await Post.findByIdAndUpdate(req.query.id, req.body)
        if (!data) {

        }
        console.log(data);

        return res.json({
            data: data
        })
    } catch (error) {
        console.log('Error', error);
    }
}

// get post by id
exports.get_post_byID = async (req, res, next) => {
    console.log('game over posts ');
    try {
        // user_details = JSON.parse(JSON.stringify(req.body));
        var user = await Post.findOne({
                _id: req.params.post_id
            })
            .populate('applicants._id')
        if (!user) {
            return res.sendStatus(401);
        }
        return res.json({
            data: user
        });
    } catch (error) {
        console.log('Error', error);
    }
}

// get current user data
exports.get_user_data = async (req, res, next) => {
    // user_details = JSON.parse(JSON.stringify(req.body));
    // if (user_details.isHr && user_details.status) {
    try {
        console.log('game over posts:: ', req.userData)
        var user = Post.find({
            hrRef: req.userData.id
        })
        if (!user) {
            return res.sendStatus(401);
        }
        return res.json({
            data: user
        });

    } catch (error) {
        console.log('Error', error);
    }
}

// add new post into the job list
exports.add_new_post = async (req, res, next) => {
    console.log('new post', req.userData);
    // let post = new Post();
    // var post_details = JSON.parse(JSON.stringify(req.body));

    var user = await Hr.findById(req.userData.id);
    console.log('user is ', user);
    var post = new Post(post_details);
    post.hrRef = user; +
    console.log("postPPPPPPP", post);
    var result = await post.save();

    if (!result) {
        res.send_failure(401, 'Try Again!')
    }
    send_success(res, result, 'Successfully Saved!');

    console.log('result::', result);
    // return post.save().then(() => {
    //     return res.json({
    //         data: post.toJSONFor(req.query.id)
    //     })
    // })
}

exports.get_post_details = async (req, res, next) => {
    console.log('game over posts:: ', req.query.hrRef)
    try {
        // user_details = JSON.parse(JSON.stringify(req.body));
        var user = await Post.find({ hrRef: req.query.hrRef }).populate('hrRef')
        if (!user) {
            return res.sendStatus(401);
        }
        return res.json({
            data: user
        });
    } catch (error) {
        console.log('Error', error);
    }
}