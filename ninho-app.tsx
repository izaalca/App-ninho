'use client'

import { useState } from 'react'
import { PROFILES, DOULA_CODE, type ProfileKey } from '@/lib/ninho-config'
import { ProfileSwitcher } from './profile-switcher'
import { TabBar } from './tab-bar'
import { TabPlaceholder } from './tab-placeholder'
import { AuthScreen } from './auth-screen'
import { DoulaCodeCard } from './doula-code-card'
import { GestanteLinkCard } from './gestante-link-card'
import { LogOut } from 'lucide-react'

const BASE_LINKED_COUNT = 3

export function NinhoApp() {
  // Estado local unificado client-side
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [profile, setProfile] = useState<ProfileKey>('doula')
  const [activeTab, setActiveTab] = useState<Record<ProfileKey, string>>({
    doula: PROFILES.doula.tabs[0].id,
    gestante: PROFILES.gestante.tabs[0].id,
  })
  // Vínculo entre gestante e doula (compartilhamento de dados síncronos)
  const [isLinked, setIsLinked] = useState(false)
  const [linkedCount, setLinkedCount] = useState(BASE_LINKED_COUNT)

  function handleLink() {
    setIsLinked((prev) => {
      if (!prev) setLinkedCount((c) => c + 1)
      return true
    })
  }

  function handleAuthenticated(selected: ProfileKey, inviteCode?: string) {
    // Se a gestante já informou um código válido no cadastro, vincula direto
    if (
      selected === 'gestante' &&
      inviteCode?.trim().toUpperCase() === DOULA_CODE
    ) {
      handleLink()
    }
    setProfile(selected)
    setIsAuthenticated(true)
  }

  function handleLogout() {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={handleAuthenticated} />
  }

  const currentProfile = PROFILES[profile]
  const currentTabId = activeTab[profile]
  const currentTab =
    currentProfile.tabs.find((t) => t.id === currentTabId) ??
    currentProfile.tabs[0]

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
      <header className="sticky top-0 z-10 border-b border-border/70 bg-background/85 px-5 pb-4 pt-6 backdrop-blur-md">
        <div className="mb-4 flex items-center gap-3">
          <img
            src="/icon-ninho.png"
            alt="Logo Ninho Doula"
            className="size-10 rounded-2xl object-cover shadow-sm"
          />
          <div className="leading-tight">
            <h1 className="font-serif text-xl font-semibold text-foreground">
              Ninho Doula
            </h1>
            <p className="text-xs text-muted-foreground">
              {currentProfile.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <LogOut className="size-3.5" aria-hidden="true" />
            Sair (Logoff)
          </button>
        </div>

        <ProfileSwitcher active={profile} onChange={setProfile} />
      </header>

      <main className="flex flex-1 flex-col gap-5 px-5 py-5">
        {profile === 'doula' && <DoulaCodeCard linkedCount={linkedCount} />}

        <TabBar
          tabs={currentProfile.tabs}
          activeId={currentTab.id}
          onChange={(id) =>
            setActiveTab((prev) => ({ ...prev, [profile]: id }))
          }
        />

        {profile === 'gestante' && currentTab.id === 'inicio' && (
          <GestanteLinkCard isLinked={isLinked} onLink={handleLink} />
        )}

        <TabPlaceholder tab={currentTab} />
      </main>

      <footer className="px-5 pb-8 pt-2 text-center text-xs text-muted-foreground">
        Feito com carinho para acompanhar cada gestação.
      </footer>
    </div>
  )
}
