import type { ColumnDef } from "@tanstack/react-table";
import { CopyIcon, TrashIcon } from "lucide-react";
import { Button } from "@mfe/cc-front-shared";

export interface OperationItem {
  id: string
  operacao: 'COMPRA' | 'VENDA'
  moedaOperacional: string
  quantidade: number
  taxaNegociada: number
  valorOperacao: number
  taxaAdministrativa: number
  iof: number
  valorTotal: number
  vet: number
  corporate: boolean
}

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

const formatDecimal = (value: number, decimals: number = 5): string => {
  return `R$ ${value.toFixed(decimals).replace(".", ",")}`;
};

const getOperationStyle = (operacao: string): string => {
  return operacao === 'VENDA'
    ? 'text-red-600 font-medium'
    : 'text-green-600 font-medium';
};

export const createCartColumns = (
  onCopy: (operation: OperationItem) => void,
  onRemove: (id: string) => void
): ColumnDef<OperationItem>[] => [
    {
      accessorKey: "operacao",
      header: "Operação",
      cell: ({ row }) => (
        <span className={getOperationStyle(row.original.operacao)}>
          {row.original.operacao.charAt(0) + row.original.operacao.slice(1).toLowerCase()}
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
      accessorKey: "taxaNegociada",
      header: "Taxa Negociada",
      cell: ({ row }) => (
        <span className="text-sm">
          {formatDecimal(row.original.taxaNegociada)}
        </span>
      ),
    },
    {
      accessorKey: "valorOperacao",
      header: "Valor Operação",
      cell: ({ row }) => (
        <span className="text-sm font-medium">
          {formatCurrency(row.original.valorOperacao)}
        </span>
      ),
    },
    {
      accessorKey: "taxaAdministrativa",
      header: "Taxa Administrativa",
      cell: ({ row }) => (
        <span className="text-sm">
          {formatCurrency(row.original.taxaAdministrativa)}
        </span>
      ),
    },
    {
      accessorKey: "iof",
      header: "IOF",
      cell: ({ row }) => (
        <span className="text-sm">
          {formatCurrency(row.original.iof)}
        </span>
      ),
    },
    {
      accessorKey: "valorTotal",
      header: "Valor Total",
      cell: ({ row }) => (
        <span className="text-sm font-bold">
          {formatCurrency(row.original.valorTotal)}
        </span>
      ),
    },
    {
      accessorKey: "vet",
      header: "V.E.T",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.vet.toFixed(5)}
        </span>
      ),
    },
    {
      accessorKey: "corporate",
      header: "Corporate",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.corporate ? "Sim" : "Não"}
        </span>
      ),
    },
    {
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(row.original)}
            className="h-8 w-8 p-0"
            title="Copiar"
          >
            <CopyIcon className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(row.original.id)}
            className="h-8 w-8 p-0"
            title="Remover"
          >
            <TrashIcon className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];