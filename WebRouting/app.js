const http = require("http");
const url = require("url");
const fs = require("fs");

const functionList = {};
functionList.users = (req, res) => {
  fs.readFile("./WebRouting/users.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
};

functionList.product = (req, res) => {
  fs.readFile("./WebRouting/products.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
};

functionList.notFound = (req, res) => {
  fs.readFile("./WebRouting/notfound.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
};

const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);
  parsedURL = parsedURL.pathname.replace(/^\/+|\/+$/g, "");
  switch (parsedURL) {
    case "users":
      functionList.users(req, res);
      break;
    case "products":
      functionList.product(req, res);
      break;
    default:
      functionList.notFound(req, res);
      break;
  }
});

server.listen(3111, () => {
  console.log(`Server started at Port 3111`);
});
