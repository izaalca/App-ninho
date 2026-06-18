'use client'

import { cn } from '@/lib/utils'
import { PROFILES, type ProfileKey } from '@/lib/ninho-config'
import { Stethoscope, HeartHandshake } from 'lucide-react'

const PROFILE_ICONS = {
  doula: Stethoscope,
  gestante: HeartHandshake,
} as const

export function ProfileSwitcher({
  active,
  onChange,
}: {
  active: ProfileKey
  onChange: (key: ProfileKey) => void
}) {
  return (
    <div
      role="tablist"
      aria-label="Selecionar perfil"
      className="flex w-full items-center gap-1.5 rounded-full bg-secondary/70 p-1.5"
    >
      {(Object.keys(PROFILES) as ProfileKey[]).map((key) => {
        const profile = PROFILES[key]
        const Icon = PROFILE_ICONS[key]
        const isActive = active === key
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(key)}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold transition-all',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{profile.label}</span>
          </button>
        )
      })}
    </div>
  )
}
