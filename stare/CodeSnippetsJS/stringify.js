var login = 'andrzej';
var passw = 'a';
var sendMessage = {}
sendMessage.login = login;
sendMessage.passw = passw;
console.log(sendMessage);
res = JSON.stringify(sendMessage);
console.log(res);