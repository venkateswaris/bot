var request = require('request');
var util = require('util');

var go = function Constructor(username, password) {
    this.baseUrl = util.format('http://%s:%s@192.168.227.212:8153/go/api', username, password);
};

go.prototype.post = function (pipeline, action, callback) {
    var url = util.format('%s/pipelines/%s/%s', this.baseUrl, pipeline, action);
    request.post(url, function (error, response, body) {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
            var status = util.format("%s %s - done", action, pipeline);
            callback(status);
        }
        else {
            var message = util.format("%s %s - failed: reason - %s", action, pipeline, response.body);
            callback(message);
        }
    });
};

go.prototype.get = function (pipeline, action, callback) {
    var url = util.format('%s/pipelines/%s/%s', this.baseUrl, pipeline, action);
    request.get(url, function (error, response, body) {
        var commit_details = JSON.parse(response.body).pipelines[0].build_cause.material_revisions.map(function (m) {
            var modification = m.modifications[0];
            return {revision: modification.revision, comment: modification.comment};
        });
        callback(commit_details)
    });
};

module.exports = go;