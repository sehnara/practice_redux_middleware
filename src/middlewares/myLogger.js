const myLogger = (store) => (next) => (action) => {
  console.log(action)
  console.log(store.getState())
  const result = next(action)
  return result
}
export default myLogger
