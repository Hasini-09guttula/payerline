import { cn } from '@/lib/utils'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'relative flex size-7 items-center justify-center rounded-lg',
          inverted ? 'bg-ink-foreground text-ink' : 'bg-primary text-primary-foreground',
        )}
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M3 12h4l2-5 4 10 2-5h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={cn('text-lg font-semibold tracking-tight', inverted ? 'text-ink-foreground' : 'text-foreground')}>
        PayerLine
      </span>
    </span>
  )
}
