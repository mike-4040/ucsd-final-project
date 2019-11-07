const CronJob = require('../node_modules/cron/lib/cron').CronJob;
const closeRequests = require('./closeRequests')

console.log('Before job instantiation');
const job = new CronJob('0 */1 * * * *', function() {
	closeRequests('Hi from closing requests');
});
console.log('After job instantiation');
job.start();