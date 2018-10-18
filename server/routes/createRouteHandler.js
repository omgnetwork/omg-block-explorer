export default function createRouteHandler (fn) {
  return async (req, res) => {
    const { success, data, error } = await fn(req, res)
    res.send({ success, data, error })
  }
}
