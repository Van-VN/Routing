const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

let handlers = {};

handlers.sample = (req, res) => {
  res.writeHead(406, { name: "sample handler" });
  res.end();
};

handlers.notFound = (data, callback) => {
  callback(404);
};

handlers.home = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`Home Page`);
};

const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);
  parsedURL = parsedURL.pathname;
  console.log(parsedURL);
  switch (parsedURL) {
    case "/demo":
      console.log(`Demo!`);
      handlers.sample;
      break;
    case "/home":
      console.log(`Home!`);
      handlers.home;
      break;
    case "/sample":
      handlers.sample;
      break;
    default:
      res.end("Error!");
      break;
  }
  res.end();
  //   console.log(parsedURL);
  //   handlers.sample;
  //   res.end(`123`);
});

server.listen(3001, () => {
  console.log(`Server started!`);
});
