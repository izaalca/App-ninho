'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNinhoData } from '@/lib/ninho-data'
import { GestanteDetail } from './gestante-detail'

export function GestantesTab() {
  const { gestantes } = useNinhoData()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = gestantes.find((g) => g.id === selectedId) ?? null

  if (selected) {
    return (
      <GestanteDetail gestante={selected} onBack={() => setSelectedId(null)} />
    )
  }

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          Minhas gestantes
        </h2>
        <p className="text-sm text-muted-foreground">
          Toque em uma gestante para abrir o acompanhamento completo.
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {gestantes.map((g) => (
          <li key={g.id}>
            <button
              type="button"
              onClick={() => setSelectedId(g.id)}
              className="flex w-full items-center gap-4 rounded-[24px] border border-border bg-card p-4 text-left shadow-sm transition-colors hover:border-primary/40"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 font-serif text-lg font-semibold text-primary">
                {g.nome.charAt(0)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-foreground">
                  {g.nome}
                </span>
                <span className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {g.semanas} semanas
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                      g.status === 'Ativa'
                        ? 'bg-primary/15 text-primary'
                        : 'bg-accent/20 text-accent-foreground',
                    )}
                  >
                    {g.status}
                  </span>
                </span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
