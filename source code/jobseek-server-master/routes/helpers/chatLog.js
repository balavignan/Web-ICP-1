var msg = require('../../models/messages');
var mongoose = require('mongoose');
var Hr = mongoose.model('hrModel');
var Applicant = mongoose.model('applicantModel');
var Chat = mongoose.model('messageModel');
// var mongoose = require('mongoose');
// var msg = mongoose.model('messageModel')
var invite = require('../../models/invites');
module.exports = {
  fetchChat: (obj) => {
    console.log(obj)
    return new Promise(async (resolve, reject) => {
      if (obj.userType == 'hr') {
        try {
          console.log('user not found 💯');
          const hr = await Hr.findOne({
              email: obj.sender
            })
            .populate('chats._from').populate('chats._to');
          console.log('user not found 💯', hr);
          if (!hr) {}
          // console.log(hr.chats);
          
          resolve(hr.chats)

        } catch (error) {

        }
      } else {
        try {
          const applicant = await Applicant.findOne({
            email: obj.sender
          }).populate('chats._from').populate('chats._to');
          // console.log('Consoled HR', JSON.stringify(applicant.chats));
          console.log('hello');
          if (!applicant) {

          }
          resolve(applicant.chats)
        } catch (error) {
          console.log('error is: ', error);
        }
      }
      reject({
        error: "cdcd"
      })
    });
  },
  fetchInvite: (obj) => {
    return new Promise((resolve, reject) => {
      console.log(' 🇿🇼', obj);

      invite.find({
          'receiver': obj,
          'status': true
        },
        (err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(data);
          }
        });
    });
  },
  checkInvite: (obj) => {
    return new Promise((resolve, reject) => {
      console.log('ghjkl;l;;;;',obj);
      
      invite.findOne({
          _id: obj
        },
        async (err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {

            data.status = false;
            // if (data.receiver === 'chat@applicant.com') {
              var newMsg = new Chat({
                user: data.receiver,
                messages: [{
                  message: `Invitaion Accepted from ${data.sender}`,
                  sender: data.receiver,
                }],
                sender: data.receiver
              });
              await newMsg.save();
              await Applicant.findOneAndUpdate({
                email: data.receiver
              }, {
                $push: {
                  chats: {
                    _from: newMsg._id,
                    _to: data.reqMakerMsgId
                  }
                }
              });
              Hr.findOneAndUpdate({
                email: data.sender,
                chats: {
                  $elemMatch: {
                    _from: data.reqMakerMsgId,
                  }
                }
              }, {
                $set: {
                  'chats.$._from': data.reqMakerMsgId,
                  'chats.$._to': newMsg._id
                }
              }, (er, data) => {
                if (er) {
                  console.log(' 💯');
                }
              })
            // }
            data.save(function (err, updatedData) {
              if (err) {
                console.log(err);
              } else
                resolve(updatedData);
            });
          }
        });
    });
  },
}