'use client'

import { useState } from 'react'
import { DOULA_CODE } from '@/lib/ninho-config'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  HeartHandshake,
  Link2,
  CheckCircle2,
  BookHeart,
  CalendarHeart,
  Timer,
} from 'lucide-react'

export function GestanteLinkCard({
  isLinked,
  onLink,
}: {
  isLinked: boolean
  onLink: () => void
}) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (code.trim().toUpperCase() === DOULA_CODE) {
      setError(false)
      onLink()
    } else {
      setError(true)
    }
  }

  if (isLinked) {
    return (
      <section
        aria-label="Doula vinculada"
        className="rounded-[28px] border border-primary/30 bg-primary/10 p-6 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <CheckCircle2 className="size-6" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Doula Vinculada!
            </h2>
            <p className="text-sm text-muted-foreground">
              Seus dados agora são compartilhados com a sua profissional.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-2.5">
          <SyncRow icon={BookHeart} label="Diário" />
          <SyncRow icon={CalendarHeart} label="Agenda" />
          <SyncRow icon={Timer} label="Relatório de Contrações" />
        </div>
      </section>
    )
  }

  return (
    <section
      aria-label="Vincular sua doula"
      className="rounded-[28px] border border-border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
          <HeartHandshake className="size-6" aria-hidden="true" />
        </div>
        <h2 className="font-serif text-xl font-semibold text-balance text-foreground">
          Vincule sua Doula
        </h2>
      </div>

      <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
        Insira o código recebido da sua profissional para sincronizar seus
        diários, agendas e relatórios.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <Input
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            if (error) setError(false)
          }}
          placeholder="Ex.: DOULA-1806"
          aria-label="Código da doula"
          aria-invalid={error}
          className="h-12 rounded-2xl text-center text-base font-semibold tracking-wide uppercase"
        />

        {error && (
          <p className="text-center text-xs font-medium text-destructive">
            Código inválido. Confira com a sua doula e tente novamente.
          </p>
        )}

        <Button type="submit" size="lg" className="w-full rounded-2xl">
          <Link2 className="size-4" aria-hidden="true" />
          Vincular
        </Button>
      </form>
    </section>
  )
}

function SyncRow({
  icon: Icon,
  label,
}: {
  icon: typeof BookHeart
  label: string
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-card/70 px-4 py-3">
      <div className="flex items-center gap-2.5">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
        <CheckCircle2 className="size-3.5" aria-hidden="true" />
        Sincronizado
      </span>
    </div>
  )
}
