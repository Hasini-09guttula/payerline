'use client'

import { patient as defaultPatient, type Gender } from './data'
import { usePatient, type PatientFile } from './patient-context'

const genders: Gender[] = ['Female', 'Male', 'Other']

export function PatientIntake() {
  const { patient, setPatient } = usePatient()

  const update = <K extends keyof PatientFile>(key: K, value: PatientFile[K]) => {
    setPatient({ ...patient, [key]: value })
  }

  return (
    <section id="patient" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 md:px-8 md:py-32">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-success">Patient file</p>
        <h2 className="mt-4 text-balance font-serif text-4xl leading-tight md:text-6xl">
          The desk opens on {defaultPatient.name}.
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Change the name, age, or the rest of the file. The first page and the live check use what is entered here.
        </p>
      </div>

      <form className="mt-14 grid gap-5 rounded-2xl border bg-card p-6 shadow-[0_20px_60px_-30px_oklch(0.22_0.035_258/0.25)] md:grid-cols-2 md:p-8" onSubmit={(event) => event.preventDefault()}>
        <Field label="Full name" value={patient.name} onChange={(value) => update('name', value)} />
        <Field label="Age" type="number" value={String(patient.age)} onChange={(value) => update('age', Number(value) || 0)} />
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Gender</span>
          <select
            value={patient.gender}
            onChange={(event) => update('gender', event.target.value as Gender)}
            className="mt-2 h-12 w-full rounded-xl border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>
        <Field label="MRN" value={patient.mrn} onChange={(value) => update('mrn', value)} />
        <Field label="Ward" value={patient.ward} onChange={(value) => update('ward', value)} />
        <Field label="Scheduled" value={patient.scheduledAt} onChange={(value) => update('scheduledAt', value)} />
        <Field label="Diagnosis" value={patient.diagnosis} onChange={(value) => update('diagnosis', value)} />
        <Field label="Procedure" value={patient.procedure} onChange={(value) => update('procedure', value)} />
      </form>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </label>
  )
}
