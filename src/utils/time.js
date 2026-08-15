// A JS Date has no intrinsic timezone — these helpers re-derive wall-clock
// values for an arbitrary IANA zone via Intl, which is the only reliable
// cross-browser way to do zone math without a date library.

const partsCache = new Map()

function getFormatter(timeZone) {
  let formatter = partsCache.get(timeZone)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    partsCache.set(timeZone, formatter)
  }
  return formatter
}

export function getZonedParts(date, timeZone) {
  const parts = getFormatter(timeZone).formatToParts(date)
  const map = {}
  for (const part of parts) {
    if (part.type !== 'literal') map[part.type] = part.value
  }
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour === '24' ? '0' : map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
    ms: date.getMilliseconds(),
  }
}

export function getUtcOffsetLabel(date, timeZone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'shortOffset',
  })
  const part = formatter.formatToParts(date).find((p) => p.type === 'timeZoneName')
  return part ? part.value.replace('GMT', 'UTC') : ''
}

export function getZoneAbbreviation(date, timeZone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'short',
  })
  const part = formatter.formatToParts(date).find((p) => p.type === 'timeZoneName')
  return part ? part.value : timeZone
}

export function formatDigitalTime(date, timeZone, hourCycle /* '12' | '24' */) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: hourCycle === '12',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

export function formatDateLabel(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatHHMM(date, timeZone) {
  const { hour, minute } = getZonedParts(date, timeZone)
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

export function guessLocalTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return 'UTC'
  }
}
