export interface HistoryColumn {
  id: string;
  numero: string;
  operacao: 'Venda' | 'Compra';
  dataCriacao: string;
  moedaOperacional: string;
  quantidade: number;
  valorTotal: number;
  valorLiquido: number;
  situacao: 'Boletada' | 'Em Pagamento' | 'Aberta' | 'Finalizada' | 'Cancelada';
}

export const historyMockData: HistoryColumn[] = [
  {
    id: '1',
    numero: '023.25.005.994-01',
    operacao: 'Venda',
    dataCriacao: '14/07/2025',
    moedaOperacional: 'Dólar Remessa',
    quantidade: 1500.00,
    valorTotal: 8550.97,
    valorLiquido: 8850.25,
    situacao: 'Boletada'
  },
  {
    id: '2',
    numero: '023.25.005.992-01',
    operacao: 'Compra',
    dataCriacao: '10/07/2025',
    moedaOperacional: 'Dólar Espécie',
    quantidade: 100.00,
    valorTotal: 508.34,
    valorLiquido: 493.51,
    situacao: 'Em Pagamento'
  },
  {
    id: '3',
    numero: '023.25.005.994-01',
    operacao: 'Venda',
    dataCriacao: '08/07/2025',
    moedaOperacional: 'Dólar MoneyGram',
    quantidade: 1500.00,
    valorTotal: 8633.19,
    valorLiquido: 8935.35,
    situacao: 'Aberta'
  },
  {
    id: '4',
    numero: '138.25.006.196-01',
    operacao: 'Venda',
    dataCriacao: '07/07/2025',
    moedaOperacional: 'Dólar MoneyGram',
    quantidade: 1500.00,
    valorTotal: 8633.43,
    valorLiquido: 8935.60,
    situacao: 'Finalizada'
  },
  {
    id: '5',
    numero: '023.25.005.975-01',
    operacao: 'Compra',
    dataCriacao: '07/07/2025',
    moedaOperacional: 'Dólar Espécie',
    quantidade: 3.00,
    valorTotal: 14.96,
    valorLiquido: 2.00,
    situacao: 'Cancelada'
  },
  {
    id: '6',
    numero: '023.25.005.975-01',
    operacao: 'Compra',
    dataCriacao: '07/07/2025',
    moedaOperacional: 'Dólar Espécie',
    quantidade: 10.00,
    valorTotal: 50.83,
    valorLiquido: 48.64,
    situacao: 'Cancelada'
  },
  {
    id: '7',
    numero: '023.25.005.976-01',
    operacao: 'Compra',
    dataCriacao: '07/07/2025',
    moedaOperacional: 'Dólar Espécie',
    quantidade: 1.00,
    valorTotal: 5.08,
    valorLiquido: 3.06,
    situacao: 'Cancelada'
  },
  {
    id: '8',
    numero: '023.25.005.977-01',
    operacao: 'Compra',
    dataCriacao: '07/07/2025',
    moedaOperacional: 'Dólar Espécie',
    quantidade: 2.00,
    valorTotal: 10.17,
    valorLiquido: 7.13,
    situacao: 'Finalizada'
  },
  {
    id: '9',
    numero: '023.25.005.978-01',
    operacao: 'Compra',
    dataCriacao: '07/07/2025',
    moedaOperacional: 'Dólar Espécie',
    quantidade: 1.00,
    valorTotal: 5.08,
    valorLiquido: 3.06,
    situacao: 'Aberta'
  },
  {
    id: '10',
    numero: '023.25.005.972-01',
    operacao: 'Compra',
    dataCriacao: '04/07/2025',
    moedaOperacional: 'Dólar Espécie',
    quantidade: 200.00,
    valorTotal: 1016.68,
    valorLiquido: 999.92,
    situacao: 'Em Pagamento'
  }
];