import { Image } from "../../types/Image";

/**
 * @param prev 
 * @param curr 
 * @returns false is there are changes, true if it is unchanged
 */
export function stringDataCheck(prev: string, curr: string): boolean {
  if (prev === curr) return true
  return false
}
/**
 * @param prev 
 * @param curr 
 * @returns false is there are changes, true if it is unchanged
 */
export function numberDataCheck(prev: number, curr: number): boolean {
  if (prev === curr) return true
  return false
}

export function arrayImageDataCheck(prev: Image[], curr: Image[]): boolean {
  const sameLength = prev.length === curr.length ? true : false;
  
  // Possibly re-arranged
  if (sameLength == true) {
    let status = sameLength;
    for(let i = 0; i < curr.length; i++) {
      if (curr[i].name !== prev[i].name) {
        status = false;
        break
      }
    }

    return status;
  }

  return sameLength
}