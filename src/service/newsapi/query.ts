export const buildQueryString = (params: Record<string, unknown>): string => {
  const sp = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    sp.append(key, String(value))
  })
  const qs = sp.toString()
  return qs ? `?${qs}` : ''
}
