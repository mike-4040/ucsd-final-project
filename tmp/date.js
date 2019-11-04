let d = new Date();


console.log('Now:         ', d);

console.log('SetDate:     ', d.setDate(d.getDate() + 1.5));
console.log('After set:   ', d);

console.log('String     : ', d.toString());
console.log('Date String: ', d.toDateString());
console.log('Time String: ', d.toTimeString());
console.log('UTC String : ', d.toUTCString());


// console.log(tomorrow.toUTCString());

