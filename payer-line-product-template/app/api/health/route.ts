import { PAYERS } from '@shared/payers'
import { credentialStatus } from '@server/env'

export const runtime = 'nodejs'

export async function GET() {
  return Response.json({ ok: true, credentials: credentialStatus(), payers: PAYERS })
}
