const CronJob = require("../node_modules/cron/lib/cron").CronJob;

const closeRequests = require("./closeRequests");

function schedule() {
  const job = new CronJob("0 */5 * * * *", function() {
    closeRequests();
  });
  job.start();
  console.log("Requests Auto Close has been scheduled");
}

module.exports = schedule;
