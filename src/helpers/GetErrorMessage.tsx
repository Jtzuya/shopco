export default function GetErrorMessage(error: unknown) {
  if(navigator && navigator.onLine) {
    // console.log({
    //   code: 'SERVER_CONNECTION_PROBLEM',
    //   message: 'Server connection failure...'
    // })
    return 'Something went wrong on our end. Please report it to our customer support jtzuya@gmail.com'
  } else if (navigator && !navigator.onLine) { // if there is a problem with internet
    // console.log({
    //   code: 'INTERNET_CONNECTION_ERROR',
    // })
    return 'there is a problem with your INTERNET, god damn it...'
  }

  if (error instanceof Error) {
    return error.message
  } 
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  } 

  if (typeof error === 'string') {
    return error
  }

  return 'Unknown Error'
}