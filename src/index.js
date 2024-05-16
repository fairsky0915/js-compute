
/// <reference types="@fastly/js-compute" />


addEventListener("fetch", event => {
  // Get the request from the client.
  const req = event.request;
  const url = new URL(req.url);
  let path = url.pathname.split("/");
 
  const pathPrefixes = [];

  // Extract all possible prefixes of the URL path
  while (path.length) {
    pathPrefixes.push(path.join("/"));
    path.pop();
  }
  console.log(pathPrefixes.join(" "));

  // Join the path prefixes into a valid surrogate key cache override
  const cacheOverride = new CacheOverride('override', {
    surrogateKey: pathPrefixes.join(" ")
  });

  // Send the request to `origin_0`.
  const backendResponse = fetch(req, {
    backend: "origin_0",
    cacheOverride
  });

  // Send the backend response back to the client.
  event.respondWith(backendResponse);
});

/*
import { Router } from "@fastly/expressly";

const router = new Router();

router.get("/", async (req, res) =>{
  return res.send("Hello World");
});

router.listen();
*/


/*
//import { allowDynamicBackends } from "fastly:experimental";
import { Backend } from "fastly:backend";
import { CacheOverride } from "fastly:cache-override";

//allowDynamicBackends(true);
async function app(event) {
  // For any request, return the fastly homepage -- without defining a backend!
  const backend = new Backend({
    name: 'http-me',
    target: 'http-me.glitch.me',
    hostOverride: "http-me.glitch.me",
    connectTimeout: 1000,
    firstByteTimeout: 15000,
    betweenBytesTimeout: 10000,
    useSSL: true,
    sslMinVersion: 1.3,
    sslMaxVersion: 1.3,
  });  

  //const backendName = "https://http-me.glitch.me";

//let cacheOverride = new CacheOverride("override", { ttl: 3700, surrogateKey: "abc", swr: 3600});
const req = event.request;
const backendResponse = await fetch(clientReq, { backend: "origin_0" });  
const newBodyStream = backendResponse.blob;
const httpHeaders = {
  "X-My-Custom-Header2": "ksong fighting",
  "X-My-Custom-Header": "Zeke are cool",
};
const headers = new Headers(httpHeaders);
//headers.delete("Cache-Control");
//headers.set('cache-control','max-age = 360');



/*if (req.method === "GET") {
  return new Response(null, {
    //status: 204,
    headers: {
      "access-control-allow-origin": req.headers.get('origin'),
      "access-control-allow-methods": "GET,HEAD,POST,OPTIONS",
      "access-control-allow-headers": req.headers.get('access-control-request-headers') || '',
      "access-control-max-age": 86400,
    }
  });
}*/

//return new Response(null, {
//  status: 200,
//  headers
//});

/*
const backendResponse = await fetch(req, {
  //return fetch(event.request, {    
     //backend: backendName, // Here we are configuring this request to use the backend from above.
     backend, // Here we are configuring this request to use the backend from above.
     //cacheOverride
     headers
  });

return backendResponse;

  /*
  //return fetch('https://www.fastly.com/', {
  return fetch('https://http-me.glitch.me', {
  //return fetch(event.request, {    
     //backend: backendName, // Here we are configuring this request to use the backend from above.
     //backend, // Here we are configuring this request to use the backend from above.
     cacheOverride
  });  */

/*
}
addEventListener("fetch", event => event.respondWith(app(event)));


/*
//! Default Compute@Edge template program.

/// <reference types="@fastly/js-compute" />
// import { CacheOverride } from "fastly:cache-override";
// import { Logger } from "fastly:logger";
import { env } from "fastly:env";
import { includeBytes } from "fastly:experimental";

// Load a static file as a Uint8Array at compile time.
// File path is relative to root of project, not to this file
const welcomePage = includeBytes("./src/welcome-to-compute@edge.html");

// The entry point for your application.
//
// Use this fetch event listener to define your main request handling logic. It could be
// used to route based on the request properties (such as method or path), send
// the request to a backend, make completely new requests, and/or generate
// synthetic responses.

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  // Log service version
  console.log("FASTLY_SERVICE_VERSION:", env('FASTLY_SERVICE_VERSION') || 'local');
  
  // Get the client request.
  let req = event.request;

  // Filter requests that have unexpected methods.
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return new Response("This method is not allowed", {
      status: 405,
    });
  }

  let url = new URL(req.url);

  // If request is to the `/` path...
  if (url.pathname == "/") {
    // Below are some common patterns for Compute@Edge services using JavaScript.
    // Head to https://developer.fastly.com/learning/compute/javascript/ to discover more.

    // Create a new request.
    // let bereq = new Request("http://example.com");

    // Add request headers.
    // req.headers.set("X-Custom-Header", "Welcome to Compute@Edge!");
    // req.headers.set(
    //   "X-Another-Custom-Header",
    //   "Recommended reading: https://developer.fastly.com/learning/compute"
    // );

    // Create a cache override.
    // To use this, uncomment the import statement at the top of this file for CacheOverride.
    // let cacheOverride = new CacheOverride("override", { ttl: 60 });

    // Forward the request to a backend.
    // let beresp = await fetch(req, {
    //   backend: "backend_name",
    //   cacheOverride,
    // });

    // Remove response headers.
    // beresp.headers.delete("X-Another-Custom-Header");

    // Log to a Fastly endpoint.
    // To use this, uncomment the import statement at the top of this file for Logger.
    // const logger = new Logger("my_endpoint");
    // logger.log("Hello from the edge!");

    // Send a default synthetic response.
    return new Response(welcomePage, {
      status: 200,
      headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
    });
  }

  // Catch all other requests and return a 404.
  return new Response("The page you requested could not be found", {
    status: 404,
  });
}
*/