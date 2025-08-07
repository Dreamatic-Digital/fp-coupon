// functions/api/redeem-coupon.js
// Cloudflare Pages Function that securely proxies to your Worker
// Added extensive debugging and error handling

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    console.log('Pages Function called - checking environment variables...');
    
    // Debug: Check if environment variables are set
    const requiredEnvVars = ['WORKER_URL', 'API_KEY', 'BASIC_AUTH_USER', 'BASIC_AUTH_PASS'];
    const missingVars = requiredEnvVars.filter(varName => !env[varName]);
    
    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars);
      return new Response(JSON.stringify({ 
        error: `Missing environment variables: ${missingVars.join(', ')}`,
        debug: 'Check your Pages environment variable configuration'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log('Environment variables OK. Worker URL:', env.WORKER_URL);
    
    // Get the request body
    let requestBody;
    try {
      requestBody = await request.text();
      console.log('Request body received:', requestBody);
    } catch (error) {
      console.error('Failed to read request body:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to read request body',
        debug: error.message
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate request body is JSON
    try {
      JSON.parse(requestBody);
    } catch (error) {
      console.error('Invalid JSON in request body:', error);
      return new Response(JSON.stringify({ 
        error: 'Invalid JSON in request body',
        debug: error.message
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log('Making request to Worker...');
    
    // Forward request to your Cloudflare Worker with authentication
    let workerResponse;
    try {
      workerResponse = await fetch(env.WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${env.BASIC_AUTH_USER}:${env.BASIC_AUTH_PASS}`)}`,
          'x-api-key': env.API_KEY,
          // Forward useful client info to Worker
          'CF-Connecting-IP': request.headers.get('CF-Connecting-IP') || 'unknown',
          'User-Agent': request.headers.get('User-Agent') || 'Pages-Function'
        },
        body: requestBody
      });
      
      console.log('Worker responded with status:', workerResponse.status);
      
    } catch (error) {
      console.error('Failed to fetch from Worker:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to communicate with Worker',
        debug: error.message,
        workerUrl: env.WORKER_URL
      }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get response body
    let responseBody;
    try {
      const contentType = workerResponse.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseBody = await workerResponse.text();
        console.log('Worker response body:', responseBody);
      } else {
        // Handle non-JSON responses
        const text = await workerResponse.text();
        console.log('Worker non-JSON response:', text);
        responseBody = JSON.stringify({ error: text || 'Unknown error occurred' });
      }
    } catch (error) {
      console.error('Failed to read Worker response:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to read Worker response',
        debug: error.message
      }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Return the Worker's response to the client
    return new Response(responseBody, {
      status: workerResponse.status,
      headers: {
        'Content-Type': 'application/json',
        // Add CORS headers
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error('Pages Function unexpected error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      debug: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle preflight CORS requests
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

// Add a GET endpoint for debugging
export async function onRequestGet(context) {
  const { env } = context;
  
  return new Response(JSON.stringify({
    status: 'Pages Function is running',
    environmentCheck: {
      hasWorkerUrl: !!env.WORKER_URL,
      hasApiKey: !!env.API_KEY,
      hasBasicAuthUser: !!env.BASIC_AUTH_USER,
      hasBasicAuthPass: !!env.BASIC_AUTH_PASS,
      workerUrl: env.WORKER_URL ? env.WORKER_URL.substring(0, 30) + '...' : 'NOT SET'
    },
    timestamp: new Date().toISOString()
  }, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}