const http = require("http");
const qs = require("qs");
const StringDecoder = require("string_decoder").StringDecoder;

const server = http.createServer((req, res) => {
  const decoder = new StringDecoder("utf-8");
  let dataBuffer = "";
  req.on("data", (chunk) => {
    dataBuffer += decoder.write(chunk);
  });

  req.on("end", () => {
    console.log(dataBuffer);
    res.end();
  });

  res.write("Hello Node JS");
  console.log(`Done!`);
});

server.listen(9998, () => console.log(`Server Started at PORT 9998`));
