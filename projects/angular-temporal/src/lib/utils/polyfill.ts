import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill"

declare global {
  interface Date {
    toTemporalInstant?: typeof toTemporalInstant;
  }
}

// Add toTemporalInstant to Date.prototype if it doesn't exist
if (!Date.prototype.toTemporalInstant) {
  Date.prototype.toTemporalInstant = toTemporalInstant
}

// Export Temporal from the polyfill
export { Temporal, Intl }

