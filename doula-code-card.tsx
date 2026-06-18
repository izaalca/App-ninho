'use client'

import { useState } from 'react'
import { DOULA_CODE } from '@/lib/ninho-config'
import { Check, Copy, Users } from 'lucide-react'

export function DoulaCodeCard({ linkedCount }: { linkedCount: number }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(DOULA_CODE)
    } catch {
      // Ambiente sem clipboard — ignora silenciosamente
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section
      aria-label="Meu código de doula"
      className="rounded-[28px] border border-primary/30 bg-primary/10 p-5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="text-xs font-medium uppercase tracking-wide text-primary/80">
            Meu Código de Doula
          </p>
          <p className="mt-1 font-serif text-2xl font-semibold tracking-wide text-foreground">
            {DOULA_CODE}
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar código"
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm transition-transform active:scale-95"
        >
          {copied ? (
            <Check className="size-5" aria-hidden="true" />
          ) : (
            <Copy className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-card/70 px-3 py-2.5">
        <Users className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          Gestantes vinculadas por este código:{' '}
          <span className="font-semibold text-foreground">{linkedCount}</span>
        </p>
      </div>

      <p
        aria-live="polite"
        className="mt-2 h-4 text-center text-xs font-medium text-primary"
      >
        {copied ? 'Código copiado!' : ''}
      </p>
    </section>
  )
}
