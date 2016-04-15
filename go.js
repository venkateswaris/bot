var request = require('request');
var util = require('util');

var go = function Constructor(username, password) {
    this.baseUrl = util.format('http://%s:%s@192.168.227.212:8153/go/api/pipelines', username, password);
};

go.prototype.pause = function (pipeline, action, callback) {
    var url = util.format('%s/%s/%s', this.baseUrl, pipeline, action);
    var post = request.post(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var status = util.format("%s %s - done", action, pipeline);
            callback(status);
        }
        else {
            var message = util.format("%s %s - failed", action, pipeline);
            callback(message);
        }
    });
};

module.exports = go;