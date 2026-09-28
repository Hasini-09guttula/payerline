import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

type Beat = { time: string; title: string; body: string; tone?: 'bad' | 'good' | 'neutral' }

const without: Beat[] = [
  { time: '07:30', title: 'Ananya is admitted', body: 'Acute calculus cholecystitis. Laparoscopic cholecystectomy is booked for tomorrow.' },
  { time: '08:10', title: 'Packet looks complete', body: 'Ultrasound is attached. The package says “management”. A culture report is included.' },
  { time: '08:40', title: 'Written policy says send', body: 'Meridian’s checklist asks for an ultrasound and accepts a reasonable package name.' },
  { time: '10:25', title: 'Meridian holds the file', body: 'The scan date is not on hospital letterhead, and “management” is not the procedure name.', tone: 'bad' },
  { time: '11:10', title: 'A second query arrives', body: 'The culture shows no growth and an unrelated finding. The theatre slot is at risk.', tone: 'bad' },
]

const withPayerline: Beat[] = [
  { time: '07:30', title: 'Ananya is admitted', body: 'Same patient, same surgery, same Meridian policy.' },
  { time: '08:10', title: 'Only the Meridian bank opens', body: 'Northline’s history stays closed. The two insurers have denied opposite papers.' },
  { time: '08:12', title: 'Memory says hold', body: 'Rename the package, put the scan date on letterhead, and leave the contradictory culture out.', tone: 'neutral' },
  { time: '08:28', title: 'Desk corrects the packet', body: 'A person still sends the file. PayerLine does not diagnose and does not submit it.', tone: 'good' },
  { time: '09:15', title: 'The reply is written back', body: 'Whatever Meridian does is retained, so the next identical file is judged on newer evidence.', tone: 'good' },
]

function Track({ label, beats, variant }: { label: string; beats: Beat[]; variant: 'without' | 'with' }) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6 md:p-8',
        variant === 'with' ? 'bg-card shadow-[0_20px_60px_-30px_oklch(0.6_0.13_162/0.45)]' : 'bg-secondary/50',
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</h3>
        <span
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-medium',
            variant === 'with' ? 'bg-accent text-accent-foreground' : 'bg-destructive/10 text-destructive',
          )}
        >
          {variant === 'with' ? 'Held, then corrected' : 'Policy said send'}
        </span>
      </div>
      <ol className="relative mt-8 space-y-7 before:absolute before:bottom-2 before:left-[4.125rem] before:top-2 before:w-px before:bg-border">
        {beats.map((beat, i) => (
          <Reveal as="li" key={beat.time + beat.title} delay={i * 90} className="relative grid grid-cols-[2.75rem_1.25rem_1fr] items-start gap-3">
            <span className="pt-0.5 font-mono text-xs tabular-nums text-muted-foreground">{beat.time}</span>
            <span
              className={cn(
                'relative z-10 mt-0.5 flex size-5 items-center justify-center rounded-full border-2 bg-background',
                beat.tone === 'bad' && 'border-destructive bg-destructive text-primary-foreground',
                beat.tone === 'good' && 'border-success bg-success text-success-foreground',
                beat.tone === 'neutral' && 'border-warning bg-warning text-warning-foreground',
                !beat.tone && 'border-border',
              )}
              aria-hidden="true"
            >
              {beat.tone === 'bad' && <X className="size-3" />}
              {beat.tone === 'good' && <Check className="size-3" />}
              {beat.tone === 'neutral' && <span className="text-[10px] font-bold">!</span>}
            </span>
            <div>
              <p className="font-medium">{beat.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{beat.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

export function MorningTimeline() {
  return (
    <section id="moment" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 md:px-8 md:py-32">
      <Reveal className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-success">The moment that matters</p>
        <h2 className="mt-4 text-balance font-serif text-4xl leading-tight md:text-6xl">
          The checklist is complete. Meridian still denies it.
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Mrs. Ananya Rao’s ultrasound is in the packet. Written policy would let it go. Past Meridian outcomes
          would not — and Northline would ask for a different set of papers entirely.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Track label="Without PayerLine" beats={without} variant="without" />
        <Track label="With PayerLine" beats={withPayerline} variant="with" />
      </div>
    </section>
  )
}
