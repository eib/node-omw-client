var pidsByPid = {};

exports.add = function add(pid) {
  console.log('PID: ' + pid);
  pidsByPid[pid] = pid;
};

exports.remove = function remove(pid) {
  delete pidsByPid[pid];
};

exports.getAllPids = function getAllPids() {
  var pids = [];
  for (var pid in pidsByPid) {
    if (pidsByPid.hasOwnProperty(pid)) {
      pids.push(pid);
    }
  }
  return pids;
};
