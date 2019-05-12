let express = require('express');
let router = express.Router();
let bodyparser = require('body-parser');
let cors = require('cors');
let user = require('./controllers/userRoute');
socket = require('./socket/socket');
router.use(bodyparser());
router.use(cors());

// const app = express();

router.use(express.static(__dirname + "/../static/"));
router.use('/api', require('./api'));
socket.serversocket();
router.post('/join', user.fetchChat);
router.post('/enter/invites', user.chatInvite);
router.put('/enter/accept/invites', user.toggelInvite);
// router.use('/authenticate', require('../_middleware/check-auth'));

module.exports = router;
