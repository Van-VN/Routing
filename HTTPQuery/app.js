const http = require("http");
const qs = require("qs");
const url = require("url");

const server = http.createServer((req, res) => {
  let parseURL = url.parse(req.url, true);
  console.log(parseURL.query);
  res.write("Hello");
  res.end();
});

server.listen(8899, () => {
  console.log(`Server started!`);
});
