type ClassValue = string | number | boolean | null | undefined | ClassValue[] | Record<string, boolean>

export function cn(...values: ClassValue[]) {
  return values
    .flatMap((value): string[] => {
      if (!value) return []
      if (Array.isArray(value)) return [cn(...value)]
      if (typeof value === 'object') {
        return Object.entries(value)
          .filter(([, enabled]) => enabled)
          .map(([className]) => className)
      }
      return [String(value)]
    })
    .filter(Boolean)
    .join(' ')
}
