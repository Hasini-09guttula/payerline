import type { AdmissionCase } from '@shared/types'
import { reviewAdmission } from '@server/review'
import { jsonError } from '@/lib/desk-errors'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const admission = (await request.json()) as AdmissionCase
    if (!admission?.payerId || !admission.patientName?.trim() || !admission.procedure?.trim()) {
      return Response.json(
        { error: 'Enter the patient name and procedure before reviewing.' },
        { status: 400 },
      )
    }
    const review = await reviewAdmission(admission)
    return Response.json(review)
  } catch (error) {
    return jsonError(error)
  }
}
