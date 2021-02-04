#!/usr/bin/env node

const http = require("http");
const through2 = require("through2");
const PORT = 3100;
const HOST = "0.0.0.0";

const proxyServer = http.createServer((req, output) => {
  const proxyRequest = http.request(
    {
      hostname: "qddegtya.github.io",
      port: 80,
      path: "/blog/2015/10/21/flask-auth",
      method: "GET",
    },
    (res) => {
      // set header
      output.setHeader("content-type", "text/html; charset=utf-8");

      res
        .pipe(
          through2(function inject(chunk, enc, callback) {
            console.log(chunk.toString());

            this.push(chunk);

            callback();
          })
        )
        .pipe(output);
    }
  );

  // send request
  proxyRequest.end();
});

proxyServer.listen(PORT, HOST, () => {
  console.log(`proxy server is listening on : ${PORT}`);
  console.log(`url : http://${HOST}:${PORT}`);
});
