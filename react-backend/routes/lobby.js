var express = require('express');
const {response} = require('express');
var router = express.Router();

/* Create lobby. */
router.post('/:lobbyID', (request, response) => {
    request.app.locals.redisClient.set('lobby-POLL', 'test1');
    response.send("Success");
});

/* Get lobby. */
router.get('/:lobbyID', (request, response) => {
    request.app.locals.redisClient.get('lobby-Poll').then((reply) => {
        response.send(reply);
    });
});

module.exports = router;