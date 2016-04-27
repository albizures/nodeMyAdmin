const cluster = require('cluster'),
  pidPath = process.env.PID_PATH,
  cpus = require('os').cpus().length,
  config = require('./config/enviroment');


process.on("SIGUSR2", onSIGUSR2);

var spawn = function() {
  if (Object.keys(cluster.workers).length <= cpus) {
    var id = cluster.fork().id;
    cluster.workers[id].on('exit', exit);
    cluster.workers[id].on('error', error);
    return cluster.workers[id];
  }
};
function exit(worker, code) {
  if (code != 0) {
    console.log('###############################################################');
    console.log('exit ', arguments);
    spawn();
    console.log('workers ids', Object.keys(cluster.workers));
  }
}
function error(worker, code) {
  console.log('###############################################################');
  console.log('error', code);
}
function onSIGUSR2() {
  delete require.cache[require.resolve('./app.js')];
  var i = 0;
  var workers = Object.keys(cluster.workers);
  function reload() {
    if (i == workers.length) {
      return restartEnd();
    }
    console.log("Killing " + workers[i]);
    cluster.workers[workers[i]].removeListener('exit', exit);
    cluster.workers[workers[i]].on("disconnect", function() {
      console.log("Shutdown complete", Object.keys(cluster.workers), i);
      cluster.workers[workers[i]].kill();
      var newWorker = cluster.fork();
      if (newWorker) {
        newWorker.on('listening', onListening);
        function onListening() {
          console.log('Worker ', newWorker.id ,' listening');
          i++;
          reload();
        }
      } else {
        restartEnd();
      }
    });
    cluster.workers[workers[i]].send("server:close");
    cluster.workers[workers[i]].disconnect();
  }
  reload();
}
function restartEnd() {
  console.log('#########################################################');
  console.log('all workers restarted');
  console.log('workers ids', Object.keys(cluster.workers));
}
function init() {
  // Spawn workers.
  for (var i = 0; i < cpus; i++) {
    console.log('spawn ', i);
    spawn(i);
  }
  console.log('workers ids',Object.keys(cluster.workers));
}

init();

if (config.isDev) {
  require
}
