var http = require('http');
var qs = require('querystring');
function send(temperature) {
    http.request({
        host: 'ec2-13-229-49-155.ap-southeast-1.compute.amazonaws.com',
        port: 3000,
        url: '/',
        method: "POST"
    }, function (res) {
        res.setEncoding('utf8');
        console.log('\n  \033[90m  request complete!\033[39m');
        process.stdout.write('\n Now temperature:');
        
    }).end(qs.stringify({ tem: temperature }));
}
process.stdout.write('\n  Now temperature: ');


process.stdin.resume(); 
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (tem) {
    send(tem.replace('\n', ' '));
});