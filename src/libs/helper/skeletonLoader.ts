export default function skeletonLoader(time: number = 3000): Promise<boolean> {
  return new Promise(function(resolve) {
    setTimeout(() => {
      resolve(false)
    }, time)
  })
}