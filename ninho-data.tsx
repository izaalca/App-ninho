'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

export type GestanteStatus = 'Ativa' | 'Triagem'
export type DiarioAuthor = 'doula' | 'gestante'

export type FichaTriagem = {
  // 1. Dados cadastrais e contato
  nomeCompleto: string
  dataNascimento: string
  estadoCivil: string
  endereco: string
  profissao: string
  telefoneEmergencia: string
  contatoEmergenciaQuem: string
  // 2. Informações da gestação
  nomeBebe: string
  semanas: string
  dpp: string
  primeiraGestacao: string
  equipePreNatal: string
  localParto: string
  alergias: string
  restricoesAlimentares: string
  // 3. Logística e planejamento
  inicioAcompanhamento: string
  momentoAcionamento: string
  transporte: string
  acompanhantePrincipal: string
  redeApoio: string
  // 4. Imagem e registro
  fotografoProfissional: string
  autorizacaoImagem: string
  // 5. Expectativas e preferências
  analgesia: string
  itensSeguranca: string
  maiorMedo: string
  papelDoula: string
  // 6. Espaço aberto
  espacoAberto: string
}

export type DiarioEntry = {
  id: string
  author: DiarioAuthor
  date: string
  text: string
}

export type Parcela = {
  id: string
  label: string
  valor: number
  status: 'paga' | 'pendente'
  vencimento: string
}

export type Contrato = {
  titulo: string
  valorTotal: number
  parcelas: Parcela[]
}

export type Contracao = {
  id: string
  hora: string
  duracao: string
  intervalo: string
}

export type AlbumFoto = {
  id: string
  url: string
  legenda: string
}

export type AgendaEvento = {
  id: string
  titulo: string
  data: string
  hora: string
  compartilhado: boolean
}

export type Gestante = {
  id: string
  nome: string
  semanas: number
  status: GestanteStatus
  ficha: FichaTriagem
  diario: DiarioEntry[]
  contrato: Contrato
  contracoes: Contracao[]
  observacaoClinica: string
  album: AlbumFoto[]
  agenda: AgendaEvento[]
}

export type TriagemPergunta = {
  id: string
  texto: string
}

export type TriagemBloco = {
  id: string
  titulo: string
  perguntas: TriagemPergunta[]
}

export type MaterialBiblioteca = {
  id: string
  titulo: string
  tipo: 'PDF' | 'Livro' | 'Slides'
}

// ---------- Seed das gestantes ----------

const ALBUM_PADRAO: AlbumFoto[] = [
  { id: 'f1', url: '/album/ultrassom.png', legenda: 'Ultrassom morfológico' },
  { id: 'f2', url: '/album/barriga.png', legenda: 'Ensaio de barriga' },
  { id: 'f3', url: '/album/sapatinhos.png', legenda: 'Enxoval chegando' },
]

const GESTANTES_SEED: Gestante[] = [
  {
    id: 'marina',
    nome: 'Marina Albuquerque',
    semanas: 34,
    status: 'Ativa',
    ficha: {
      nomeCompleto: 'Marina Albuquerque Costa',
      dataNascimento: '12/03/1992',
      estadoCivil: 'Casada — mora com o esposo Rafael',
      endereco: 'Rua das Acácias, 120 — próximo à Praça do Sol',
      profissao: 'Arquiteta',
      telefoneEmergencia: '(11) 98765-4321',
      contatoEmergenciaQuem: 'Rafael (esposo)',
      nomeBebe: 'Aurora',
      semanas: '34 semanas',
      dpp: '28/07/2026',
      primeiraGestacao: 'Sim, é a primeira gestação',
      equipePreNatal: 'Dra. Helena Martins — Maternidade Vida Plena',
      localParto: 'Maternidade Vida Plena (parto normal)',
      alergias: 'Penicilina',
      restricoesAlimentares: 'Intolerância à lactose',
      inicioAcompanhamento: 'A partir das 36 semanas, em casa',
      momentoAcionamento: 'Quando as contrações ficarem regulares (5-1-1)',
      transporte: 'Carro próprio, Rafael dirige',
      acompanhantePrincipal: 'Rafael (esposo)',
      redeApoio: 'Mãe e irmã, disponíveis na cidade',
      fotografoProfissional: 'Sim, contratado para o parto',
      autorizacaoImagem: 'Autoriza uso de fotos sem mostrar o rosto',
      analgesia: 'Prefere parto sem analgesia, aberta a reavaliar',
      itensSeguranca: 'Playlist tranquila, óleo de massagem, luz baixa',
      maiorMedo: 'Medo de uma cesárea sem necessidade real',
      papelDoula: 'Apoio emocional contínuo e mediação com a equipe',
      espacoAberto:
        'Tive um aborto espontâneo há 2 anos, então essa gestação carrega muita expectativa e ansiedade.',
    },
    diario: [
      {
        id: 'd1',
        author: 'gestante',
        date: '10/06/2026',
        text: 'Senti a Aurora mexendo bastante hoje à tarde. Foi emocionante.',
      },
      {
        id: 'd2',
        author: 'doula',
        date: '11/06/2026',
        text: 'Conversamos sobre técnicas de respiração. Marina está mais confiante com o 5-1-1.',
      },
    ],
    contrato: {
      titulo: 'Pacote Acompanhamento Completo',
      valorTotal: 3000,
      parcelas: [
        {
          id: 'p1',
          label: 'Entrada',
          valor: 1000,
          status: 'paga',
          vencimento: '05/04/2026',
        },
        {
          id: 'p2',
          label: '2ª parcela',
          valor: 1000,
          status: 'paga',
          vencimento: '05/05/2026',
        },
        {
          id: 'p3',
          label: '3ª parcela',
          valor: 1000,
          status: 'pendente',
          vencimento: '05/06/2026',
        },
      ],
    },
    contracoes: [
      { id: 'c1', hora: '14:02', duracao: '45s', intervalo: '—' },
      { id: 'c2', hora: '14:12', duracao: '50s', intervalo: '10min' },
      { id: 'c3', hora: '14:21', duracao: '55s', intervalo: '9min' },
    ],
    observacaoClinica:
      'Contrações ainda irregulares, sem sinais de trabalho de parto ativo. Orientar repouso e hidratação.',
    album: ALBUM_PADRAO,
    agenda: [
      {
        id: 'e1',
        titulo: 'Consulta pré-natal',
        data: '20/06/2026',
        hora: '09:00',
        compartilhado: true,
      },
      {
        id: 'e2',
        titulo: 'Encontro de preparação',
        data: '25/06/2026',
        hora: '15:00',
        compartilhado: true,
      },
      {
        id: 'e3',
        titulo: 'Lembrete pessoal (não compartilhado)',
        data: '22/06/2026',
        hora: '18:00',
        compartilhado: false,
      },
    ],
  },
  {
    id: 'juliana',
    nome: 'Juliana Reis',
    semanas: 28,
    status: 'Ativa',
    ficha: {
      nomeCompleto: 'Juliana Reis Oliveira',
      dataNascimento: '05/09/1988',
      estadoCivil: 'União estável',
      endereco: 'Av. Central, 880 — em frente ao parque',
      profissao: 'Professora',
      telefoneEmergencia: '(11) 91234-5678',
      contatoEmergenciaQuem: 'Pedro (companheiro)',
      nomeBebe: 'Theo',
      semanas: '28 semanas',
      dpp: '10/09/2026',
      primeiraGestacao: 'Não, segunda gestação',
      equipePreNatal: 'Dr. Marcos Lima — Hospital Santa Clara',
      localParto: 'Hospital Santa Clara',
      alergias: 'Nenhuma conhecida',
      restricoesAlimentares: 'Vegetariana',
      inicioAcompanhamento: 'A partir das 38 semanas',
      momentoAcionamento: 'Ao perder o tampão ou romper a bolsa',
      transporte: 'Aplicativo de transporte',
      acompanhantePrincipal: 'Pedro (companheiro)',
      redeApoio: 'Sogra disponível para cuidar do filho mais velho',
      fotografoProfissional: 'Ainda não decidiu',
      autorizacaoImagem: 'Não autoriza uso de imagem',
      analgesia: 'Deseja analgesia (peridural) se necessário',
      itensSeguranca: 'Bola de pilates, água de coco',
      maiorMedo: 'Receio de não conseguir amamentar como deseja',
      papelDoula: 'Apoio prático e orientação sobre amamentação',
      espacoAberto:
        'Primeiro parto foi uma cesárea de emergência. Desejo muito tentar um parto normal agora.',
    },
    diario: [
      {
        id: 'd1',
        author: 'gestante',
        date: '09/06/2026',
        text: 'Theo está bem ativo de manhã. Comecei os exercícios na bola.',
      },
    ],
    contrato: {
      titulo: 'Pacote Acompanhamento Essencial',
      valorTotal: 2400,
      parcelas: [
        {
          id: 'p1',
          label: 'Entrada',
          valor: 800,
          status: 'paga',
          vencimento: '01/05/2026',
        },
        {
          id: 'p2',
          label: '2ª parcela',
          valor: 800,
          status: 'pendente',
          vencimento: '01/06/2026',
        },
        {
          id: 'p3',
          label: '3ª parcela',
          valor: 800,
          status: 'pendente',
          vencimento: '01/07/2026',
        },
      ],
    },
    contracoes: [],
    observacaoClinica: '',
    album: [
      { id: 'f1', url: '/album/barriga.png', legenda: '28 semanas' },
      { id: 'f2', url: '/album/ultrassom.png', legenda: 'Ultrassom do Theo' },
    ],
    agenda: [
      {
        id: 'e1',
        titulo: 'Consulta pré-natal',
        data: '18/06/2026',
        hora: '11:00',
        compartilhado: true,
      },
      {
        id: 'e2',
        titulo: 'Aula de amamentação',
        data: '28/06/2026',
        hora: '14:00',
        compartilhado: false,
      },
    ],
  },
  {
    id: 'carla',
    nome: 'Carla Menezes',
    semanas: 12,
    status: 'Triagem',
    ficha: {
      nomeCompleto: 'Carla Menezes',
      dataNascimento: '22/01/1995',
      estadoCivil: 'Solteira — rede de apoio com a mãe',
      endereco: 'Rua do Lago, 45 — ao lado da padaria Aurora',
      profissao: 'Designer',
      telefoneEmergencia: '(11) 99876-1122',
      contatoEmergenciaQuem: 'Sônia (mãe)',
      nomeBebe: 'ainda escolhendo',
      semanas: '12 semanas',
      dpp: '02/12/2026',
      primeiraGestacao: 'Sim, é a primeira gestação',
      equipePreNatal: 'Em definição',
      localParto: 'Ainda não definido',
      alergias: 'Dipirona',
      restricoesAlimentares: 'Nenhuma',
      inicioAcompanhamento: 'A definir na triagem',
      momentoAcionamento: 'A definir',
      transporte: 'A definir',
      acompanhantePrincipal: 'Sônia (mãe)',
      redeApoio: 'Mãe e amigas próximas',
      fotografoProfissional: 'A decidir',
      autorizacaoImagem: 'A confirmar',
      analgesia: 'Ainda sem definição, quer entender as opções',
      itensSeguranca: 'A definir',
      maiorMedo: 'Insegurança por estar no início e sozinha',
      papelDoula: 'Acolhimento e informação desde o começo',
      espacoAberto:
        'Descobri a gestação há pouco tempo e ainda estou processando tudo. Quero me sentir acolhida.',
    },
    diario: [],
    contrato: {
      titulo: 'Triagem inicial (sem contrato fechado)',
      valorTotal: 0,
      parcelas: [],
    },
    contracoes: [],
    observacaoClinica: '',
    album: [],
    agenda: [
      {
        id: 'e1',
        titulo: 'Reunião de triagem',
        data: '19/06/2026',
        hora: '16:00',
        compartilhado: true,
      },
    ],
  },
]

const TRIAGEM_SEED: TriagemBloco[] = [
  {
    id: 'b1',
    titulo: '1. Dados Cadastrais e Contato',
    perguntas: [
      { id: 'q1', texto: 'Nome completo' },
      { id: 'q2', texto: 'Data de nascimento' },
      { id: 'q3', texto: 'Estado civil / configuração familiar' },
      { id: 'q4', texto: 'Endereço com ponto de referência' },
      { id: 'q5', texto: 'Profissão' },
      { id: 'q6', texto: 'Telefone de emergência (e de quem é)' },
    ],
  },
  {
    id: 'b2',
    titulo: '2. Informações da Gestação',
    perguntas: [
      { id: 'q1', texto: 'Nome do bebê' },
      { id: 'q2', texto: 'Semanas hoje' },
      { id: 'q3', texto: 'DPP (data provável do parto)' },
      { id: 'q4', texto: 'Esta é sua primeira gestação?' },
      { id: 'q5', texto: 'Equipe de pré-natal' },
      { id: 'q6', texto: 'Local pretendido para o parto' },
      { id: 'q7', texto: 'Alergias' },
      { id: 'q8', texto: 'Restrições alimentares' },
    ],
  },
  {
    id: 'b3',
    titulo: '3. Logística e Planejamento',
    perguntas: [
      { id: 'q1', texto: 'Onde deseja que o acompanhamento comece?' },
      { id: 'q2', texto: 'Momento de acionamento' },
      { id: 'q3', texto: 'Transporte para o hospital' },
      { id: 'q4', texto: 'Acompanhante principal' },
      { id: 'q5', texto: 'Rede de apoio extra' },
    ],
  },
  {
    id: 'b4',
    titulo: '4. Imagem e Registro',
    perguntas: [
      { id: 'q1', texto: 'Fotógrafo profissional?' },
      {
        id: 'q2',
        texto: 'Autorização do uso de imagem/relatos nas redes sociais',
      },
    ],
  },
  {
    id: 'b5',
    titulo: '5. Expectativas e Preferências',
    perguntas: [
      { id: 'q1', texto: 'Sentimento em relação à analgesia' },
      { id: 'q2', texto: 'Itens indispensáveis para se sentir segura' },
      { id: 'q3', texto: 'Maior medo ou receio' },
      { id: 'q4', texto: 'Expectativa sobre o papel principal da doula' },
    ],
  },
  {
    id: 'b6',
    titulo: '6. Espaço Aberto',
    perguntas: [
      {
        id: 'q1',
        texto: 'Texto livre para compartilhar histórias ou saúde antes da reunião',
      },
    ],
  },
]

const BIBLIOTECA_SEED: MaterialBiblioteca[] = [
  { id: 'm1', titulo: 'Guia do Plano de Parto', tipo: 'PDF' },
  { id: 'm2', titulo: 'O Renascimento do Parto (livro)', tipo: 'Livro' },
  { id: 'm3', titulo: 'Técnicas de Respiração — Slides', tipo: 'Slides' },
]

// ---------- Contexto ----------

type NinhoContextValue = {
  gestantes: Gestante[]
  triagem: TriagemBloco[]
  pixKey: string
  anotacoes: string
  biblioteca: MaterialBiblioteca[]
  addDiarioEntry: (gestanteId: string, author: DiarioAuthor, text: string) => void
  updateObservacaoClinica: (gestanteId: string, texto: string) => void
  setPixKey: (key: string) => void
  setAnotacoes: (texto: string) => void
  addMaterial: (titulo: string, tipo: MaterialBiblioteca['tipo']) => void
  // Triagem
  updatePergunta: (blocoId: string, perguntaId: string, texto: string) => void
  removePergunta: (blocoId: string, perguntaId: string) => void
  addPergunta: (blocoId: string, texto: string) => void
}

const NinhoContext = createContext<NinhoContextValue | null>(null)

export function NinhoDataProvider({ children }: { children: ReactNode }) {
  const [gestantes, setGestantes] = useState<Gestante[]>(GESTANTES_SEED)
  const [triagem, setTriagem] = useState<TriagemBloco[]>(TRIAGEM_SEED)
  const [pixKey, setPixKey] = useState('ninho.doula@email.com')
  const [anotacoes, setAnotacoes] = useState('')
  const [biblioteca, setBiblioteca] =
    useState<MaterialBiblioteca[]>(BIBLIOTECA_SEED)

  const addDiarioEntry = useCallback(
    (gestanteId: string, author: DiarioAuthor, text: string) => {
      const now = new Date()
      const date = now.toLocaleDateString('pt-BR')
      setGestantes((prev) =>
        prev.map((g) =>
          g.id === gestanteId
            ? {
                ...g,
                diario: [
                  ...g.diario,
                  { id: `d${Date.now()}`, author, date, text },
                ],
              }
            : g,
        ),
      )
    },
    [],
  )

  const updateObservacaoClinica = useCallback(
    (gestanteId: string, texto: string) => {
      setGestantes((prev) =>
        prev.map((g) =>
          g.id === gestanteId ? { ...g, observacaoClinica: texto } : g,
        ),
      )
    },
    [],
  )

  const addMaterial = useCallback(
    (titulo: string, tipo: MaterialBiblioteca['tipo']) => {
      setBiblioteca((prev) => [
        ...prev,
        { id: `m${Date.now()}`, titulo, tipo },
      ])
    },
    [],
  )

  const updatePergunta = useCallback(
    (blocoId: string, perguntaId: string, texto: string) => {
      setTriagem((prev) =>
        prev.map((b) =>
          b.id === blocoId
            ? {
                ...b,
                perguntas: b.perguntas.map((p) =>
                  p.id === perguntaId ? { ...p, texto } : p,
                ),
              }
            : b,
        ),
      )
    },
    [],
  )

  const removePergunta = useCallback((blocoId: string, perguntaId: string) => {
    setTriagem((prev) =>
      prev.map((b) =>
        b.id === blocoId
          ? { ...b, perguntas: b.perguntas.filter((p) => p.id !== perguntaId) }
          : b,
      ),
    )
  }, [])

  const addPergunta = useCallback((blocoId: string, texto: string) => {
    setTriagem((prev) =>
      prev.map((b) =>
        b.id === blocoId
          ? {
              ...b,
              perguntas: [
                ...b.perguntas,
                { id: `q${Date.now()}`, texto },
              ],
            }
          : b,
      ),
    )
  }, [])

  return (
    <NinhoContext.Provider
      value={{
        gestantes,
        triagem,
        pixKey,
        anotacoes,
        biblioteca,
        addDiarioEntry,
        updateObservacaoClinica,
        setPixKey,
        setAnotacoes,
        addMaterial,
        updatePergunta,
        removePergunta,
        addPergunta,
      }}
    >
      {children}
    </NinhoContext.Provider>
  )
}

export function useNinhoData() {
  const ctx = useContext(NinhoContext)
  if (!ctx) {
    throw new Error('useNinhoData deve ser usado dentro de NinhoDataProvider')
  }
  return ctx
}
