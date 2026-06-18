'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  ClipboardList,
  BookHeart,
  FileSignature,
  Activity,
  Images,
  Send,
  Save,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNinhoData, type Gestante } from '@/lib/ninho-data'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

type SubTab = 'respostas' | 'diario' | 'contratos' | 'relatorio' | 'album'

const SUB_TABS: { id: SubTab; label: string; icon: typeof ClipboardList }[] = [
  { id: 'respostas', label: 'Respostas', icon: ClipboardList },
  { id: 'diario', label: 'Diário', icon: BookHeart },
  { id: 'contratos', label: 'Contratos', icon: FileSignature },
  { id: 'relatorio', label: 'Relatório', icon: Activity },
  { id: 'album', label: 'Álbum', icon: Images },
]

const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export function GestanteDetail({
  gestante,
  onBack,
}: {
  gestante: Gestante
  onBack: () => void
}) {
  const [sub, setSub] = useState<SubTab>('respostas')

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          aria-label="Voltar para a lista"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 font-serif text-lg font-semibold text-primary">
            {gestante.nome.charAt(0)}
          </div>
          <div className="leading-tight">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              {gestante.nome}
            </h2>
            <p className="text-xs text-muted-foreground">
              {gestante.semanas} semanas · {gestante.status}
            </p>
          </div>
        </div>
      </div>

      <nav aria-label="Seções da gestante" className="-mx-5 px-5">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SUB_TABS.map((t) => {
            const Icon = t.icon
            const active = t.id === sub
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSub(t.id)}
                className={cn(
                  'flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition-all',
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className="size-4" />
                {t.label}
              </button>
            )
          })}
        </div>
      </nav>

      {sub === 'respostas' && <Respostas gestante={gestante} />}
      {sub === 'diario' && <Diario gestante={gestante} />}
      {sub === 'contratos' && <Contratos gestante={gestante} />}
      {sub === 'relatorio' && <Relatorio gestante={gestante} />}
      {sub === 'album' && <Album gestante={gestante} />}
    </section>
  )
}

function Card({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-3 font-serif text-base font-semibold text-foreground">
        {title}
      </h3>
      {children}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border/60 py-2 last:border-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-foreground">{value}</dd>
    </div>
  )
}

function Respostas({ gestante }: { gestante: Gestante }) {
  const f = gestante.ficha
  return (
    <div className="flex flex-col gap-4">
      <Card title="Dados cadastrais e contato">
        <dl>
          <Field label="Nome completo" value={f.nomeCompleto} />
          <Field label="Data de nascimento" value={f.dataNascimento} />
          <Field label="Estado civil / família" value={f.estadoCivil} />
          <Field label="Endereço" value={f.endereco} />
          <Field label="Profissão" value={f.profissao} />
          <Field
            label="Contato de emergência"
            value={`${f.telefoneEmergencia} — ${f.contatoEmergenciaQuem}`}
          />
        </dl>
      </Card>
      <Card title="Informações da gestação">
        <dl>
          <Field label="Nome do bebê" value={f.nomeBebe} />
          <Field label="Semanas hoje" value={f.semanas} />
          <Field label="DPP" value={f.dpp} />
          <Field label="Primeira gestação?" value={f.primeiraGestacao} />
          <Field label="Equipe de pré-natal" value={f.equipePreNatal} />
          <Field label="Local do parto" value={f.localParto} />
          <Field label="Alergias" value={f.alergias} />
          <Field label="Restrições alimentares" value={f.restricoesAlimentares} />
        </dl>
      </Card>
      <Card title="Logística e planejamento">
        <dl>
          <Field label="Início do acompanhamento" value={f.inicioAcompanhamento} />
          <Field label="Momento de acionamento" value={f.momentoAcionamento} />
          <Field label="Transporte" value={f.transporte} />
          <Field label="Acompanhante principal" value={f.acompanhantePrincipal} />
          <Field label="Rede de apoio" value={f.redeApoio} />
        </dl>
      </Card>
      <Card title="Imagem e registro">
        <dl>
          <Field label="Fotógrafo profissional" value={f.fotografoProfissional} />
          <Field label="Autorização de imagem" value={f.autorizacaoImagem} />
        </dl>
      </Card>
      <Card title="Expectativas e preferências">
        <dl>
          <Field label="Sentimento sobre analgesia" value={f.analgesia} />
          <Field label="Itens para se sentir segura" value={f.itensSeguranca} />
          <Field label="Maior medo ou receio" value={f.maiorMedo} />
          <Field label="Papel principal da doula" value={f.papelDoula} />
        </dl>
      </Card>
      <Card title="Espaço aberto">
        <p className="text-sm leading-relaxed text-foreground">
          {f.espacoAberto}
        </p>
      </Card>
    </div>
  )
}

function Diario({ gestante }: { gestante: Gestante }) {
  const { addDiarioEntry } = useNinhoData()
  const [text, setText] = useState('')

  function handleAdd() {
    if (!text.trim()) return
    addDiarioEntry(gestante.id, 'doula', text.trim())
    setText('')
  }

  return (
    <div className="flex flex-col gap-4">
      <Card title="Adicionar anotação compartilhada">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escreva uma anotação que também será vista pela gestante..."
          className="min-h-24 rounded-2xl"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="mt-3 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Send className="size-4" />
          Adicionar ao diário
        </button>
      </Card>

      <div className="flex flex-col gap-3">
        {gestante.diario.length === 0 && (
          <p className="rounded-[24px] border border-dashed border-border bg-card/50 p-5 text-center text-sm text-muted-foreground">
            Nenhuma anotação ainda. Comece o prontuário mútuo acima.
          </p>
        )}
        {[...gestante.diario].reverse().map((entry) => (
          <div
            key={entry.id}
            className={cn(
              'rounded-[24px] border p-4 shadow-sm',
              entry.author === 'doula'
                ? 'border-primary/30 bg-primary/5'
                : 'border-border bg-card',
            )}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                  entry.author === 'doula'
                    ? 'bg-primary/15 text-primary'
                    : 'bg-secondary text-foreground',
                )}
              >
                {entry.author === 'doula' ? 'Doula' : gestante.nome.split(' ')[0]}
              </span>
              <span className="text-xs text-muted-foreground">{entry.date}</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground">{entry.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Contratos({ gestante }: { gestante: Gestante }) {
  const c = gestante.contrato
  const pago = c.parcelas
    .filter((p) => p.status === 'paga')
    .reduce((s, p) => s + p.valor, 0)

  return (
    <div className="flex flex-col gap-4">
      <Card title={c.titulo}>
        <div className="flex items-center justify-between rounded-2xl bg-secondary/60 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Valor total</p>
            <p className="font-serif text-xl font-semibold text-foreground">
              {brl(c.valorTotal)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Já pago</p>
            <p className="font-serif text-xl font-semibold text-primary">
              {brl(pago)}
            </p>
          </div>
        </div>
      </Card>

      {c.parcelas.length === 0 ? (
        <p className="rounded-[24px] border border-dashed border-border bg-card/50 p-5 text-center text-sm text-muted-foreground">
          Nenhuma parcela registrada. Contrato ainda não fechado.
        </p>
      ) : (
        <Card title="Parcelas">
          <ul className="flex flex-col gap-2">
            {c.parcelas.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{p.label}</p>
                  <p className="text-xs text-muted-foreground">
                    Vence em {p.vencimento}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">
                    {brl(p.valor)}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                      p.status === 'paga'
                        ? 'bg-primary/15 text-primary'
                        : 'bg-accent/20 text-accent-foreground',
                    )}
                  >
                    {p.status === 'paga' ? 'Paga' : 'Pendente'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}

function Relatorio({ gestante }: { gestante: Gestante }) {
  const { updateObservacaoClinica } = useNinhoData()
  const [obs, setObs] = useState(gestante.observacaoClinica)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    updateObservacaoClinica(gestante.id, obs)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card title="Contrações enviadas pela gestante">
        {gestante.contracoes.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum registro de contrações enviado ainda.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Hora</th>
                  <th className="px-4 py-2 font-medium">Duração</th>
                  <th className="px-4 py-2 font-medium">Intervalo</th>
                </tr>
              </thead>
              <tbody>
                {gestante.contracoes.map((c) => (
                  <tr key={c.id} className="border-t border-border/60">
                    <td className="px-4 py-2 text-foreground">{c.hora}</td>
                    <td className="px-4 py-2 text-foreground">{c.duracao}</td>
                    <td className="px-4 py-2 text-foreground">{c.intervalo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="Observação clínica (partograma)">
        <p className="mb-3 text-xs text-muted-foreground">
          Anotação exclusiva da doula — não visível para a gestante.
        </p>
        <Textarea
          value={obs}
          onChange={(e) => setObs(e.target.value)}
          placeholder="Registre observações de partograma, evolução e condutas..."
          className="min-h-28 rounded-2xl"
        />
        <button
          type="button"
          onClick={handleSave}
          className="mt-3 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Save className="size-4" />
          {saved ? 'Salvo!' : 'Salvar observação'}
        </button>
      </Card>
    </div>
  )
}

function Album({ gestante }: { gestante: Gestante }) {
  if (gestante.album.length === 0) {
    return (
      <p className="rounded-[24px] border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
        Nenhuma foto compartilhada com {gestante.nome.split(' ')[0]} ainda.
      </p>
    )
  }
  return (
    <Card title={`Álbum compartilhado com ${gestante.nome.split(' ')[0]}`}>
      <div className="grid grid-cols-2 gap-3">
        {gestante.album.map((foto) => (
          <figure
            key={foto.id}
            className="overflow-hidden rounded-2xl border border-border/60"
          >
            <img
              src={foto.url || '/placeholder.svg'}
              alt={foto.legenda}
              className="aspect-square w-full object-cover"
            />
            <figcaption className="bg-card px-3 py-2 text-xs text-muted-foreground">
              {foto.legenda}
            </figcaption>
          </figure>
        ))}
      </div>
    </Card>
  )
}
