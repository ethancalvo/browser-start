const exec = require("child_process").exec;
exec("node .; npm run build", (err, stdout, stderr) => {
  if (err) {
    console.log(`ERROR:${err}`);
  }
  console.log(stdout);
});
