export function extractErrorMessage(err: any, defaultMsg: string): string {
  const msg = err?.response?.data?.message
  if (typeof msg === 'string') {
    return msg
  }
  if (Array.isArray(msg)) {
    return msg.join(', ')
  }
  return defaultMsg
}
