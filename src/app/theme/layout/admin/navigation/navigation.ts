export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'home',
    title: 'Home',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/home',
        icon: 'feather icon-home'
      }
    ]
  },
    {
    id: 'orcamentos',
    title: 'Orçamentos',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'lista-orcamentos',
        title: 'Lista de Orçamentos',
        type: 'item',
        url: '/orcamentos',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      }
    ]
  },
  {
    id: 'vendas',
    title: 'Vendas',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'lista-vendas',
        title: 'Vendas',
        type: 'item',
        url: '/vendas',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      }
    ]
  },
  {
    id: 'financeiro',
    title: 'Financeiro',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard-financeiro',
        title: 'Dashboard Financeiro',
        type: 'item',
        url: '/financeiro',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      },
      {
        id: 'lancamentos',
        title: 'Lancamentos',
        type: 'item',
        url: '/financeiro/lancamentos',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      },
      {
        id: 'caixa-diario',
        title: 'Caixa DIario',
        type: 'item',
        url: '/financeiro/caixa-diario',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      }
    ]
  },
  {
    id: 'graficos',
    title: 'Gráficos',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'apexchart',
        title: 'ApexChart',
        type: 'item',
        url: '/chart',
        classes: 'nav-item',
        icon: 'feather icon-pie-chart'
      }
    ]
  },
  {
    id: 'cadastros',
    title: 'Cadastros',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'clientes',
        title: 'Clientes',
        type: 'item',
        url: '/clientes',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      },
      {
        id: 'fornecedores',
        title: 'Fornecedores',
        type: 'item',
        url: '/fornecedores',
        classes: 'nav-item',
        icon: 'feather icon-server'
      }
    ]
  },

];
