type FetchHeaders = {
  'Content-Type': string;
}

type FetchConfig = {
  method: string;
  headers: FetchHeaders;
  body?: string;
}

/**
 * 
 * @param endpoint based on new URL
 * @param method POST, GET, UPDATE, etc.
 * @param body stringified json
 */
export default async function butter(endpoint: URL, method: string, body: string | null = null) {
  const config: FetchConfig = {
    method: (method).toUpperCase(),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (body) config.body = body
  
  const toast = await fetch(endpoint, config)
  // debugger
  return toast
}