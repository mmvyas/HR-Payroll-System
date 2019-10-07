const fs = require("fs");

const isExisted = function(path) {
  try {
    fs.accessSync(path);
  } catch (err) {
    return false;
  }
  return true;
};

exports.store = function(body) {
  const path = "./client/Audit/" + body.name + "_" + body.period;

  if (isExisted(path)) {
    throw new Error("Already Added");
  }
  fs.appendFileSync(path, JSON.stringify(body));
};
