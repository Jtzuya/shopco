let server_origin = import.meta.env.REACT_APP_SERVER_DEVELOPMENT;

if (import.meta.env.REACT_APP_NODE_ENV === 'production') {
  server_origin = import.meta.env.REACT_APP_SERVER_PRODUCTION 
} 

export { server_origin }