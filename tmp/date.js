let d = new Date();


console.log('Now:         ', d);

console.log('SetDate:     ', d.setDate(d.getDate() + 1.5));
console.log('After set:   ', d);

console.log('String     : ', d.toString());
console.log('Date String: ', d.toDateString());
console.log('Time String: ', d.toTimeString());
console.log('UTC String : ', d.toUTCString());


// console.log(tomorrow.toUTCString());

var timeFormat = {
  // year: 'numeric',
  month: '2-digit', day: 'numeric', hour: '2-digit', minute: '2-digit'
};

console.log(new Date().toLocaleString("en-US", timeFormat));

