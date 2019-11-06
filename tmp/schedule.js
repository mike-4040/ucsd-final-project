const CronJob = require('../node_modules/cron/lib/cron').CronJob;

console.log('Before job instantiation');
const job = new CronJob('30 * * * * *', function() {
	const d = new Date();
	console.log('At 30 seconds:', d);
});
console.log('After job instantiation');
job.start();