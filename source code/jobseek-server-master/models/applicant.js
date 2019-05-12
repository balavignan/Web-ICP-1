var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = require('../config/index').secret
var uniqueValidator = require('mongoose-unique-validator');
const saltRounds = 10;

const Schema = mongoose.Schema;
// add user schema
const applicantSchema = new Schema({
    firstName: String,
    lastName: String,
    dob: Date,
    gender: String,
    phone: String,
    email: String,
    hash: String,
    state: String,
    city: String,
    country: String,
    address: String,
    education: [],
    experience: [],
    skillValue: Array,
    profile_photo: String,
    admin: {
        type: Boolean,
        default: false
    },
    isHr: {
        type: Boolean,
        default: false
    },
    isApplicant: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    },
    jobApplied: [{
        type: Schema.Types.ObjectId,
        ref: 'postModel'
    }],
    chats: [{
        _from: {
            type: Schema.Types.ObjectId,
            ref: 'messageModel'
        },
        _to: {
            type: Schema.Types.ObjectId,
            ref: 'messageModel'
        }
    }]
});

applicantSchema.plugin(uniqueValidator, {message: 'is already taken '});

applicantSchema.methods.encryptPassword = async function (key) {
    const hash = await bcrypt.hash(key, saltRounds);
    console.log('error is here: ', hash);
    return this.hash = hash;
};

applicantSchema.methods.decryptPassword = function (key) {
    console.log('key is 🥇', key, this.hash);
    return bcrypt.compare(key, this.hash);
};

applicantSchema.methods.generateJWT = function () {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

applicantSchema.methods.toAuthJSON = function () {
    return {
        id: this._id,
        isHr: this.isHr,
        isApplicant: this.isApplicant,
        status: this.status,
        token: this.generateJWT()
    };
};

applicantSchema.methods.toProfileJSONFor = function () {
    return {
        isHr: this.isHr,
        isApplicant: this.isApplicant,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        dob: this.dob,
        phone: this.phone,
        education: this.education,
        experience: this.experience,
        skillValue: this.skillValue,
    }
}

let applicantModel = mongoose.model('applicantModel', applicantSchema);
