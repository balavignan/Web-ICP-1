var Chat = require('../../models/messages');
var mongoose = require('mongoose');
// var Hr = require('../models/hr');
// var Applicant = require('../models/applicant');
var Invite = require('../../models/invites');
var Applicant = mongoose.model('applicantModel');
const Hr = mongoose.model('hrModel');
var router = require('express').Router();
module.exports = {
    serversocket: () => {
        users = [];
        var io = require('socket.io')();
        io.on('connection', function (socket) {

            console.log('one client is connected with id=' + socket.id);
            socket.on('join', function (data) {
                console.log('Inside join');
                //joining  
                //  console.log("Inside Join Event", data);
                let ob = {
                    'email': data.sender,
                    'id': socket.id,
                    'room': data.room,
                    'receiverEmail': data.receiver
                };
                socket.join(data.room);
                users.push(ob);
               // console.log(users);
                
                Chat.find({
                    $or: [{
                            user: data.user,
                            sender: data.sender,
                            receiver: data.receiver
                        },
                        {
                            sender: data.receiver,
                            receiver: data.sender
                        }
                    ]
                }, function (err, docs) {

                    if (err) throw err;
                    else
                        socket.emit('load old msgs', docs);
                });
            });
            socket.on('disconnect', function () {
                let index;
                console.log('one user is disconnected');
                users.forEach(function (element) {
                    if (element.id == socket.id) {
                        index = users.indexOf(element);
                        //        console.log(index);
                        delete users[index];
                        users = users.filter(Boolean);
                        //      console.log(users);
                    }
                }, this);
            });
            socket.on('sendInvite', async (data) => {
                 console.log('Invite Event', data);
                let ob = {
                    'email': data.sender,
                    'id': socket.id,
                    'room': data.room,
                    'recMesId': data.recMesId
                };
                socket.join(data.room);
                users.push(ob);

                var newMsg = new Chat({
                    user: data.user,
                    messages: [
                        {
                            message: `An invitation has been sent to ${data.receiver}`,
                            sender: data.sender,
                        }
                    ],
                    sender: data.sender
                });
                var newInv = new Invite({
                    message: `${data.sender} with username: ${data.user} has sent an invitation to chat`,
                    status: true,
                    receiver: data.receiver,
                    reqMakerMsgId: newMsg._id,
                    sender: data.sender
                });
                await newMsg.save();
                console.log(' 🤐', newMsg._id);
                const chat = {
                    _from: newMsg._id
                }
                // if (ob.userType === 'hr') {
                    console.log('data is:: ',await Hr.find({
                        email: ob.email
                    }))
                    
                    const us = await Hr.findOneAndUpdate({
                        email: ob.email
                    }, {
                        $push: {
                            chats: chat
                        }
                    })
                    
                    console.log('data 2 :: ', us);
                    
                // }
                console.log('foreingerns', data.receiver);
                newInv.save(function (err) {
                    if (err) throw err;
                });
                io.to(data.room).emit('send-invitation', {
                    user: data.user,
                    room: data.room,
                    message: `An invitation has been sent to ${data.receiver}`,
                    sender: data.sender,
                    receiver: data.receiver,
                    recMesId: newMsg._id
                });
            });
            socket.on('message', function (data) {
                //Send Message  
                console.log('Inside Messages',data);
                 console.log(users);
                
                 let mess = {
                    message: data.message,
                    sender: data.sender,
                    created: Date.now()
                }
                Chat.findByIdAndUpdate(data.fromId, {
                    $push: {
                        messages: mess
                    }
                }, (err, fetched) => {
                    if (err) throw err;
                     console.log("Fechjkl",fetched); 
                   // io.to(element.room).emit('new message', data);
                });
                users.forEach(function (element) {
                    if (element.email == data.sender) {

                        io.to(element.room).emit('new message', data);
                    }
                });
                users.forEach(function (element) {
                    if (element.email == data.receiver) {
                        // console.log(data);
                        console.log("Now entered in this section")
                        // let chat = {
                        //     _from: "5ae94f163155792a7485c569",
                        //     _to: "5ae94f163155792a7485c569"
                        // }
                        // console.log('Consoled');
                        // Applicant.findOneAndUpdate({email: "a"},{$push: {chats: chat}},(err,fetched)=> {
                        //     if(err) throw err;

                        //     console.log("Fechjkl",fetched);  
                        //     // io.to(element.room).emit('new message', data); 
                        // });
                        // let mess = {
                        //     message: data.message,
                        //     sender: data.sender,
                        //     created: Date.now()
                        // }
                        // Chat.findOneAndUpdate({
                        //     sender: data.sender
                        // }, {
                        //     $push: {
                        //         messages: mess
                        //     }
                        // }, (err, fetched) => {
                        //     if (err) throw err;
                        //      console.log("Fechjkl",fetched); 
                           
                        // });
                        io.to(element.room).emit('new message', data);
                        // var newMsg = new Chat({ user: data.user, message: data.message, sender: data.sender, receiver: data.receiver });
                        // newMsg.save(function (err) {
                        //     if (err) throw err;
                        //     io.to(element.room).emit('new message', data);
                        // });
                    }
                });
            });
        });
        io.listen(5000);
    }
};