// functions/api/redeem-coupon.js
// Cloudflare Pages Function that securely proxies to your Worker

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // Get the request body
    const requestBody = await request.text();
    
    // Validate that request came from your domain (optional security layer)
    const origin = request.headers.get('Origin') || request.headers.get('Referer');
    const allowedOrigins = [
      `https://${env.PAGES_DOMAIN}`, // Your Pages domain
      `https://www.${env.PAGES_DOMAIN}`,
      'http://localhost:3000', // For development
      'http://127.0.0.1:3000'  // For development
    ];
    
    // Uncomment this if you want strict origin checking
    // if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    //   return new Response(JSON.stringify({ error: 'Unauthorized origin' }), {
    //     status: 403,
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // }
    
    // Forward request to your Cloudflare Worker with authentication
    const workerResponse = await fetch(env.WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${env.BASIC_AUTH_USER}:${env.BASIC_AUTH_PASS}`)}`,
        'x-api-key': env.API_KEY,
        // Forward useful client info to Worker
        'CF-Connecting-IP': request.headers.get('CF-Connecting-IP'),
        'User-Agent': request.headers.get('User-Agent')
      },
      body: requestBody
    });
    
    // Get response body
    let responseBody;
    const contentType = workerResponse.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      responseBody = await workerResponse.text();
    } else {
      // Handle non-JSON responses
      const text = await workerResponse.text();
      responseBody = JSON.stringify({ error: text || 'Unknown error occurred' });
    }
    
    // Return the Worker's response to the client
    return new Response(responseBody, {
      status: workerResponse.status,
      headers: {
        'Content-Type': 'application/json',
        // Add CORS headers if needed
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error('Pages Function error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle preflight CORS requests if needed
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}