'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { type ProfileKey } from '@/lib/ninho-config'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Stethoscope, HeartHandshake } from 'lucide-react'

type AuthMode = 'entrar' | 'criar'

export function AuthScreen({
  onAuthenticated,
}: {
  onAuthenticated: (profile: ProfileKey, inviteCode?: string) => void
}) {
  const [mode, setMode] = useState<AuthMode>('entrar')
  const [profile, setProfile] = useState<ProfileKey>('doula')
  const [inviteCode, setInviteCode] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Autenticação simulada — redireciona conforme o perfil escolhido
    // Repassa o código de convite apenas no cadastro de gestante
    const code =
      mode === 'criar' && profile === 'gestante' ? inviteCode : undefined
    onAuthenticated(profile, code)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-[2rem] border border-border/70 bg-card p-7 shadow-[0_20px_60px_-25px_rgba(120,70,45,0.35)]">
          {/* Logo + título */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/icon-ninho.png"
              alt="Logo Ninho Doula"
              className="size-16 rounded-3xl object-cover shadow-sm"
            />
            <h1 className="mt-4 text-balance font-serif text-2xl font-semibold leading-tight text-foreground">
              Ninho Doula
            </h1>
            <p className="mt-1 text-pretty text-sm text-muted-foreground">
              Acompanhamento de Gestantes
            </p>
          </div>

          {/* Abas Entrar / Criar Conta */}
          <div
            role="tablist"
            aria-label="Modo de acesso"
            className="mt-6 flex items-center gap-1.5 rounded-full bg-secondary/70 p-1.5"
          >
            {(
              [
                { id: 'entrar', label: 'Entrar' },
                { id: 'criar', label: 'Criar Conta' },
              ] as const
            ).map((tab) => {
              const isActive = mode === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setMode(tab.id)}
                  className={cn(
                    'flex-1 rounded-full px-3 py-2.5 text-sm font-semibold transition-all',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Seletor de perfil (Segmented Control) */}
          <div className="mt-5">
            <span className="mb-2 block text-xs font-medium text-muted-foreground">
              Selecione o seu perfil
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {(
                [
                  { key: 'doula', label: 'Sou Doula', icon: Stethoscope },
                  {
                    key: 'gestante',
                    label: 'Sou Gestante',
                    icon: HeartHandshake,
                  },
                ] as const
              ).map((opt) => {
                const isActive = profile === opt.key
                const Icon = opt.icon
                return (
                  <button
                    key={opt.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setProfile(opt.key)}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-semibold transition-all',
                      isActive
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{opt.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {mode === 'criar' && (
              <Field id="nome" label="Nome Completo">
                <Input id="nome" type="text" placeholder="Seu nome completo" />
              </Field>
            )}

            <Field id="email" label="E-mail">
              <Input
                id="email"
                type="email"
                placeholder="voce@exemplo.com"
                autoComplete="email"
              />
            </Field>

            {mode === 'criar' && (
              <Field id="telefone" label="Telefone">
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  autoComplete="tel"
                />
              </Field>
            )}

            <Field id="senha" label="Senha">
              <Input
                id="senha"
                type="password"
                placeholder="••••••••"
                autoComplete={
                  mode === 'entrar' ? 'current-password' : 'new-password'
                }
              />
            </Field>

            {mode === 'criar' && (
              <>
                <Field id="confirmar-senha" label="Confirmação de Senha">
                  <Input
                    id="confirmar-senha"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </Field>

                {profile === 'gestante' ? (
                  <Field
                    id="codigo-convite"
                    label="Código de Convite da sua Doula"
                    optional
                  >
                    <Input
                      id="codigo-convite"
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      placeholder="Ex.: DOULA-1806"
                    />
                  </Field>
                ) : (
                  <Field
                    id="registro"
                    label="Registro Profissional / CPF"
                  >
                    <Input
                      id="registro"
                      type="text"
                      placeholder="Seu registro ou CPF"
                    />
                  </Field>
                )}
              </>
            )}

            {mode === 'entrar' && (
              <button
                type="button"
                className="-mt-1 self-end text-xs font-medium text-primary hover:underline"
              >
                Esqueci minha senha
              </button>
            )}

            <Button type="submit" size="lg" className="mt-2 w-full rounded-2xl">
              {mode === 'entrar' ? 'Acessar Painel' : 'Concluir Cadastro'}
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          {mode === 'entrar'
            ? 'Ainda não tem conta? Toque em “Criar Conta”.'
            : 'Já tem uma conta? Toque em “Entrar”.'}
        </p>
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  optional,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-muted-foreground">
            (opcional)
          </span>
        )}
      </Label>
      {children}
    </div>
  )
}
