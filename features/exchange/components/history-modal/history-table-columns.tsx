import type { ColumnDef } from "@tanstack/react-table";
import { FileDownIcon, FileTextIcon } from "lucide-react";
import type { HistoryColumn } from "../../mocks/history-data";

const getSituacaoStyle = (situacao: string): string => {
  const styles = {
    'Boletada': 'bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs',
    'Em Pagamento': 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs',
    'Aberta': 'bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs',
    'Finalizada': 'bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs',
    'Cancelada': 'bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs',
  };
  return styles[situacao as keyof typeof styles] || 'bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs';
};

const getOperacaoStyle = (operacao: string): string => {
  return operacao === 'Venda'
    ? 'text-red-600 font-medium'
    : 'text-green-600 font-medium';
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const formatUSD = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

export const historyColumns: ColumnDef<HistoryColumn>[] = [
  {
    accessorKey: "numero",
    header: "Número",
    cell: ({ row }) => (
      <span className="font-mono text-sm">
        {row.original.numero}
      </span>
    ),
  },
  {
    accessorKey: "operacao",
    header: "Operação",
    cell: ({ row }) => (
      <span className={getOperacaoStyle(row.original.operacao)}>
        {row.original.operacao}
      </span>
    ),
  },
  {
    accessorKey: "dataCriacao",
    header: "Data de criação",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.dataCriacao}
      </span>
    ),
  },
  {
    accessorKey: "moedaOperacional",
    header: "Moeda Operacional",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.moedaOperacional}
      </span>
    ),
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {formatUSD(row.original.quantidade)}
      </span>
    ),
  },
  {
    accessorKey: "valorTotal",
    header: "Valor Total",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {formatCurrency(row.original.valorTotal)}
      </span>
    ),
  },
  {
    accessorKey: "valorLiquido",
    header: "Valor Líquido",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {formatCurrency(row.original.valorLiquido)}
      </span>
    ),
  },
  {
    accessorKey: "situacao",
    header: "Situação",
    cell: ({ row }) => (
      <span className={getSituacaoStyle(row.original.situacao)}>
        {row.original.situacao}
      </span>
    ),
  },
  {
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <button
          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
          title="Visualizar boletos"
          onClick={() => console.log('Boletos:', row.original.id)}
        >
          <FileDownIcon className="size-6" />
        </button>
      </div>
    ),
  },
];