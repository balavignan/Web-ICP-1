let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var invitesSchema = mongoose.Schema({
    sender: String,
    receiver: String,
    message: String,
    status: Boolean,
    reqMakerMsgId: String,
    created: { type: Date, default: Date.now}
});
module.exports = mongoose.model('Invitations',invitesSchema); 