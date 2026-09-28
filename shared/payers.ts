import type { Payer, PayerId } from "./types.ts";

export const PAYERS: Payer[] = [
  {
    id: "meridian",
    bankId: "payerline-meridian",
    name: "Meridian Health Assurance",
    shortName: "Meridian",
    deskCode: "MHA-04",
    posture: "Written rules look permissive. Past denials turn on letterhead dates and the exact package name.",
    writtenPolicy: [
      "An ultrasound report is required for laparoscopic cholecystectomy.",
      "Any clinically reasonable package name is acceptable.",
      "Additional laboratory reports are welcome and do not delay approval.",
    ],
  },
  {
    id: "northline",
    bankId: "payerline-northline",
    name: "Northline General Insurance",
    shortName: "Northline",
    deskCode: "NGI-17",
    posture: "The checklist is short. Clearance actually depends on a fresh laboratory panel and a recent fitness note.",
    writtenPolicy: [
      "Submit the standard surgical package with supporting clinical notes.",
      "Imaging may be attached when available. Letterhead format is not specified.",
      "Pre-operative investigations follow the hospital’s own protocol.",
    ],
  },
];

export function payerById(id: PayerId): Payer {
  const payer = PAYERS.find((item) => item.id === id);
  if (!payer) {
    throw new Error(`Unknown payer: ${id}`);
  }
  return payer;
}
