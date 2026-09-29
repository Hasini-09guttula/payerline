import { MissingConfigError } from '@server/env'
import { explainHindsightError } from '@server/hindsight'

export function jsonError(error: unknown): Response {
  if (error instanceof MissingConfigError) {
    return Response.json({ error: error.message, missing: error.missing }, { status: error.status })
  }
  const hindsightError = explainHindsightError(error)
  if (hindsightError) {
    return Response.json({ error: hindsightError.message }, { status: hindsightError.status })
  }
  const message = error instanceof Error ? error.message : 'The desk could not complete that request.'
  return Response.json({ error: message }, { status: 500 })
}
