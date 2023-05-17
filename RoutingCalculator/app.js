const http = require("http");
const fs = require("fs");
const qs = require("qs");
const url = require("url");

let inputCombine = "";

const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);
  parsedURL = parsedURL.pathname.replace(/^\/+|\/+$/g, "");
  switch (parsedURL) {
    case "calculator":
      if (req.method === "GET") {
        inputCombine = "";
        routers.calculator(req, res);
      } else if (req.method === "POST") {
        routers.calculate(req, res);
        res.writeHead(301, {
          location: "result",
        });
      }
      break;
    case "result":
      routers.writeResult(req, res);
      break;
    default:
      routers.notFound(req, res);
      break;
  }
});

let routers = {};

routers.calculator = (req, res) => {
  fs.readFile(
    "./RoutingCalculator/view/calculator.html",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        res.write(data);
        res.end();
      }
    }
  );
};

routers.calculate = (req, res) => {
  req.on("data", (chunk) => {
    inputCombine += chunk;
  });
  req.on("end", () => {
    inputCombine = qs.parse(inputCombine);
    inputCombine = Object.values(inputCombine).join("");
    inputCombine = eval(inputCombine);
    console.log(`Done!`);
    res.end();
  });
};

routers.writeResult = (req, res) => {
  fs.readFile("./RoutingCalculator/view/result.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      data = data.replace("{result}", inputCombine);
      res.write(data);
      res.end();
    }
  });
};

routers.notFound = (req, res) => {
  fs.readFile("./RoutingCalculator/view/404.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      res.write(data);
      res.end();
    }
  });
};

server.listen(6886, () => {
  console.log("Calculator server started!");
});
