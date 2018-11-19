var tl = require('azure-pipelines-task-lib/task');
var request = require('request');

var endpoint = tl.getInput('connection', true);
var projectId = tl.getInput('projectid', true);

request.get({
    url: tl.getEndpointUrl(endpoint, false) + '/api/v2/projects/'+ projectId +'/',
    'headers': {
        'Authorization': 'Token ' + tl.getEndpointAuthorizationParameter(endpoint, 'apitoken', false)
    },
}, function (err, res) {
    if (err)
    {
        tl.setResult(tl.TaskResult.Failed, 'Error occured: '+ err);
    }
    var project = JSON.parse(res.body);
    if (project['risk_policy_compliant'])
    {
        tl.setResult(tl.TaskResult.Succeeded, 'Project risk status is compliant. URL: '+ project['url']);
    }
    else {
        tl.setResult(tl.TaskResult.Failed, 'Project risk status is NOT compliant. URL: '+ project['url']);
    }
});
