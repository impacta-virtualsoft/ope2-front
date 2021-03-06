import { API_URL, BACKEND_URL } from './envs'

export const API_REQUEST_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
export const CSRF_URL = '/api/auth/csrf'
export const SIGNOUT_URL = '/api/auth/signout'
export const DATE_UNTIL_TOKEN_EXPIRES = Date.now() + 1000 * 60 * 60 * 22

export function makeUrl(path?: string, isOutOfAPI = false) {
  return isOutOfAPI ? BACKEND_URL! + path! : API_URL! + path!
}

export function trailSlasher(str: string) {
  return str + '/'
}

export const groupOptions = [
  {
    label: 'Administrativo',
    value: 1,
  },
  { label: 'Caixa', value: 2 },
  {
    label: 'Cozinha',
    value: 3,
  },
  {
    label: 'Proprietário',
    value: 4,
  },
  {
    label: 'Superuser',
    value: 5,
  },
]

// Width of the drawer in header leayout
export const DRAWER_WIDTH = 200 //240

export const gridLocaleText = {
  // Root
  noRowsLabel: 'Sem linhas',
  noResultsOverlayLabel: 'Nenhum registro encontrado.',
  errorOverlayDefaultLabel: 'Um erro ocorreu.',

  // Density selector toolbar button text
  toolbarDensity: 'Densidade',
  toolbarDensityLabel: 'Densidade',
  toolbarDensityCompact: 'Compacta',
  toolbarDensityStandard: 'Padrão',
  toolbarDensityComfortable: 'Confortável',

  // Columns selector toolbar button text
  toolbarColumns: 'Colunas',
  toolbarColumnsLabel: 'Selecionar colunas',

  // Filters toolbar button text
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar filtros',
  toolbarFiltersTooltipHide: 'Esconder filtros',
  toolbarFiltersTooltipShow: 'Mostrar filtros',
  toolbarFiltersTooltipActive: (count: number) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,

  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Baixar CSV',
  toolbarExportPrint: 'Imprimir',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Encontrar coluna',
  columnsPanelTextFieldPlaceholder: 'Título da coluna',
  columnsPanelDragIconLabel: 'Reordenar coluna',
  columnsPanelShowAllButton: 'Mostrar tudo',
  columnsPanelHideAllButton: 'Esconder tudo',

  // Filter panel text
  filterPanelAddFilter: 'Adicionar filtro',
  filterPanelDeleteIconLabel: 'Remover',
  filterPanelOperators: 'Operadores',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'Ou',
  filterPanelColumns: 'Colunas',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Valor do filtro',

  // Filter operators text
  filterOperatorContains: 'contém',
  filterOperatorEquals: 'é igual',
  filterOperatorStartsWith: 'começa com',
  filterOperatorEndsWith: 'termina com',
  filterOperatorIs: 'é',
  filterOperatorNot: 'não é',
  filterOperatorAfter: 'está depois de',
  filterOperatorOnOrAfter: 'está em ou depois de',
  filterOperatorBefore: 'está antes de',
  filterOperatorOnOrBefore: 'está e ou antes de',
  filterOperatorIsEmpty: 'é vazio',
  filterOperatorIsNotEmpty: 'não é vazio',

  // Filter values text
  filterValueAny: 'qualquer',
  filterValueTrue: 'verdadeiro',
  filterValueFalse: 'falso',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostrar colunas',
  columnMenuFilter: 'Filtros',
  columnMenuHideColumn: 'Esconder',
  columnMenuUnsort: 'Desordenar',
  columnMenuSortAsc: 'Ordernar ASC',
  columnMenuSortDesc: 'Ordenar DESC',

  // Column header text
  columnHeaderFiltersTooltipActive: (count: number) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,
  columnHeaderFiltersLabel: 'Mostrar filtros',
  columnHeaderSortIconLabel: 'Ordenar',

  // Rows selected footer text
  footerRowSelected: (count: number) =>
    count !== 1
      ? `${count.toLocaleString()} linhas selecionadas`
      : `${count.toLocaleString()} linha selecionada`,

  // Total rows footer text
  footerTotalRows: 'Total de Linhas:',

  // Total visible rows footer text
  footerTotalVisibleRows: (visibleCount: number, totalCount: number) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Seleção por Checkbox',

  // Boolean cell text
  booleanCellTrueLabel: 'verdadeiro',
  booleanCellFalseLabel: 'falso',

  // Actions cell more text
  actionsCellMore: 'mais',

  // Tree Data
  treeDataGroupingHeaderName: 'Grupo',
  treeDataExpand: 'ver mais',
  treeDataCollapse: 'esconder mais',

  // Used core components translation keys
  MuiTablePagination: {},
}
