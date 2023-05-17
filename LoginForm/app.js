const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("qs");

let userData = "";

const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);
  parsedURL = parsedURL.pathname.replace(/^\/+|\/+$/g, "");

  switch (parsedURL) {
    case "home":
      routers.function(`home`, req, res);
      break;
    case "login":
      userData = "";
      if (req.method === "GET") {
        routers.function(`login`, req, res);
      } else {
        req.on("data", (chunk) => {
          userData += chunk;
        });
        req.on("end", () => {
          userData = qs.parse(userData);
          console.log(userData);
          res.end();
        });
      }
      break;
    case "profile":
      routers.writeData(req, res);
      break;
    default:
      res.end("Page not found!");
      break;
  }
});

let routers = {};

routers.function = (input, req, res) => {
  fs.readFile(`./LoginForm/views/${input}.html`, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      res.write(data);
      res.end();
    }
  });
};

routers.writeData = (req, res) => {
  fs.readFile(`./LoginForm/views/profile.html`, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      data = data.replace("{username}", userData.usrName);
      data = data.replace("{userage}", userData.usrAge);
      data = data.replace("{useraddress}", userData.usrAdd);
      res.write(data);
      res.end();
    }
  });
};

server.listen(1739, () => console.log(`Server started at Port 1739`));
