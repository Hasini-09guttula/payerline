import type { AdmissionCase, OutcomeInput, ReviewDecision, ReviewResponse } from "@shared/types.ts";
import { payerById } from "@shared/payers.ts";
import { recallCase, reflectCase, retainOutcome } from "./hindsight.ts";

export async function reviewAdmission(admission: AdmissionCase): Promise<ReviewResponse> {
  const payer = payerById(admission.payerId);
  const query = caseQuery(admission, payer.name);
  const [recalled, reflection] = await Promise.all([
    recallCase(admission.payerId, query),
    reflectCase(admission.payerId, query),
  ]);

  return {
    payer,
    bankId: payer.bankId,
    reviewedAt: new Date().toISOString(),
    recalled,
    decision: normalizeDecision(reflection.structured, reflection.narrative, reflection.basedOn),
  };
}

export async function recordOutcome(input: OutcomeInput): Promise<{ documentId: string }> {
  const payer = payerById(input.payerId);
  const admission = input.caseSnapshot;
  const documentId = `live-${payer.id}-${Date.now()}`;
  const content = [
    `On ${new Date().toISOString()} the cashless desk recorded a ${input.outcome} from ${payer.name}.`,
    `Patient ${admission.patientName}, ${admission.procedure}, diagnosis ${admission.diagnosis}.`,
    `Package name submitted: "${admission.packageName}".`,
    `Ultrasound attached: ${yesNo(admission.ultrasoundAttached)}. Ultrasound date on hospital letterhead: ${yesNo(admission.ultrasoundDateOnLetterhead)}.`,
    `Culture report attached: ${yesNo(admission.cultureReportAttached)}. Culture contradicted the diagnosis: ${yesNo(admission.cultureContradictsDiagnosis)}.`,
    `Fitness certificate attached: ${yesNo(admission.fitnessCertificateAttached)}. Fitness certificate age in days: ${admission.fitnessCertificateAgeDays}.`,
    `Desk reason: ${input.reason.trim()}`,
    `This outcome is evidence for the next ${payer.name} file of the same procedure.`,
  ].join("\n");

  await retainOutcome({
    payerId: input.payerId,
    content,
    documentId,
    tags: ["procedure:cholecystectomy", `outcome:${input.outcome}`, "source:live"],
  });
  return { documentId };
}

function caseQuery(admission: AdmissionCase, payerName: string): string {
  return [
    `Today's cashless file at St. Brigid Memorial is for ${payerName}.`,
    `Patient: ${admission.patientName}, age ${admission.age}, MRN ${admission.mrn}.`,
    `Diagnosis: ${admission.diagnosis}.`,
    `Procedure: ${admission.procedure}.`,
    `Package name on the form: "${admission.packageName}".`,
    `Ultrasound attached: ${yesNo(admission.ultrasoundAttached)}.`,
    `Ultrasound date printed on hospital letterhead: ${yesNo(admission.ultrasoundDateOnLetterhead)}.`,
    `Culture report attached: ${yesNo(admission.cultureReportAttached)}.`,
    `Culture report contradicts the diagnosis: ${yesNo(admission.cultureContradictsDiagnosis)}.`,
    `Physician fitness certificate attached: ${yesNo(admission.fitnessCertificateAttached)}.`,
    `Fitness certificate age in days: ${admission.fitnessCertificateAgeDays}.`,
    "Decide whether the desk should hold or send this file.",
    "Use only this insurer's history.",
    "If the written policy would allow the file but past outcomes would not, hold it and set policy_conflict true.",
    "fixes are concrete document changes.",
    "do_not_add lists documents that previously caused a query or a denial.",
    "evidence lists the dated past outcomes you relied on.",
    "confidence is thin below two agreeing outcomes, moderate at two, and strong at three or more.",
  ].join("\n");
}

function normalizeDecision(
  structured: Record<string, unknown> | null,
  narrative: string,
  basedOn: ReviewDecision["basedOn"],
): ReviewDecision {
  const decision = structured?.decision === "send" ? "send" : "hold";
  const confidence = ["thin", "moderate", "strong"].includes(String(structured?.confidence))
    ? (structured?.confidence as ReviewDecision["confidence"])
    : "thin";
  return {
    decision,
    confidence,
    policyConflict: Boolean(structured?.policy_conflict),
    summary: stringField(structured?.summary, narrative.slice(0, 420)),
    fixes: stringList(structured?.fixes),
    doNotAdd: stringList(structured?.do_not_add),
    evidence: stringList(structured?.evidence),
    narrative,
    basedOn,
  };
}

function stringField(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function yesNo(value: boolean): string {
  return value ? "yes" : "no";
}
