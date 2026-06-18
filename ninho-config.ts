import {
  Users,
  ClipboardList,
  Wallet,
  CalendarHeart,
  NotebookPen,
  BookOpen,
  Home,
  BookHeart,
  Baby,
  Timer,
  Images,
  FileSignature,
  type LucideIcon,
} from 'lucide-react'

export type ProfileKey = 'doula' | 'gestante'

// Código de vinculação da doula (simulado) usado para sincronizar perfis
export const DOULA_CODE = 'DOULA-1806'

export type TabItem = {
  id: string
  label: string
  icon: LucideIcon
  description: string
}

export type ProfileConfig = {
  key: ProfileKey
  label: string
  tagline: string
  tabs: TabItem[]
}

export const PROFILES: Record<ProfileKey, ProfileConfig> = {
  doula: {
    key: 'doula',
    label: 'Visão da Doula',
    tagline: 'Acompanhe suas gestantes com carinho e organização.',
    tabs: [
      {
        id: 'gestantes',
        label: 'Gestantes',
        icon: Users,
        description: 'Veja e gerencie todas as gestantes que você acompanha.',
      },
      {
        id: 'triagem',
        label: 'Triagem',
        icon: ClipboardList,
        description: 'Organize o primeiro contato e as fichas de avaliação.',
      },
      {
        id: 'financeiro',
        label: 'Financeiro',
        icon: Wallet,
        description: 'Controle pagamentos, pacotes e recebimentos.',
      },
      {
        id: 'agenda',
        label: 'Agenda',
        icon: CalendarHeart,
        description: 'Visualize encontros, consultas e plantões.',
      },
      {
        id: 'anotacoes',
        label: 'Anotações',
        icon: NotebookPen,
        description: 'Registre observações e lembretes de cada acompanhamento.',
      },
      {
        id: 'biblioteca',
        label: 'Biblioteca',
        icon: BookOpen,
        description: 'Materiais, artigos e conteúdos para compartilhar.',
      },
    ],
  },
  gestante: {
    key: 'gestante',
    label: 'Visão da Gestante',
    tagline: 'Sua jornada da gestação ao parto, acolhida em um só lugar.',
    tabs: [
      {
        id: 'inicio',
        label: 'Início',
        icon: Home,
        description: 'Um resumo carinhoso da sua semana de gestação.',
      },
      {
        id: 'diario',
        label: 'Diário',
        icon: BookHeart,
        description: 'Registre sentimentos, sintomas e memórias do dia.',
      },
      {
        id: 'plano-de-parto',
        label: 'Plano de Parto',
        icon: Baby,
        description: 'Construa e revise as suas preferências para o parto.',
      },
      {
        id: 'contracoes',
        label: 'Contrações',
        icon: Timer,
        description: 'Cronometre e acompanhe a frequência das contrações.',
      },
      {
        id: 'album',
        label: 'Álbum',
        icon: Images,
        description: 'Guarde fotos e momentos especiais da gestação.',
      },
      {
        id: 'agenda',
        label: 'Agenda',
        icon: CalendarHeart,
        description: 'Acompanhe consultas, encontros e lembretes.',
      },
      {
        id: 'contrato',
        label: 'Contrato',
        icon: FileSignature,
        description: 'Consulte os detalhes do seu acompanhamento.',
      },
      {
        id: 'biblioteca',
        label: 'Biblioteca',
        icon: BookOpen,
        description: 'Conteúdos e materiais selecionados para você.',
      },
    ],
  },
}
