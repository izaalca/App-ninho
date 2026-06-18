'use client'

import type { TabItem } from '@/lib/ninho-config'

export function TabPlaceholder({ tab }: { tab: TabItem }) {
  const Icon = tab.icon
  return (
    <section
      role="tabpanel"
      aria-label={tab.label}
      className="rounded-[28px] border border-border bg-card p-8 text-center shadow-sm"
    >
      <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-secondary text-primary">
        <Icon className="size-7" aria-hidden="true" />
      </div>
      <h2 className="mt-5 font-serif text-2xl font-semibold text-balance text-foreground">
        {tab.label}
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-pretty leading-relaxed text-muted-foreground">
        {tab.description}
      </p>
      <p className="mt-6 inline-flex items-center rounded-full bg-secondary/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Em breve
      </p>
    </section>
  )
}
