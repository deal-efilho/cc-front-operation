import type { ColumnDef } from "@tanstack/react-table";

import type { FilterResponseColumn } from "../mocks";

import { ActionTableComponent } from "./actions-table-components";

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const responseFilterColumns: ColumnDef<FilterResponseColumn>[] = [
  {
    accessorKey: "number",
    header: "Número",
    cell: ({ row }) => <span>{row.original.number}</span>,
  },
  {
    accessorKey: "store",
    header: "Operação",
    cell: ({ row }) => <span>{row.original.store}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span>{row.original.status}</span>,
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
    cell: ({ row }) => <span>{row.original.clientName}</span>,
  },
  {
    accessorKey: "clientDocument",
    header: "Documento do cliente",
    cell: ({ row }) => <span>{row.original.clientDocument}</span>,
  },
  {
    accessorKey: "totalValue",
    header: "Valor total R$",
    cell: ({ row }) => <span>{formatCurrency(row.original.totalValue)}</span>,
  },
  {
    accessorKey: "liquidValue",
    header: "Valor liquido R$",
    cell: ({ row }) => <span>{formatCurrency(row.original.liquidValue)}</span>,
  },
  {
    accessorKey: "manualContract",
    header: "Contrato manual",
    cell: ({ row }) => <span>{row.original.manualContract}</span>,
  },
  {
    accessorKey: "corporate",
    header: "Corporate",
    cell: ({ row }) => <span>{row.original.corporate}</span>,
  },
  {
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => <ActionTableComponent original={row.original} />,
  },
];
