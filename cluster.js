const cluster = require("cluster");
const os = require("os");
const process = require("process");
const mainApp = require("./index");

const totalCPUs = os.availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary worker Pid:${process.pid}`);

  //fork workers
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died | code:${code}`);
    });
  }
} else {
  mainApp();
  console.log(`Worker process started Pid:${process.pid}`);
}
