var http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;

var server = http.createServer(function (req, res) {
  var parseUrl = url.parse(req.url, true);
  var path = parseUrl.pathname;
  var trimPath = path.replace(/^\/+|\/+$/g, "");

  req.on("data", function (data) {});
  req.on("end", function (end) {
    var chosenHandler =
      typeof router[trimPath] !== "undefined"
        ? router[trimPath]
        : handlers.notFound;
    var data = {
      trimPath: trimPath,
    };
    chosenHandler(data, function (statusCode, payload) {
      statusCode = typeof statusCode == "number" ? statusCode : 200;
      payload = typeof payload == "object" ? payload : {};
      var payLoadString = JSON.stringify(payload);
      res.writeHead(statusCode);
      res.end(payLoadString);
      console.log("status " + statusCode + "payload" + payload);
    });
  });
});
server.listen(3000, function () {
  console.log("server running at localhost:3000 ");
});

var handlers = {};
handlers.sample = function (data, callback) {
  callback(406, { name: "sample handle" });
};
handlers.notFound = function (data, callback) {
  callback(404);
};
handlers.home = function (data, callback) {
  callback(200, "home page");
};

var router = {
  sample: handlers.sample,
  home: handlers.home,
};
