// functions/api/redeem-coupon.js
// Cloudflare Pages Function that securely proxies to your Producer Worker

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Require only WORKER_URL
    if (!env.WORKER_URL) {
      return new Response(JSON.stringify({
        error: "Missing environment variable: WORKER_URL",
        debug: "Set WORKER_URL to your Producer Worker endpoint, e.g. https://fp-coupon-prod.lloyd-954.workers.dev/api/redeem-coupon"
      }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    // Read request body
    let requestBody;
    try {
      requestBody = await request.text();
    } catch (error) {
      return new Response(JSON.stringify({
        error: "Failed to read request body",
        debug: error.message
      }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Validate JSON
    try { JSON.parse(requestBody); }
    catch (error) {
      return new Response(JSON.stringify({
        error: "Invalid JSON in request body",
        debug: error.message
      }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Forward to Producer Worker (no admin creds)
    let workerResponse;
    try {
      workerResponse = await fetch(env.WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Forward fingerprint-relevant headers
          "User-Agent": request.headers.get("User-Agent") || "Pages-Function",
          "Accept": request.headers.get("Accept") || "*/*",
          "Accept-Language": request.headers.get("Accept-Language") || "",
          // Forward connecting IP if available
          "CF-Connecting-IP": request.headers.get("CF-Connecting-IP") || "",
          "X-Client-Session": request.headers.get("X-Client-Session") || ""
        },
        body: requestBody
      });
    } catch (error) {
      return new Response(JSON.stringify({
        error: "Failed to communicate with Worker",
        debug: error.message,
        workerUrl: env.WORKER_URL
      }), { status: 502, headers: { "Content-Type": "application/json" } });
    }

    // Normalise response as JSON
    let responseBody;
    try {
      const contentType = workerResponse.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        responseBody = await workerResponse.text();
      } else {
        const text = await workerResponse.text();
        responseBody = JSON.stringify({ error: text || "Unknown error occurred" });
      }
    } catch (error) {
      return new Response(JSON.stringify({
        error: "Failed to read Worker response",
        debug: error.message
      }), { status: 502, headers: { "Content-Type": "application/json" } });
    }

    // Pass through the Worker’s status
    return new Response(responseBody, {
      status: workerResponse.status,
      headers: {
        "Content-Type": "application/json",
        // CORS (tighten to your site origin if you prefer)
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: "Internal server error",
      debug: error.message
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

// Preflight CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    }
  });
}

// GET diagnostics (no secrets)
export async function onRequestGet({ env }) {
  return new Response(JSON.stringify({
    status: "Pages Function is running",
    hasWorkerUrl: !!env.WORKER_URL,
    workerUrlPreview: env.WORKER_URL ? env.WORKER_URL.slice(0, 60) + "..." : "NOT SET",
    timestamp: new Date().toISOString()
  }, null, 2), { status: 200, headers: { "Content-Type": "application/json" } });
}