import { extractAdmission } from '@server/groq'
import { jsonError } from '@/lib/desk-errors'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const note = String(body?.note ?? '')
    if (note.trim().length < 20) {
      return Response.json({ error: 'The clinical note is too short to read.' }, { status: 400 })
    }
    const fields = await extractAdmission(note)
    return Response.json({ fields })
  } catch (error) {
    return jsonError(error)
  }
}
