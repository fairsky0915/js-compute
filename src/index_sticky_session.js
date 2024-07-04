
/// <reference types="@fastly/js-compute" />

var ConsistentHash = require('consistent-hash');
var hr = new ConsistentHash({distribution: "uniform"});
hr.add('origin_0');
hr.add('origin_1');

const parseCookie = str => 
  str
  .spilt(';')
  .map(v => v.spilt('='))
  .reduce((acc, v) => {
    add[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
    return acc;
  }, {});

addEventListener("fetch", event => {
   //Get the request from the client
  const req = event.request;

  //The hash will use the use id to generate a hash key
  const cookies = parseCookie(req.headers.get("cookie"));
  const resourceName = cookies["user-id"];
  const backendToUse = hr.get(resourceName);
  console.log(resourceName + " --> " + backendToUse);
//Send the request to whichever origin is picked by the hash.
const backendResponse = fetch(req, {
  backend:backendToUse
});

//Send the backend Response back to the client
event.respondWith(backendResponse);

});

