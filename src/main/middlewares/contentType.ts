export const contentType = (req: any, res: any, next: () => void): any => {
  res.type('json')
  next()
}
