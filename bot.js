'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var Go = require('./go.js');


var GO_ACTION = 'go-action';

var DeployBot = function Constructor(settings) {

    var token = settings.token;

    var rtm = new RtmClient(token);
    rtm.start();

    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
        console.log("authenticated");
    });


    rtm.on(RTM_EVENTS.MESSAGE, function (message) {
        var post = function (status, channel) {
            rtm.sendMessage(status, channel, function messageSent() {
            })
        };

        if (message.text.indexOf(GO_ACTION) !== -1) {
            var go_action = message.text.match(/go-action[^]*/)[0];
            var messages = go_action.split(/[ ]/);
            post(util.format("<@%s>: started - %s", message.user, go_action), message.channel);
            var go = new Go(settings.username, settings.password);
            go.pause(messages[2], messages[1], function (status) {
                post(util.format("<@%s>: %s", message.user, status), message.channel);
            })
        }
    });
};

// inherits methods and properties from the Bot constructor
util.inherits(DeployBot, Bot);

module.exports = DeployBot;


