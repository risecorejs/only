export default function (body: Record<string, any>, key: string) {
  const value = body[key]

  return {
    exists: value !== undefined,
    value
  }
}
