/* const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;
const PORT = parseInt(process.argv[2] || 8080)

if (cluster.isPrimary) {
    console.log("num CPUs:" + numCPUs)
    console.log(`I am a master ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      console.log(`${worker.process.pid} is finished`);
    });
  } else {
    http
      .createServer((req, res) => {
        res.writeHead(200);
        res.end(`Servidor en ${PORT} - PID ${process.pid} - ${new Date().toLocaleString()}`);
      })
      .listen(PORT);
    console.log(`Worker ${process.pid} started`);
  } */
  



/************NGINX**********/
const express = require("express");
const numCPUs = require("os").cpus().length;
const app = express();

//app.use(express.static('public'))

const PORT = parseInt(process.argv[2]) || 8080;

app.get("/datos", (req, res) => {
  console.log(`port: ${PORT} -> Fyh: ${Date.now()}`);
  res.send(
    `Servidor express <span style="color:blueviolet;">(Nginx)</span> en ${PORT} - <b>PID ${
      process.pid
    }</b> - ${new Date().toLocaleString()}`
  );
});

app.get("/api/randoms", (req, res) => {
  const info = {};
  let numb = Math.floor(Math.random() * 1000 + 1);
  info["num_random"]=numb
  info["process_number"]=numCPUs
  res.json({ info });
});

app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});