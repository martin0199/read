import localForage from 'localforage'
export const setForage = (key: string, data: any) => {
  localForage.setItem(key, data)
}
export const getForage = (key: string, callback: any) => {
  localForage.getItem(key, (err, value) => callback(err, value))
}
export const delectForage = (key: string, success: any, error: any) => {
  localForage.removeItem(key).then((val) => {
    if (success) success(val)
  }).catch((err) => {
    if (error) error(err)
  })
}
export const clearForage = (success: any, error: any) => {
  localForage.clear().then((val) => {
    if (success) success(val)
  }).catch((err) => {
    if (error) error(err)
  })
}
export const lengthLocalForage = (cb: any) => {
  localForage.length().then(
    numberOfKeys => {
      if (cb) cb(numberOfKeys)
    }
  )
}
