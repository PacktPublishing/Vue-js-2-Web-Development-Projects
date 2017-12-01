
export function promise (func, context, ...args) {
  return new Promise((resolve, reject) => {
    func.call(context, ...args, (err, ...result) => {
      if (err) {
        reject(err)
      } else {
        resolve(...result)
      }
    })
  })
}

export function promiseMethod (object, name, ...args) {
  return promise(object[name], object, ...args)
}
