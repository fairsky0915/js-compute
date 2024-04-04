/// <reference types="@fastly/js-compute" />
/*eslint-env serviceworker */
import { SimpleCache } from 'fastly:cache';
import { CacheOverride } from 'fastly:cache-override';
import { env } from "fastly:env";
addEventListener('fetch', event => event.respondWith(app(event)));
async function app(event) {
  let timestamp = Date.now().toString();
  const ip = event.client.address;
  const id = env("FASTLY_TRACE_ID"); 
  console.log("Received, " + timestamp + ", " + ip + ", " + env("FASTLY_SERVICE_VERSION") + ", " + env("FASTLY_HOSTNAME") + ", " + id);
  let beresponse = await SimpleCache.getOrSet(ip, async () => {
    let cacheOverride = new CacheOverride("pass");
    event.request.headers.set("fastly-client-ip", ip);
    let beresp = await fetch(event.request, {
      backend : "ERL",
      cacheOverride
    });
    let timestamp = Date.now().toString();
    console.log("MISS, " + timestamp + ", " + ip + ", " + env("FASTLY_SERVICE_VERSION") + ", " + env("FASTLY_HOSTNAME") + ", " + id + ", " + beresp.status);
    if (beresp.status == 429) {
      return {
        value: beresp.status,
        ttl: 60
      }
    } else {
      return {
        value: beresp.status,
        ttl: 0
      }
    }
  });
  let status = await beresponse.text();
  timestamp = Date.now().toString();
  console.log("FINISH, " + timestamp + ", " + ip + ", " + env("FASTLY_SERVICE_VERSION") + ", " + env("FASTLY_HOSTNAME") + ", " + id + ", " + status);
  return new Response("Done", {
    status: status
  });
}