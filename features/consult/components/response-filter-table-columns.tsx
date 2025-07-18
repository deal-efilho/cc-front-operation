import type { ColumnDef } from "@tanstack/react-table";

import type { FilterResponseColumn, Status } from "../mocks";

import { ActionTableComponent } from "./actions-table-components";

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const changeStatusColor = (status: Status): string => {
  const colors = {
    Aprovado: "text-green-600 font-medium",
    Pendente: "text-yellow-600 font-medium",
    Cancelado: "text-red-600 font-medium",
  };
  return colors[status];
};

export const responseFilterColumns: ColumnDef<FilterResponseColumn>[] = [
  {
    accessorKey: "number",
    header: "Número",
    cell: ({ row }) => (
      <span className="flex w-max font-mono text-sm font-bold">
        {row.original.number}
      </span>
    ),
  },
  {
    accessorKey: "store",
    header: "Loja",
    cell: ({ row }) => <span className="flex w-max">{row.original.store}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={changeStatusColor(row.original.status)}>
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "created",
    header: "Criação",
    cell: ({ row }) => <span>{row.original.created}</span>,
  },
  {
    accessorKey: "validate",
    header: "Validade",
    cell: ({ row }) => <span>{row.original.validate}</span>,
  },
  {
    accessorKey: "clientName",
    header: "Nome do cliente",
    cell: ({ row }) => (
      <span className="flex w-max font-mono text-sm font-bold">
        {row.original.clientName}
      </span>
    ),
  },
  {
    accessorKey: "clientDocument",
    header: "Documento do cliente",
    cell: ({ row }) => (
      <span className="flex w-max font-mono text-sm font-bold">
        {row.original.clientDocument}
      </span>
    ),
  },
  {
    accessorKey: "balanceToSettle",
    header: "Tem saldo para liquidar?",
    cell: ({ row }) => (
      <span className="flex w-[120px] justify-center font-mono text-sm font-bold uppercase">
        {row.original.balanceToSettle}
      </span>
    ),
  },
  {
    accessorKey: "totalValue",
    header: "Valor total R$",
    cell: ({ row }) => <span className="flex justify-center w-[120px]">{formatCurrency(row.original.totalValue)}</span>,
  },
  {
    accessorKey: "liquidValue",
    header: "Valor liquido R$",
    cell: ({ row }) => <span className="flex justify-center w-[120px]">{formatCurrency(row.original.liquidValue)}</span>,
  },
  {
    accessorKey: "manualContract",
    header: "Contrato manual",
    cell: ({ row }) => (
      <span className="flex justify-center uppercase">
        {row.original.manualContract}
      </span>
    ),
  },
  {
    accessorKey: "corporate",
    header: "Corporate",
    cell: ({ row }) => (
      <span className="flex justify-center uppercase">
        {row.original.corporate}
      </span>
    ),
  },
  {
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => <ActionTableComponent original={row.original} />,
  },
];
