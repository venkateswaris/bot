var request = require('request');
var util = require('util');

var go = function Constructor(username, password) {
    this.baseUrl = util.format('http://%s:%s@192.168.227.212:8153/go/api/pipelines', username, password);
};

go.prototype.pause = function (pipeline, action) {
    console.log("pause triggered");

    var url = util.format('%s/%s/%s', this.baseUrl, pipeline, action);
    request.post(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(util.format("%s %s - done", action, pipeline));
        }
    });
};

module.exports = go;