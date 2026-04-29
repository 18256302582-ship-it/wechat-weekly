const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const f = path.join('C:/Users/v_yiicao/WorkBuddy/20260413140616/wechat-weekly', 'index.html');
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
  res.end(fs.readFileSync(f));
});

server.listen(3456, () => console.log('Server ready at http://localhost:3456'));
